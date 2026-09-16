import React from 'react';

function HeroBackground({ scrollY }) {
    const progress = Math.min(scrollY / 400, 1);

    return (
        <div
            className="absolute inset-0"
            style={{
                background: `
          radial-gradient(
            circle at ${50 + progress * 20}% ${50 - progress * 10}%,
            rgba(249,246,239,0.15),
            transparent 60%
          )
        `,
                transform: `scale(${1 + progress * 0.1})`,
                transition: 'background 0.1s linear',
            }}
        />
    );
}
export default HeroBackground;