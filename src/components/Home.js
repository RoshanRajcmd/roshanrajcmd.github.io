import React, { useRef, useState } from 'react';
import musicFile from '../assets/background-music.mp3';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import Navbar from './Navbar';
import Work from './Work';
import About from './About';
import FAQ from './FAQ';

const sections = ['Work', 'About', 'FAQ'];
const BLOG_URL = 'https://medium.com/@roshanrajpersonal55';
const GITHUB_URL = "https://github.com/roshanrajcmd";
const LINKEDIN_URL = "https://www.linkedin.com/in/roshanraj1999/";
const EMAIL_URL = "mailto:roshanraj5121999@gmail.com";


const Home = () => {
    const sectionRefs = useRef({});
    const [darkMode, setDarkMode] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const audioRef = useRef(null);
    const heartBtnRef = useRef(null);

    const scrollToSection = (section) => {
        const element = sectionRefs.current[section];
        if (element) {
            //Top of the <body> relative to the viewport
            const bodyRect = document.body.getBoundingClientRect().top;
            //Top of the target section relative to the viewport
            const elementRect = element.getBoundingClientRect().top;
            //80 is the offset height of navbar or custom offset
            const offsetPosition = elementRect - bodyRect - 110;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (musicPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => { });
        }
        setMusicPlaying((prev) => !prev);
    };

    const handleHeartBurst = () => {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1200);
    }

    // State to track scroll position
    const [scrolled, setScrolled] = useState(false);

    // Effect to listen for scroll and update state
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sectionComponents = {
        Work,
        About,
        FAQ,
    };

    return (
        <div className={darkMode ? 'dark bg-[#141414] text-[#ffffff]' : 'bg-[#ffffff]  text-[#141414]'}>
            <Navbar
                darkMode={darkMode}
                scrolled={scrolled}
                musicPlaying={musicPlaying}
                toggleMusic={toggleMusic}
                toggleTheme={toggleTheme}
                sections={sections}
                scrollToSection={scrollToSection}
                blogLink={BLOG_URL}
            />
            <audio ref={audioRef} loop src={musicFile} />

            <main className="pt-24 container mx-auto px-2 sm:px-8">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center w-full" style={{ minHeight: '66vh' }}>
                    <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-extrabold text-center leading-tight tracking-tight select-none">
                        Hi I'm.
                        <br />Roshan Raj.
                    </h1>
                    <StarBurst />
                    <SlotMachine />
                    <Punchline />
                </section>
                {/* Sections */}
                {sections.map((sec, idx) => {
                    const SectionComponent = sectionComponents[sec];
                    return (
                        <React.Fragment key={sec}>
                            {idx !== 0 && (
                                <>
                                    <hr className="my-12 border-t-2 border-gray-300 dark:border-gray-700" />
                                    <div className="mb-8" />
                                </>
                            )}
                            <section
                                ref={(el) => (sectionRefs.current[sec] = el)}
                                className="flex flex-col"
                            >
                                <SectionComponent darkMode={darkMode} />
                            </section>
                        </React.Fragment>
                    );
                })}
            </main >

            <footer className="p-8 text-center">
                <HeartBurst show={showHearts} originRef={heartBtnRef} />
                <div className="flex justify-center">
                    <button
                        ref={heartBtnRef}
                        type="button"
                        onClick={handleHeartBurst}
                        className={`bg-gradient-to-r rounded-xl shadow-lg px-6 py-4 inline-block border transition-transform duration-200 active:scale-95 hover:-translate-y-1 hover:scale-105 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'} `}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <p
                            style={{
                                fontFamily: '"Departure Mono", "JetBrains Mono", "Helena Zhang", monospace'
                            }}
                        >
                            You could have been anywhere on the internet, yet you're here. Thanks for visiting❤️!
                        </p>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-6">
                    Connect with me:
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                        aria-label="GitHub"
                    >
                        <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="GithubLogo" data-size="20px" data-weight="regular">
                            <FaGithubSquare className="size-8" />
                        </div>
                    </a>
                    <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                        aria-label="LinkedIn"
                    >
                        <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                            <FaLinkedin className="size-8" />
                        </div>
                    </a>
                    <a
                        href={EMAIL_URL}
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                        aria-label="Email"
                    >
                        <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`}>
                            <IoMailUnread className="size-8" />
                        </div>
                    </a>
                </div>
                <div>
                    <span className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Roshan Raj
                    </span>
                </div>
            </footer>
            {/* Scroll to Top Button */}
            <div className="fixed bottom-8 right-8 z-40">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`rounded-full p-3 shadow-lg shadow-black transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'} ${darkMode ? 'bg-[#ededed] hover:bg-[#ffffff] text-[#141414]' : 'dark bg-[#141414] hover:bg-[#4e4d4d] text-[#ffffff]'}`}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="w-5 h-5" />
                </button>
            </div>
        </div >
    );
};

