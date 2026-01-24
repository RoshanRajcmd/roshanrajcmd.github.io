import React from 'react';

function HeroSubtitle({ scrollY }) {
    const progress = Math.min(scrollY / 200, 1);
    const punchlines = [
        "Turning ideas into 'heck yes!' moments.",
        "Crafting 0 → 1 journeys that feel like magic",
        "Building products that spark joy and drop jaws.",
        "Designing experiences that whisper ‘whoa’ and shout ‘wow!’ ",
        "Engineer of ‘Aha!’ moments. <3"
    ];
    const [line] = React.useState(() => punchlines[Math.floor(Math.random() * punchlines.length)]);

    return (
        <p
            className="mt-6 text-lg md:text-xl font-medium italic text-center text-indigo-500 dark:text-indigo-300"
            style={{
                opacity: 1 - progress * 1.2,
                transform: `translateY(${progress * -40}px)`
            }}
        >
            {line}
        </p>
    );
}
export default HeroSubtitle;