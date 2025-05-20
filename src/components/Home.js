import React, { useRef, useState } from 'react';
import musicFile from '../assets/background-music.mp3';
import Navbar from './Navbar';

const sections = ['Work', 'About', 'Contact', 'FAQ'];


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

            <main className="pt-24 space-y-20 px-8">
                {sections.map((sec) => (
                    <section
                        key={sec}
                        ref={(el) => (sectionRefs.current[sec] = el)}
                        className="min-h-screen"
                    >
                        <h2 className="text-4xl font-bold mb-4">{sec}</h2>
                        <p>Content for {sec} section goes here...</p>
                    </section>
                ))
                }
            </main >

            <footer className="p-8 text-center">
                <p>
                    Connect with me:
                    <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer" className="ml-2 text-blue-500">GitHub</a>
                    <span>,</span>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="ml-2 text-blue-500">LinkedIn</a>
                </p>
            </footer>

            <div className="fixed bottom-5 right-1 flex flex-col items-end">
                {/* The message bubble on top */}
                {isOpen && (
                    <div className="w-72 h-96 bg-wite border border-gray-300 rounded-lg mb-2 shadow-lg flex flex-col">
                        <div className="bg bg-blue-600 text-white p-3 font-semibold rounded-t-lg"
                            style={{ borderBottomRightRadius: 0 }}>
                            Chat
                        </div>
                        <div className="flex-1 p-3 overflow-y-auto">
                            <p>Hello! How can I help you?</p>
                        </div>
                    </div>
                )}
                {/* The chibbi on bottom */}
                <button className="size-28 cursor-pointer"
                    onClick={toggleChat}
                    aria-label="Toggle Chat"
                >
                    {isOpen ? 'Ⓧ' : '💬'}
                </button>
            </div>
        </div >
    );
};

export default Home;