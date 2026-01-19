import React, { useRef, useState, useEffect } from 'react';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import Navbar from './Navbar';
import Work from './Work';
import About from './About';
import FAQ from './FAQ';
import doublePopup from '../assets/double_popup.mp3';
import mouseClickAudio from '../assets/mouse_click.mov';
import { GITHUB_URL, LINKEDIN_URL, EMAIL_URL, BEHANCE_URL, SECTIONS } from './Constants';
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaBehanceSquare } from "react-icons/fa";
import train_img_1 from '../assets/train_img_1.png';
import train_img_2 from '../assets/train_img_2.png';
import train_img_3 from '../assets/train_img_3.png';
import train_img_4 from '../assets/train_img_4.png';
import train_img_5 from '../assets/train_img_5.png';
import train_img_6 from '../assets/train_img_6.png';
import Chat from './Chat';
import Contacts from './Contacts';
import { COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_GRAY, COLOR_HOVER_GRAY } from './ColorConstants';

const TRAIN_IMAGES = [train_img_1, train_img_2, train_img_3, train_img_4, train_img_5, train_img_6];


const Home = () => {
    const sectionRefs = useRef({});
    const [darkMode, setDarkMode] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const heartBtnRef = useRef(null);
    const audioRef = useRef(null);
    const mouseClickAudioRef = useRef(null);
    const [soundOn, setSoundOn] = useState(true);
    // State to track scroll position
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    // Utility: play mouse click sound if soundOn is enabled
    const playClickSound = React.useCallback(() => {
        if (soundOn && mouseClickAudioRef.current) {
            mouseClickAudioRef.current.currentTime = 0;
            mouseClickAudioRef.current.play();
        }
    }, [soundOn]);

    // Note: we avoid creating inline wrapper components here to keep
    // component references stable across renders. This helps prevent
    // unnecessary re-renders of heavy children components when
    // unrelated state (like AI chat input) changes.
    const sectionComponents = {
        Work,
        About,
        FAQ,
    };
    const [openChat, setOpenChat] = useState(false);


    const scrollToSection = (section) => {
        //get the section as element that is useref-ed
        const element = sectionRefs.current[section];
        if (element) {
            //Top of the main <body> relative to the viewport (screen)
            const bodyRect = document.body.getBoundingClientRect().top;
            //Top of the target section relative to the viewport
            //The below tell as how far from the top of the screen the element is right now
            const elementRect = element.getBoundingClientRect().top;
            //110 is the offset height of navbar without this the section headers will be behind navbar
            const offsetPosition = elementRect - bodyRect - 110;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    const handleHeartBurst = () => {
        if (soundOn && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1200);
    }

    // Effect to listen for scroll and update state
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 140;

            for (const sec of SECTIONS) {
                const el = sectionRefs.current[sec];
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;

                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(sec);
                    }
                }
            }

            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // AI chat box 
    const handleOpenChat = () => {
        setOpenChat((prev) => !prev);
    };

    return (
        <div className={darkMode ? `dark bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}]` : `bg-[${COLOR_LIGHT_BG}] text-[${COLOR_LIGHT_TEXT}]`}>
            <Navbar
                darkMode={darkMode}
                scrolled={scrolled}
                toggleTheme={toggleTheme}
                sections={SECTIONS}
                scrollToSection={scrollToSection}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                activeSection={activeSection}
            />

            <main className="pt-24 container mx-auto px-2 sm:px-8">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center w-full" style={{ minHeight: '66vh' }}>
                    <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-extrabold text-center leading-tight tracking-tight select-none">
                        Hi I'm
                        <br />Roshan Raj
                    </h1>
                    <StarBurst />
                    <SlotMachine />
                    <Punchline />
                </section>

                {/* Other Sections */}
                {SECTIONS.map((sec, idx) => {
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
                                {/* Render sections with explicit props to avoid creating
                                    wrapper components on every render (prevents rerenders
                                    of heavy children when unrelated state changes). */}
                                {sec === 'Work' ? (
                                    <Work darkMode={darkMode} playClickSound={playClickSound} />
                                ) : sec === 'About' ? (
                                    <About darkMode={darkMode} soundOn={soundOn} playClickSound={playClickSound} />
                                ) : (
                                    <FAQ darkMode={darkMode} soundOn={soundOn} />
                                )}
                            </section>
                        </React.Fragment>
                    );
                })}
            </main >

            <footer className="p-8 text-center">
                <audio ref={audioRef} src={doublePopup} preload="auto" />
                <audio ref={mouseClickAudioRef} src={mouseClickAudio} preload="auto" />
                <HeartBurst show={showHearts} originRef={heartBtnRef} />

                {/* Train of static images (train_img_1 .. train_img_6) */}
                <div className="flex justify-center pb-9 width">
                    <div className="flex gap-4 overflow-x-auto px-4">
                        {TRAIN_IMAGES.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`train_img_${idx + 1}`}
                                className="rounded-lg object-cover mx-2"
                                style={{ width: 70, height: 93 }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        ref={heartBtnRef}
                        type="button"
                        onClick={handleHeartBurst}
                        className={`bg-gradient-to-r rounded-xl shadow-lg px-6 py-4 inline-block border transition-transform duration-200 active:scale-95 hover:-translate-y-1 hover:scale-105 ${darkMode ? `dark bg-gray-600 text-[${COLOR_LIGHT_GRAY}]` : `bg-[${COLOR_LIGHT_GRAY}] text-gray-600`} `}
                        style={{ position: 'relative' }}
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
                <div className="justify-center items-center gap-2 text-sm text-gray-500 mt-6">
                    Connect with me:
                    <Contacts darkMode={darkMode} playClickSound={playClickSound} />
                </div>
                <div>
                    <span className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Roshan Raj
                    </span>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <div className="fixed right-4 bottom-4 z-40">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`rounded-full p-3 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'} ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}] hover:bg-[${COLOR_DARK_TEXT}] text-[${COLOR_LIGHT_TEXT}]` : `dark bg-[${COLOR_DARK_BG}] hover:bg-[${COLOR_HOVER_GRAY}] text-[${COLOR_DARK_TEXT}]`}`}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="size-5" />
                </button>
            </div>

            {/* AI chat button */}
            <div className="fixed left-4 bottom-4 z-40">
                <button
                    onClick={handleOpenChat}
                    className={`highlight-card relative px-4 py-2 rounded-full shadow-lg ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_LIGHT_TEXT}]` : `bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}]`}`}
                >
                    <div className={`flex items-center justify-center text-center gap-1 `}>
                        <BsFillChatLeftTextFill />
                        <span>AI Chat</span>
                    </div>
                </button>
            </div>
            {/* AI chat Model overlay */}
            {openChat && (
                <Chat onClose={() => setOpenChat(false)} />
            )}
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
        '🚀', '💡', '🦄', '🔥', '🌟', '💻', '📚', '🧠', '⚡', '🍀', '🧩', '🎉', '🥇', '🛠️', '🧑‍💻'
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
                            className="relative bg-gradient-to-r from-green-400 to-green-600 text-[#ffffff] px-6 py-3 rounded-xl font-bold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none flex items-center justify-center"
                            onMouseEnter={() => setGiftStarHover(true)}
                            onMouseLeave={() => setGiftStarHover(false)}
                        >
                            {giftStarHover && <GiftStarBurst />}
                            🎁 Claim Your Gift
                        </a>
                        <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-2 rounded bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg`}>
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

export default Home;