import React, { useRef, useState } from 'react';
import musicFile from '../assets/background-music.mp3';
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
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

    const audioRef = useRef(null);

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
        <div className={darkMode ? 'dark bg-gray-800 text-white' : 'bg-white text-gray-800'}>
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
                {sections.map((sec) => {
                    const SectionComponent = sectionComponents[sec];
                    return (
                        <section
                            key={sec}
                            ref={(el) => (sectionRefs.current[sec] = el)}
                            className="flex flex-col"
                        >
                            <SectionComponent />
                        </section>
                    );
                })}
            </main >

            <footer className="p-8 text-center">
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                    Connect with me:
                    <a
                        href="https://github.com/roshanrajcmd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#ededed] text-[#141414] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                        aria-label="GitHub"
                    >
                        <div className="text-[#141414]" data-icon="GithubLogo" data-size="20px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"
                                ></path>
                            </svg>
                        </div>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/roshanraj1999/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#ededed] text-[#141414] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                        aria-label="LinkedIn"
                    >
                        <div className="text-[#141414]" data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
                                ></path>
                            </svg>
                        </div>
                    </a>
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

export default Home;