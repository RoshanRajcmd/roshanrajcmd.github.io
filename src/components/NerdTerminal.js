import React, { useState, useEffect, useRef } from 'react';
import Home from './Home';
import { COLOR_DARK_BG, COLOR_DARK_TEXT } from './ColorConstants';
import { ImExit } from "react-icons/im";


// Command Database
const COMMAND_DATA = {
    '/work': {
        type: 'list',
        title: 'Featured Projects (Use ↑/↓ to navigate, Enter to open, Esc to clear list):',
        items: [
            { name: '⚡ Portfolio OS', desc: 'Interactive developer website', url: 'https://github.com/RoshanRajcmd' },
            { name: '🤖 Ari AI Assistant', desc: 'Custom AI agent integration', url: 'https://github.com/RoshanRajcmd' },
            { name: '📦 Open Source CLI', desc: 'Developer toolings & scripts', url: 'https://github.com/RoshanRajcmd' },
        ]
    },
    '/about': {
        type: 'text',
        content: 'Hi! I am Roshan Raj (@roshanrajcmd). Full-stack developer building interactive web software & CLI applications.'
    },
    '/social': {
        type: 'list',
        title: 'Social Links:',
        items: [
            { name: 'GitHub', desc: '@RoshanRajcmd', url: 'https://github.com/RoshanRajcmd' },
            { name: 'LinkedIn', desc: 'Roshan Raj Profile', url: 'https://linkedin.com' },
            { name: 'X / Twitter', desc: '@roshanrajcmd', url: 'https://x.com' },
        ]
    },
    '/faq': {
        type: 'text',
        content: 'Q: Open for remote work? A: Yes!\nQ: Favorite Tech Stack? A: JavaScript, React.js, Python, Tailwind CSS.'
    },
    '/ask-ari': {
        type: 'text',
        content: '💬 Ari AI Bot loaded! Type your prompt below to ask anything about Roshan\'s background.'
    },
    '/contact': {
        type: 'text',
        content: '📧 Email: roshanrajcmd@gmail.com\n💬 GitHub: https://github.com/RoshanRajcmd'
    },
    '/clear': {

    },
    '/exit': {

    }
};

export default function NerdTerminal() {
    const [isNerdMode, setIsNerdMode] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: '👾 Welcome to roshanrajcmd CLI [v1.0.0]\nType /work, /about, /social, /faq, /contact, or /ask-ari to start.' }
    ]);

    // Interactive list selection states
    const [activeList, setActiveList] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRef = useRef(null);

    // Auto-focus text input whenever Nerd Mode is activated
    useEffect(() => {
        if (isNerdMode) {
            inputRef.current?.focus();
        }
    }, [isNerdMode]);

    // Execute terminal command
    const handleCommandSubmit = (cmdStr) => {
        const cmd = cmdStr.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear' || cmd === '/clear') {
            setHistory([]);
            setActiveList(null);
            setInputVal('');
            return;
        }

        const commandResult = COMMAND_DATA[cmd];

        if (commandResult) {
            if (commandResult.type === 'list') {
                setHistory((prev) => [...prev, { type: 'cmd', text: cmd }, { type: 'system', text: commandResult.title }]);
                setActiveList(commandResult.items);
                setSelectedIndex(0);
            } else {
                setHistory((prev) => [...prev, { type: 'cmd', text: cmd }, { type: 'system', text: commandResult.content }]);
                setActiveList(null);
            }
        } else {
            setHistory((prev) => [
                ...prev,
                { type: 'cmd', text: cmd },
                { type: 'error', text: `Command not found: ${cmd}. Available: /work, /about, /social, /faq, /contact, /ask-ari` }
            ]);
            setActiveList(null);
        }

        setInputVal('');
    };

    // Keyboard controls for Arrow navigation, Enter, and Esc
    const handleKeyDown = (e) => {
        if (activeList) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % activeList.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
            } else if (e.key === 'Enter' && selectedIndex !== null) {
                e.preventDefault();
                const selectedItem = activeList[selectedIndex];
                if (selectedItem?.url) {
                    window.open(selectedItem.url, '_blank');
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setActiveList(null);
            }
        } else if (e.key === 'Enter') {
            handleCommandSubmit(inputVal);
        } else if (e.key === 'Escape') {
            setIsNerdMode(false); // Press ESC outside an active list to exit Nerd Mode
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans">

            {!isNerdMode ? (
                /* 1. DEFAULT NORMAL VIEW (Visually friendly view for recruiters) */
                <Home />
            ) : (
                /* 2. NERD VIEW (Terminal Mode) */
                <div
                    className="fixed inset-0 bg-black text-white font-mono p-6 overflow-y-auto flex flex-col justify-between z-40"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className="space-y-4 max-w-3xl">
                        {history.map((entry, index) => (
                            <div key={index} className="whitespace-pre-wrap">
                                {entry.type === 'cmd' && <span className="text-[#D87857]">roshanrajcmd@local % {entry.text}</span>}
                                {entry.type === 'system' && <div className="text-[#D87857]">{entry.text}</div>}
                                {entry.type === 'error' && <div className="text-rose-400">{entry.text}</div>}
                            </div>
                        ))}

                        {/* Interactive Arrow Selection List */}
                        {activeList && (
                            <div className="my-3 p-3 border border-emerald-800 rounded bg-emerald-950/40 space-y-1">
                                {activeList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`px-2 py-1 rounded flex justify-between cursor-pointer ${idx === selectedIndex ? 'bg-emerald-500 text-black font-bold' : 'text-emerald-400'
                                            }`}
                                        onClick={() => window.open(item.url, '_blank')}
                                    >
                                        <span>{idx === selectedIndex ? '❯ ' : '  '}{item.name}</span>
                                        <span className="text-xs opacity-80">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Command Line Input */}
                        <div className="flex items-center space-x-2 pt-2">
                            <span className="text-emerald-500 font-bold">roshanrajcmd@local % </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-1 text-green-300 font-mono"
                                placeholder={activeList ? "Use ↑/↓ arrows, Enter to open, ESC to cancel..." : "Type /work, /about, /ask-ari..."}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* 3. NERD VIEW TOGGLE BUTTON */}
            <button
                onClick={() => setIsNerdMode(!isNerdMode)}
                className={`fixed left-4 bottom-4 z-40 highlight-card px-4 py-2 rounded-full shadow-lg bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}] flex items-center gap-2`}
            >
                {isNerdMode ? <><ImExit /> <span>Esc</span></> : <span>🧑‍💻 Nerd View</span>}
            </button>

        </div >
    );
}