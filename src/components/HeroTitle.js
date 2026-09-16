function HeroTitle({ scrollY }) {
    const progress = Math.min(scrollY / 400, 1);

    return (
        <h1
            className="font-extrabold text-center leading-[0.9] tracking-tight select-none"
            style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                transform: `
          translateY(${progress * -120}px)
          scale(${1 - progress * 0.2})
        `,
                opacity: 1 - progress,
            }}
        >
            <span className="block">Hi. I'm</span>
            <span className="block">Roshan</span>
        </h1>
    );
}
export default HeroTitle;