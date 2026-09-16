function ScrollHint({ scrollY }) {
    const progress = Math.min(scrollY / 100, 1);

    return (
        <div
            className="absolute bottom-6 flex flex-col items-center gap-2 pointer-events-none"
            style={{
                opacity: 1 - progress,
                transform: `translateY(${progress * 20}px)`,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
        >
            <span className="text-[10px] tracking-widest uppercase opacity-70">
                Scroll to explore
            </span>

            <span
                className="w-px bg-current"
                style={{
                    height: `${40 + progress * 30}px`,
                    opacity: 0.6,
                    transition: 'height 0.3s ease',
                }}
            />
        </div>
    );
}
export default ScrollHint;