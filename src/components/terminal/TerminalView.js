import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TERMINAL_COLORS as C } from '../ColorConstants';
import useAriEngine, { ARI_ERROR, ARI_LOADING, ARI_READY } from './useAriEngine';
import {
    ACTION_ASK_ARI,
    ACTION_CLEAR,
    ACTION_EXIT,
    ACTION_EXIT_ARI,
    BLOCK_AI,
    BLOCK_BANNER,
    BLOCK_ERROR,
    BLOCK_NOTICE,
    BLOCK_PROMPT,
    BLOCK_SELECT,
    BLOCK_TEXT,
    BLOCK_TREE,
    matchCommands,
    runCommand,
    visibleCommands,
    WELCOME_TIP,
} from './terminalCommands';

const FONT_STACK =
    '"Departure Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

let blockSeq = 0;
const nextId = () => `b${++blockSeq}`;
const withIds = (blocks) => blocks.map((b) => ({ ...b, id: nextId() }));

const INITIAL_BLOCKS = () =>
    withIds([
        { type: BLOCK_BANNER },
        { type: BLOCK_NOTICE, text: WELCOME_TIP },
    ]);

// ---------------------------------------------------------------------------
// Presentational pieces
// ---------------------------------------------------------------------------

const Banner = () => (
    <div
        className="rounded-lg px-4 py-3 mb-1"
        style={{ border: `1px solid ${C.border}`, background: C.panel }}
    >
        <div style={{ color: C.accent }}>
            <span className="mr-2">✻</span>
            Welcome to <span className="font-bold">roshanrajcmd</span> CLI
        </div>
        <div className="mt-2 text-xs leading-relaxed" style={{ color: C.muted }}>
            <div>cwd: ~/roshanrajcmd.github.io</div>
            <div>model: Ari (local · WebGPU)</div>
        </div>
    </div>
);

const PromptEcho = ({ text }) => (
    <div className="flex gap-2">
        <span style={{ color: C.accent }}>&gt;</span>
        <span style={{ color: C.text }}>{text}</span>
    </div>
);

const Bullet = ({ children, color = C.text }) => (
    <div className="flex gap-2">
        <span style={{ color: C.accent }}>⏺</span>
        <div className="whitespace-pre-wrap flex-1" style={{ color }}>
            {children}
        </div>
    </div>
);

const TreeBlock = ({ title, rows }) => (
    <div>
        <Bullet>{title}</Bullet>
        <div className="mt-1 ml-2">
            {rows.map((row, i) => (
                <div key={i} className="flex gap-2 text-sm">
                    <span style={{ color: C.dim }}>⎿</span>
                    <span style={{ color: C.text }}>{row.key}</span>
                    {row.value && <span style={{ color: C.muted }}>{row.value}</span>}
                </div>
            ))}
        </div>
    </div>
);

