import React, { useRef, useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";
import Navbar from './Navbar';
import Work from './Work';
import About from './About';
import FAQ from './FAQ';
import doublePopup from '../assets/double_popup.mp3';
import mouseClickAudio from '../assets/mouse_click.mov';
import { SECTIONS } from './Constants';
import train_img_1 from '../assets/train_img_1.png';
import train_img_2 from '../assets/train_img_2.png';
import train_img_3 from '../assets/train_img_3.png';
import train_img_4 from '../assets/train_img_4.png';
import train_img_5 from '../assets/train_img_5.png';
import train_img_6 from '../assets/train_img_6.png';
import Contacts from './Contacts';
import { COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_GRAY, COLOR_HOVER_GRAY, COLOR_GRAY_600 } from './ColorConstants';

import HeroBackground from './HeroBackground';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import ScrollHint from './ScrollHint';
import SlotMachine from './SlotMachine';

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
    const [scrollTopHover, setScrollTopHover] = useState(false);
    // Utility: play mouse click sound if soundOn is enabled
    const playClickSound = React.useCallback(() => {
        if (soundOn && mouseClickAudioRef.current) {
            mouseClickAudioRef.current.currentTime = 0;
            mouseClickAudioRef.current.play();
        }
    }, [soundOn]);

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

    const [scrollY, setScrollY] = useState(0);

    // A single scroll listener drives every scroll-derived piece of state. The
    // work is deferred to a rAF so a burst of scroll events only reads layout
    // (offsetTop/offsetHeight force a reflow) once per frame.
    useEffect(() => {
        let frame = null;

        const update = () => {
            frame = null;
            const y = window.scrollY;
            const scrollPos = y + 140;

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

            setScrolled(y > 80);
            setScrollY(y);
        };

        const handleScroll = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            className={darkMode ? 'dark' : ''}
            style={{
                backgroundColor: darkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
                color: darkMode ? COLOR_DARK_TEXT : COLOR_LIGHT_TEXT,
            }}
        >
            <Navbar
                darkMode={darkMode}
                scrolled={scrolled}
                toggleTheme={toggleTheme}
                sections={SECTIONS}
                scrollToSection={scrollToSection}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                activeSection={activeSection}
                playClickSound={playClickSound}
            />

            {/* Hero Section - Outside main to avoid padding */}
            <section
                ref={(el) => (sectionRefs.current["Home"] = el)}
                className="relative w-full overflow-hidden"
                style={{ height: '100vh' }}
            >
                {/* Background */}
                <HeroBackground scrollY={scrollY} />

                {/* Foreground */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <HeroTitle scrollY={scrollY} />
                    <SlotMachine scrollY={scrollY} />
                    <HeroSubtitle scrollY={scrollY} />
                    <ScrollHint scrollY={scrollY} />
                </div>
            </section>

            <main className="pt-24 container mx-auto px-2 sm:px-8">


                {/* Other Sections */}
                {SECTIONS.map((sec, idx) => {
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
                        className={`bg-gradient-to-r rounded-xl shadow-lg px-6 py-4 inline-block border transition-transform duration-200 active:scale-95 hover:-translate-y-1 hover:scale-105 ${darkMode ? 'dark' : ''}`}
                        style={{
                            position: 'relative',
                            // backgroundColor (not the `background` shorthand) so the
                            // bg-gradient-to-r background-image is preserved.
                            backgroundColor: darkMode ? COLOR_GRAY_600 : COLOR_LIGHT_GRAY,
                            color: darkMode ? COLOR_LIGHT_GRAY : COLOR_GRAY_600,
                        }}
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
                    Connect with me
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
                {/* Colours (including the hover swap) are applied inline because
                    Tailwind cannot generate arbitrary values built from template
                    literals. */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`rounded-full p-3 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'} ${darkMode ? '' : 'dark'}`}
                    style={{
                        backgroundColor: scrollTopHover
                            ? (darkMode ? COLOR_DARK_TEXT : COLOR_HOVER_GRAY)
                            : (darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG),
                        color: darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,
                    }}
                    onMouseEnter={() => setScrollTopHover(true)}
                    onMouseLeave={() => setScrollTopHover(false)}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="size-5" />
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

export default Home;