function HeartBurst({ show, originRef }) {
    const [positions, setPositions] = useState([]);
    React.useEffect(() => {
        if (show && originRef?.current) {
            const rect = originRef.current.getBoundingClientRect();
            setPositions(
                Array.from({ length: 18 }).map(() => {
                    const angle = Math.random() * 2 * Math.PI;
                    const distance = 80 + Math.random() * 80;
                    return {
                        x: rect.left + rect.width / 2 + Math.cos(angle) * 10,
                        y: rect.top + rect.height / 2 + Math.sin(angle) * 10,
                        dx: Math.cos(angle) * distance,
                        dy: Math.sin(angle) * distance,
                        delay: Math.random() * 0.2,
                    };
                })
            );
        }
    }, [show, originRef]);
    if (!show) return null;
    return (
        <>
            {positions.map((pos, i) => (
                <span
                    key={i}
                    className="fixed text-3xl pointer-events-none animate-heart-burst"
                    style={{
                        left: pos.x,
                        top: pos.y,
                        '--dx': `${pos.dx}px`,
                        '--dy': `${pos.dy}px`,
                        animationDelay: `${pos.delay}s`,
                    }}
                >
                    ❤️
                </span>
            ))}
        </>
    );
}

// Add StarBurst animation component
function StarBurst() {
    const [show, setShow] = useState(true);
    React.useEffect(() => {
        setShow(true);
        const timeout = setTimeout(() => setShow(false), 1200);
        return () => clearTimeout(timeout);
    }, []);
    if (!show) return null;
    return (
        <div className="pointer-events-none absolute inset-0 flex justify-center items-center z-10">
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                const distance = 180 + Math.random() * 40;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return (
                    <span
                        key={i}
                        className="absolute text-yellow-300 text-4xl animate-star-burst"
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

// Add SlotMachine animation component
function SlotMachine() {
    const emojis = React.useMemo(() => [
        '🚀', '💡', '🎨', '🦄', '🔥', '🌟', '💻', '🎵', '📚', '🧠', '⚡', '🍀', '🧩', '🕹️', '🎉', '🥇', '🛠️', '🧑‍💻'
    ], []);
    const [slots, setSlots] = useState(['', '', '']);
    const [spinning, setSpinning] = useState(true);
    const [showGift, setShowGift] = useState(false);
    const [giftStarHover, setGiftStarHover] = useState(false);
    const clover = '🍀';
    // Determine if this page load is a 'lucky' one (increase chance: 1 in 2)
    const luckyPage = React.useMemo(() => Math.floor(Math.random() * 2) === 0, []);

    React.useEffect(() => {
        let interval;
        let count = 0;
        setSpinning(true);
        interval = setInterval(() => {
            // If lucky page, force 3 clovers at the end
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
            if (count > 15) { // spin for a short while
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
        <div className="flex flex-col items-center">
            <div className="mt-8 flex justify-center items-center gap-2">
                {slots.map((emoji, i) => (
                    <span
                        key={i}
                        className={`text-5xl md:text-6xl transition-transform duration-300 ${spinning ? 'animate-spin-slot' : ''}`}
                        style={{ display: 'inline-block' }}
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
                            className="relative bg-gradient-to-r from-green-400 to-green-600 text-[#ffffff] px-6 py-3 rounded-xl shadow-lg font-bold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none flex items-center justify-center"
                            onMouseEnter={() => setGiftStarHover(true)}
                            onMouseLeave={() => setGiftStarHover(false)}
                        >
                            {giftStarHover && <GiftStarBurst />}
                            🎁 Claim Your Gift
                        </a>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-2 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            You got some free cute sticker
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

// Punchline component
function Punchline() {
    const punchlines = [
        "Turning ideas into 'heck yes!' moments.",
        "Crafting 0 → 1 journeys that feel like magic",
        "Building products that spark joy and drop jaws.",
        "Designing experiences that whisper ‘whoa’ and shout ‘wow!’ ",
        "Engineer of ‘Aha!’ moments. <3"
    ];
    const [line] = React.useState(() => punchlines[Math.floor(Math.random() * punchlines.length)]);
    return (
        <div className="mt-10 text-lg md:text-xl text-center font-semibold italic text-indigo-500 dark:text-indigo-300 select-none">
            {line}
        </div>
    );
}

// Star burst for the gift button
function GiftStarBurst() {
    return (
        <div className="pointer-events-none absolute inset-0 flex justify-center items-center z-10">
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

export default Home;