/** Interactive ↑/↓ list. Live while `active`, frozen once resolved. */
const SelectBlock = ({ block, active, selectedIndex, onPick }) => {
    const { title, options, chosen, revealDetail } = block;
    return (
        <div>
            <Bullet>{title}</Bullet>
            <div
                className="mt-2 rounded-lg overflow-hidden"
                style={{ border: `1px solid ${C.border}`, background: C.panel }}
            >
                {options.map((opt, i) => {
                    const isCursor = active && i === selectedIndex;
                    const isChosen = chosen === i;
                    return (
                        <div
                            key={i}
                            role="option"
                            aria-selected={isCursor || isChosen}
                            onClick={() => active && onPick(i)}
                            className={`flex items-baseline gap-2 px-3 py-1.5 text-sm ${
                                active ? 'cursor-pointer' : ''
                            }`}
                            style={{
                                background: isCursor ? C.selectBg : 'transparent',
                                color: isCursor || isChosen ? C.accent : C.text,
                            }}
                        >
                            <span style={{ color: isCursor ? C.accent : C.dim }}>
                                {isCursor ? '❯' : isChosen ? '✓' : ' '}
                            </span>
                            <span className="flex-1">{opt.label}</span>
                            {opt.hint && (
                                <span className="text-xs" style={{ color: C.muted }}>
                                    {opt.hint}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Description of the row under the cursor, or of the resolved choice. */}
            {(() => {
                const shown = active ? selectedIndex : chosen;
                const detail = shown != null ? options[shown]?.detail : null;
                if (!detail) return null;
                return (
                    <div
                        className="mt-2 ml-1 text-sm whitespace-pre-wrap"
                        style={{ color: revealDetail ? C.text : C.muted }}
                    >
                        {detail}
                    </div>
                );
            })()}
            {active && (
                <div className="mt-2 text-xs" style={{ color: C.dim }}>
                    ↑/↓ navigate · Enter select · Esc dismiss
                </div>
            )}
        </div>
    );
};

const AiBlock = ({ block }) => (
    <div className="flex gap-2">
        <span style={{ color: C.accent }}>✻</span>
        <div className="whitespace-pre-wrap flex-1" style={{ color: C.text }}>
            {block.text}
            {block.streaming && (
                <span className="ml-0.5 animate-pulse" style={{ color: C.accent }}>
                    ▍
                </span>
            )}
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// Terminal
// ---------------------------------------------------------------------------

export default function TerminalView({ onExit }) {
    const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
    const [input, setInput] = useState('');
    // id of the select block accepting keyboard input, or null
    const [activeSelectId, setActiveSelectId] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [ariActive, setAriActive] = useState(false);
    const [busy, setBusy] = useState(false);

    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const commandHistoryRef = useRef([]);
    // Cursor into commandHistoryRef while recalling with ↑/↓; null = editing a fresh line.
    const historyCursorRef = useRef(null);

    const ari = useAriEngine();
    const ctx = useMemo(() => ({ ariActive }), [ariActive]);

    const push = useCallback((newBlocks) => {
        setBlocks((prev) => [...prev, ...withIds(newBlocks)]);
    }, []);

    // Keep the newest output in view.
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [blocks]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const activeSelect = useMemo(
        () => blocks.find((b) => b.id === activeSelectId) || null,
        [blocks, activeSelectId]
    );

    // Slash-command autocomplete menu, shown while typing "/...".
    // Stays available inside an Ari session, where slash input is still a command.
    const suggestions = useMemo(() => {
        if (activeSelectId) return [];
        const matches = matchCommands(input, ctx);
        // Hide once the input is already an exact, unambiguous command.
        if (matches.length === 1 && matches[0].name === input.trim().toLowerCase()) return [];
        return matches;
    }, [input, activeSelectId, ctx]);

    const [suggestionIndex, setSuggestionIndex] = useState(0);
    useEffect(() => setSuggestionIndex(0), [input]);

    /** Freeze a select block, recording which row was taken. */
    const resolveSelect = useCallback((id, chosen) => {
        setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, chosen } : b)));
        setActiveSelectId(null);
        setSelectedIndex(0);
    }, []);

    const pickOption = useCallback(
        (index) => {
            const block = activeSelect;
            if (!block) return;
            const option = block.options[index];
            resolveSelect(block.id, index);

            if (block.revealDetail) return; // answer already rendered inline
            if (option?.url) {
                // Same-tab for mailto: so we don't leave a blank window behind.
                if (option.url.startsWith('mailto:')) window.location.href = option.url;
                else window.open(option.url, '_blank', 'noopener,noreferrer');
                push([{ type: BLOCK_NOTICE, text: `Opening ${option.label} → ${option.url}` }]);
            }
        },
        [activeSelect, resolveSelect, push]
    );

    /** Send a question to Ari, streaming the reply into a single block. */
    const askAri = useCallback(
        async (question) => {
            const blockId = nextId();
            setBlocks((prev) => [
                ...prev,
                { id: blockId, type: BLOCK_AI, text: '', streaming: true },
            ]);
            setBusy(true);

            const appendToken = (chunk) =>
                setBlocks((prev) =>
                    prev.map((b) => (b.id === blockId ? { ...b, text: b.text + chunk } : b))
                );

            try {
                await ari.ask(question, appendToken);
                setBlocks((prev) =>
                    prev.map((b) => (b.id === blockId ? { ...b, streaming: false } : b))
                );
            } catch (err) {
                console.error('Ari request failed:', err);
                setBlocks((prev) =>
                    prev
                        .filter((b) => b.id !== blockId)
                        .concat(
                            withIds([
                                {
                                    type: BLOCK_ERROR,
                                    text: 'Ari could not answer that.',
                                    hint: err?.message || 'Check the browser console for details.',
                                },
                            ])
                        )
                );
            } finally {
                setBusy(false);
            }
        },
        [ari]
    );

    const submit = useCallback(
        (raw) => {
            const value = raw.trim();
            if (!value) return;

            setInput('');
            historyCursorRef.current = null;
            commandHistoryRef.current = [...commandHistoryRef.current, value];

            // Inside an Ari session, anything that is not a slash command is a question.
            if (ariActive && !value.startsWith('/')) {
                push([{ type: BLOCK_PROMPT, text: value }]);
                askAri(value);
                return;
            }

            const { blocks: resultBlocks, action } = runCommand(value, ctx);

            if (action === ACTION_CLEAR) {
                blockSeq = 0;
                setBlocks(INITIAL_BLOCKS());
                setActiveSelectId(null);
                return;
            }

            const emitted = withIds([{ type: BLOCK_PROMPT, text: value }, ...resultBlocks]);
            setBlocks((prev) => [...prev, ...emitted]);

            // A select block becomes the keyboard target.
            const select = emitted.find((b) => b.type === BLOCK_SELECT);
            if (select) {
                setActiveSelectId(select.id);
                setSelectedIndex(0);
            } else {
                setActiveSelectId(null);
            }

            if (action === ACTION_EXIT) {
                onExit?.();
            } else if (action === ACTION_ASK_ARI) {
                setAriActive(true);
                ari.load();
            } else if (action === ACTION_EXIT_ARI) {
                setAriActive(false);
                ari.reset();
            }
        },
        [ariActive, ctx, push, askAri, onExit, ari]
    );

    const recallHistory = useCallback((direction) => {
        const history = commandHistoryRef.current;
        if (!history.length) return;

        const current = historyCursorRef.current;
        let next;
        if (direction === 'up') {
            next = current === null ? history.length - 1 : Math.max(0, current - 1);
        } else {
            // Stepping past the newest entry returns to an empty, fresh line.
            next = current === null ? null : current + 1;
        }

        if (next === null || next >= history.length) {
            historyCursorRef.current = null;
            setInput('');
            return;
        }
        historyCursorRef.current = next;
        setInput(history[next]);
    }, []);

    const handleKeyDown = (e) => {
        // 1. An open select list owns the arrow keys.
        if (activeSelect) {
            const count = activeSelect.options.length;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((i) => (i + 1) % count);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((i) => (i - 1 + count) % count);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                pickOption(selectedIndex);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                resolveSelect(activeSelect.id, null);
            }
            return;
        }

        // 2. The autocomplete menu owns them next.
        if (suggestions.length) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSuggestionIndex((i) => (i + 1) % suggestions.length);
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSuggestionIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
                return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                setInput(suggestions[suggestionIndex].name);
                return;
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                submit(suggestions[suggestionIndex].name);
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                setInput('');
                return;
            }
        }

        // 3. Otherwise: plain line editing.
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!busy) submit(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            recallHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            recallHistory('down');
        } else if (e.key === 'Escape') {
            e.preventDefault();
            if (input) setInput('');
            else onExit?.();
        }
    };

    const statusLine = () => {
        if (busy) return 'Ari is thinking…';
        if (ariActive && ari.status === ARI_LOADING)
            return `Loading Ari${ari.progress ? ` — ${ari.progress}%` : ''} (first run downloads the model)`;
        if (ariActive && ari.status === ARI_ERROR) return `Ari failed to load: ${ari.error}`;
        if (ariActive && ari.status === ARI_READY) return 'Ari session — ask anything, /exit-ari to leave';
        return null;
    };

    const placeholder = activeSelect
        ? '↑/↓ to choose, Enter to select…'
        : ariActive
          ? 'Ask Ari about Roshan…'
          : 'Try "/" for commands';

    return (
        <div
            className="fixed inset-0 z-40 flex flex-col text-[13px] sm:text-sm"
            style={{ background: C.bg, fontFamily: FONT_STACK }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Output */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-4 sm:px-8 sm:pt-6">
                <div className="mx-auto max-w-3xl space-y-3 pb-4">
                    {blocks.map((block) => {
                        switch (block.type) {
                            case BLOCK_BANNER:
                                return <Banner key={block.id} />;
                            case BLOCK_PROMPT:
                                return <PromptEcho key={block.id} text={block.text} />;
                            case BLOCK_TEXT:
                                return <Bullet key={block.id}>{block.text}</Bullet>;
                            case BLOCK_TREE:
                                return (
                                    <TreeBlock key={block.id} title={block.title} rows={block.rows} />
                                );
                            case BLOCK_SELECT:
                                return (
                                    <SelectBlock
                                        key={block.id}
                                        block={block}
                                        active={block.id === activeSelectId}
                                        selectedIndex={selectedIndex}
                                        onPick={pickOption}
                                    />
                                );
                            case BLOCK_AI:
                                return <AiBlock key={block.id} block={block} />;
                            case BLOCK_ERROR:
                                return (
                                    <div key={block.id}>
                                        <Bullet color={C.error}>{block.text}</Bullet>
                                        {block.hint && (
                                            <div className="ml-6 text-xs" style={{ color: C.muted }}>
                                                {block.hint}
                                            </div>
                                        )}
                                    </div>
                                );
                            case BLOCK_NOTICE:
                                return (
                                    <div
                                        key={block.id}
                                        className="text-xs whitespace-pre-wrap"
                                        style={{ color: C.muted }}
                                    >
                                        {block.text}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>

            {/* Composer */}
            <div className="px-4 pb-4 sm:px-8 sm:pb-6">
                <div className="mx-auto max-w-3xl">
                    {/* Autocomplete menu */}
                    {suggestions.length > 0 && (
                        <div
                            className="mb-2 rounded-lg overflow-hidden"
                            style={{ border: `1px solid ${C.border}`, background: C.panel }}
                        >
                            {suggestions.map((cmd, i) => (
                                <div
                                    key={cmd.name}
                                    onClick={() => submit(cmd.name)}
                                    className="flex items-baseline gap-3 px-3 py-1.5 text-sm cursor-pointer"
                                    style={{
                                        background: i === suggestionIndex ? C.selectBg : 'transparent',
                                        color: i === suggestionIndex ? C.accent : C.text,
                                    }}
                                >
                                    <span className="w-24">{cmd.name}</span>
                                    <span className="text-xs" style={{ color: C.muted }}>
                                        {cmd.summary}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        className="flex items-center gap-2 rounded-lg px-3 py-2"
                        style={{ border: `1px solid ${C.border}`, background: C.panel }}
                    >
                        <span style={{ color: C.accent }}>&gt;</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            aria-label="Terminal input"
                            autoComplete="off"
                            spellCheck="false"
                            className="flex-1 bg-transparent border-none outline-none"
                            style={{ color: C.text, fontFamily: FONT_STACK }}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-xs" style={{ color: C.dim }}>
                        <span style={{ color: statusLine() ? C.accent : C.dim }}>
                            {statusLine() || `${visibleCommands(ctx).length} commands · /help`}
                        </span>
                        <span>esc to exit</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
