import React, { useEffect, useRef, useState } from 'react';
import portfolioAiContext from "../data/portfolioAiContext.js";
import { ROLE_AI, ROLE_USER, MLC_MODEL_ID } from './Constants';

export default function Chat({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [chatProgress, setChatProgress] = useState(0);
    const [modelError, setModelError] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const initStartedRef = useRef(false);
    const engineRef = useRef(null);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        // initial greeting
        setMessages([
            { type: ROLE_AI, text: "👋😃 Hi, this is Roshan's AI assistant! - ⚠️ The Model will respond slow due to cold start, Please be patient ⚠️" }
        ]);
        // Start engine init on first mount
        initEngine();
        return () => {
            // teardown engine if possible
            try {
                if (engineRef.current && typeof engineRef.current?.terminate === 'function') {
                    engineRef.current.terminate();
                }
            } catch (e) {
                // ignore
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // scroll to bottom when messages change
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    async function initEngine() {
        if (initStartedRef.current) return;
        initStartedRef.current = true;
        setChatLoading(true);
        try {
            // dynamic import of web-llm so it's not bundled in the main chunk
            //do not put the import string as constant
            const mod = await import('@mlc-ai/web-llm');
            const CreateMLCEngine = mod.CreateMLCEngine;
            const eng = await CreateMLCEngine(MLC_MODEL_ID, {
                initProgressCallback: (raw) => {
                    let pct = 0;
                    if (typeof raw === 'number') {
                        pct = raw > 1 ? Math.round(raw) : Math.round(raw * 100);
                    } else if (raw && typeof raw === 'object') {
                        const v = raw.progress ?? raw.percent ?? raw.value;
                        if (typeof v === 'number') {
                            pct = v > 1 ? Math.round(v) : Math.round(v * 100);
                        }
                    }
                    setChatProgress(pct);
                }
            });
            engineRef.current = eng;
        } catch (err) {
            console.error('CreateMLCEngine init error (Chat):', err);
            setModelError(err?.message || String(err));
        } finally {
            setChatLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;
        const newUserMessage = { type: ROLE_USER, text: input };
        setMessages((prev) => [...prev, newUserMessage]);
        setInput('');

        if (!engineRef.current) {
            setMessages((prev) => [...prev, { type: ROLE_AI, text: '⏳ Model loading… please wait!' }]);
            return;
        }

        const conversation = [
            { role: 'system', content: portfolioAiContext },
            ...messages.map((m) => ({ role: m.type === ROLE_USER ? ROLE_USER : 'assistant', content: m.text })),
            { role: ROLE_USER, content: input }
        ];

        // indicate model is processing the user's input
        setIsThinking(true);
        try {
            const result = await engineRef.current.chat.completions.create({ messages: conversation, max_tokens: 256, stream: false });
            const reply = result.choices?.[0]?.message?.content || '🤖 ...';
            setMessages((prev) => [...prev, { type: ROLE_AI, text: reply }]);
        } catch (err) {
            console.error('AI Error (Chat):', err);
            setMessages((prev) => [...prev, { type: ROLE_AI, text: '⚠️ AI model failed to respond. Check console.' }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-xl h-[600px] bg-black rounded-lg shadow-xl flex flex-col">

                {/* Header like Mac Terminal */}
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-t-lg">
                    <div className="flex gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full hover:cursor-pointer" onClick={onClose}></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full hover:cursor-not-allowed"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full hover:cursor-not-allowed"></span>
                    </div>
                    <span className='text-gray-500 font-mono'>roshanrajcmd@Roshan's-Portfolio:~</span>
                    <button onClick={onClose} className="text-white font-bold">&times;</button>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-green-400" id="chat-window" ref={chatWindowRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`${msg.type === ROLE_USER ? 'text-white' : 'text-green-400'}`}>
                            <span>{msg.type === ROLE_USER ? 'User: ' : 'Ari: '} {msg.text}</span>
                        </div>
                    ))}

                    {modelError && (
                        <div className="text-red-400">
                            ⚠️ AI model failed to initialize: {modelError}
                            <div className="text-xs text-gray-400 mt-2">Check browser console & Network tab for failed requests (workers/.wasm/model shards). See web-llm docs for deployment notes.</div>
                        </div>
                    )}

                    {(chatLoading) && !modelError && (
                        <div className="text-yellow-400">
                            <div>Please Hold ✋ Initializing AI model… {chatProgress > 0 && ` — ${chatProgress}%`} 🚀</div>
                        </div>
                    )}

                    {isThinking && !modelError && (
                        <div className="text-yellow-300 italic mt-2">Thinking...</div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-700">
                    <span className="text-white">$</span>
                    <input
                        type="text"
                        className="flex-1 bg-black border-none outline-none text-white font-mono px-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message and hit Enter..."
                    />
                    <button type="submit" className="bg-[#00ff22] text-black px-2 rounded">Send</button>
                </form>
            </div>
        </div>
    );
}
