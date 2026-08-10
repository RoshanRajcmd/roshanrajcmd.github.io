import { useCallback, useEffect, useRef, useState } from 'react';
import portfolioAiContext from '../../data/portfolioAiContext.js';
import { MLC_MODEL_ID, ROLE_USER } from '../Constants';

export const ARI_IDLE = 'idle';
export const ARI_LOADING = 'loading';
export const ARI_READY = 'ready';
export const ARI_ERROR = 'error';

/** Normalise web-llm's progress callback payload to a 0-100 integer. */
function toPercent(raw) {
    if (typeof raw === 'number') {
        return raw > 1 ? Math.round(raw) : Math.round(raw * 100);
    }
    if (raw && typeof raw === 'object') {
        const value = raw.progress ?? raw.percent ?? raw.value;
        if (typeof value === 'number') {
            return value > 1 ? Math.round(value) : Math.round(value * 100);
        }
    }
    return 0;
}

/**
 * Owns the on-device web-llm engine for Ari.
 *
 * The engine is created lazily — `load()` is only called once the visitor
 * actually runs /ask-ari, so the multi-hundred-MB model download never happens
 * for people who just browse the terminal. `ask()` streams tokens back through
 * the `onToken` callback so the terminal can render them as they arrive.
 */
export default function useAriEngine() {
    const [status, setStatus] = useState(ARI_IDLE);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const engineRef = useRef(null);
    const loadPromiseRef = useRef(null);
    const disposedRef = useRef(false);
    // Conversation turns, excluding the system prompt (added at request time).
    const turnsRef = useRef([]);

    useEffect(() => {
        disposedRef.current = false;
        return () => {
            disposedRef.current = true;
            const engine = engineRef.current;
            engineRef.current = null;
            try {
                if (typeof engine?.unload === 'function') engine.unload();
                else if (typeof engine?.terminate === 'function') engine.terminate();
            } catch {
                // Teardown is best-effort; a failed unload must not break navigation.
            }
        };
    }, []);

    const load = useCallback(() => {
        if (loadPromiseRef.current) return loadPromiseRef.current;

        setStatus(ARI_LOADING);
        setProgress(0);
        setError(null);

        loadPromiseRef.current = (async () => {
            try {
                // Dynamic import keeps web-llm out of the main bundle.
                const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
                const engine = await CreateMLCEngine(MLC_MODEL_ID, {
                    initProgressCallback: (raw) => {
                        if (!disposedRef.current) setProgress(toPercent(raw));
                    },
                });
                if (disposedRef.current) return null;
                engineRef.current = engine;
                setStatus(ARI_READY);
                return engine;
            } catch (err) {
                console.error('Ari engine init failed:', err);
                if (!disposedRef.current) {
                    setError(err?.message || String(err));
                    setStatus(ARI_ERROR);
                }
                // Allow a later /ask-ari to retry a failed load.
                loadPromiseRef.current = null;
                return null;
            }
        })();

        return loadPromiseRef.current;
    }, []);

    /**
     * Send a question to Ari. Resolves with the full reply text.
     * `onToken(chunk)` fires for each streamed delta.
     */
    const ask = useCallback(
        async (question, onToken) => {
            const engine = engineRef.current || (await load());
            if (!engine) throw new Error(error || 'Ari is unavailable.');

            const messages = [
                { role: 'system', content: portfolioAiContext },
                ...turnsRef.current,
                { role: ROLE_USER, content: question },
            ];

            let reply = '';
            const stream = await engine.chat.completions.create({
                messages,
                max_tokens: 400,
                temperature: 0.6,
                stream: true,
            });

            for await (const chunk of stream) {
                const delta = chunk.choices?.[0]?.delta?.content;
                if (delta) {
                    reply += delta;
                    onToken?.(delta);
                }
            }

            const answer = reply.trim() || '…';
            turnsRef.current = [
                ...turnsRef.current,
                { role: ROLE_USER, content: question },
                { role: 'assistant', content: answer },
            ];
            return answer;
        },
        [load, error]
    );

    const reset = useCallback(() => {
        turnsRef.current = [];
    }, []);

    return { status, progress, error, load, ask, reset };
}
