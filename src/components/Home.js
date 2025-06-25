import React, { useRef, useState } from 'react';
import musicFile from '../assets/background-music.mp3';
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import Navbar from './Navbar';
import ChatBox from './ChatBox';
import Work from './Work';
import About from './About';
import FAQ from './FAQ';

const sections = ['Work', 'About', 'FAQ'];


const Home = () => {
    const sectionRefs = useRef({});
    const [darkMode, setDarkMode] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [isOpen, setIsChatOpen] = useState(false);
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

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    }

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
        <div className={darkMode ? 'dark bg-[#141414] text-white' : 'bg-white  text-[#141414]'}>
            <Navbar
                darkMode={darkMode}
                scrolled={scrolled}
                musicPlaying={musicPlaying}
                toggleMusic={toggleMusic}
                toggleTheme={toggleTheme}
                sections={sections}
                scrollToSection={scrollToSection}
            />
            <audio ref={audioRef} loop src={musicFile} />

            <main className="pt-24 container mx-auto px-2 sm:px-8">
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
                        className={`bg-gradient-to-r rounded-xl shadow-lg px-6 py-4 inline-block border transition-transform active:scale-95 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <p
                            style={{
                                fontFamily: '"Departure Mono", "JetBrains Mono", "Helena Zhang", monospace'
                            }}
                        >
                            You could have been anywhere on the internet, yet you're here. Thanks for visiting!
                        </p>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-6">
                    Connect with me:
                    <a
                        href="https://github.com/roshanrajcmd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0"
                        aria-label="GitHub"
                    >
                        <div className={`rounded-md ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="GithubLogo" data-size="20px" data-weight="regular">
                            <FaGithubSquare className="size-8" />
                        </div>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/roshanraj1999/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0"
                        aria-label="LinkedIn"
                    >
                        <div className={`rounded-md ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                            <FaLinkedin className="size-8" />
                        </div>
                    </a>
                    <a
                        href="mailto:roshanraj5121999@gmail.com"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0"
                        aria-label="Email"
                    >
                        <div className={`rounded-md ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`}>
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

            <div className="fixed bottom-2 right-2 flex flex-col items-end">
                {/* The message bubble on top */}
                {isOpen && <ChatBox />}
                {/* The chibbi on bottom */}
                <button className="size-28 cursor-pointer"
                    onClick={toggleChat}
                    aria-label="Toggle Chat"
                >
                    {isOpen ? <MdOutlineCancel className="size-10" /> : <IoIosChatbubbles className="size-10" />}
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