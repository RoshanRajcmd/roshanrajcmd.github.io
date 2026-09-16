import { OFFLINE_CARDS } from './Constants';

export function Offline() {
    return (
        <>
            <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-5 pt-10">Beyond Work</h2>
            <div className="grid md:grid-cols-3 gap-6 px-2 sm:px-4">
                {OFFLINE_CARDS.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-2xl flex flex-col gap-1 bg-[#ededed] text-[#141414] transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                        <span className="text-xl font-semibold">{item.title}</span>
                        <span className="text-sm font-light text-neutral-500">{item.subtitle}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
