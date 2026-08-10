import React, { useState } from 'react';
import { COLOR_DARK_BG, COLOR_DARK_TEXT } from './ColorConstants';

function GiftStarBurst() {
    return (
        <div className="pointer-events-none absolute insert-0 flex justify-center items-center z-10">
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                const distance = 40 + Math.random() * 10;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return (
                    <span
                        key={i}
                        className="absolute text-yellow-300 text-2xl animate-star-burst"
                        style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            animationDelay: `${Math.random() * 0.2}s`,
                        }}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}

function SlotMachine({ scrollY = 0 }) {
    const emojis = React.useMemo(() => [
        '🚀', '💡', '🦄', '🔥', '🌟', '💻', '📚', '🧠', '⚡', '🍀', '🧩', '🎉', '🥇', '🛠️', '🧑‍💻'
    ], []);
    const [slots, setSlots] = useState(['', '', '']);
    const [spinning, setSpinning] = useState(true);
    const [showGift, setShowGift] = useState(false);
    const [giftStarHover, setGiftStarHover] = useState(false);
    const clover = '🍀';
    const luckyPage = React.useMemo(() => Math.floor(Math.random() * 2) === 0, []);

    const progress = Math.min(scrollY / 300, 1);

    React.useEffect(() => {
        let interval;
        let count = 0;
        setSpinning(true);
        interval = setInterval(() => {
            if (count > 15 && luckyPage) {
                setSlots([clover, clover, clover]);
            } else {
                setSlots([
                    emojis[Math.floor(Math.random() * emojis.length)],
                    emojis[Math.floor(Math.random() * emojis.length)],
                    emojis[Math.floor(Math.random() * emojis.length)]
                ]);
            }
            count++;
            if (count > 15) {
                clearInterval(interval);
                setSpinning(false);
            }
        }, 80);
        return () => clearInterval(interval);
    }, [emojis, luckyPage]);

    React.useEffect(() => {
        if (slots[0] === clover && slots[1] === clover && slots[2] === clover && !spinning) {
            setShowGift(true);
        }
    }, [slots, spinning]);

    return (
        <div className="flex flex-col items-center"
            style={{
                opacity: 1 - progress * 1.2,
                transform: `translateY(${progress * -40}px)`
            }}>
            <div className="mt-8 flex justify-center items-center gap-2">
                {slots.map((emoji, i) => (
                    <span
                        key={i}
                        className={`text-5xl md:text-6xl transition-transform duration-300 ${spinning ? 'animate-spin-slot' : ''}`}
                    >
                        {emoji}
                    </span>
                ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Try your luck! If you get 3 clovers, a special gift appears. (1 in 5 chance per page load)
            </div>
            {showGift && (
                <div className="mt-6 flex flex-col items-center">
                    <div className="relative group">
                        <a
                            href="/cute_stickers_ifound_in_internet.zip"
                            download
                            className="relative bg-gradient-to-r from-green-400 to-green-600 text-[#ffffff] px-6 py-3 rounded-xl font-bold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none flex items-center justify-center"
                            onMouseEnter={() => setGiftStarHover(true)}
                            onMouseLeave={() => setGiftStarHover(false)}
                        >
                            {giftStarHover && <GiftStarBurst />}
                            🎁 Claim Your Gift
                        </a>
                        {/* Colours inline: Tailwind cannot generate arbitrary values
                            built from template literals. */}
                        <span
                            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
                            style={{ backgroundColor: COLOR_DARK_BG, color: COLOR_DARK_TEXT }}
                        >
                            You got some free cute sticker
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SlotMachine;
