import React, { useRef, useState } from 'react';
import { IoIosSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import chibbiGif from '../assets/chibbi.gif';
import musicFile from '../assets/background-music.mp3';
import resumeFile from '../assets/resume.pdf';

const sections = ['Work', 'About', 'Contact', 'FAQ'];


const Home = () => {
    const sectionRefs = useRef({});
    const [darkMode, setDarkMode] = useState(true);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [chibbiMessage, setChibbiMessage] = useState('');

    const audioRef = useRef(null);

    const scrollToSection = (section) => {
        const element = sectionRefs.current[section];
        if (element) {
            //Top of the <body> relative to the viewport
            const bodyRect = document.body.getBoundingClientRect().top;
            //Top of the target section relative to the viewport
            const elementRect = element.getBoundingClientRect().top;
            //80 is the offset height of navbar or custom offset
            const offsetPosition = elementRect - bodyRect - 80;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const toggleTheme = () => {
        if (!darkMode)
            setChibbiMessage('Bravo six going dark🔦');
        else
            setChibbiMessage("...")
        setDarkMode((prev) => !prev);
        setTimeout(() => setChibbiMessage(''), 2000);
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
        <div className={darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}>
            <nav className="fixed w-full top-7 inset-x-0 z-50">
                <div
                    id="navbar"
                    className={`flex flex-row flex-wrap items-center justify-between max-w-7xl mx-auto rounded-full bg-opacity-80 backdrop-blur transition-all duration-300 py-2 bg-transparent
                        ${scrolled ? 'px-24' : 'px-4'}
                    `}
                >
                    {/* Download Resume */}
                    <div className="flex flex-row flex-wrap bg-transparent px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)]">
                        <a className="flex items-center gap-2" href={resumeFile} download>
                            <IoMdDownload className="w-5 h-5" />
                            <button className="text-sm font-semibold">Resume</button>
                        </a>
                    </div>

                    {/* Sections */}
                    <div className="flex flex-row flex-wrap content-center justify-center flex-1">
                        {sections.map((sec) => (
                            <button
                                className="bg-transparent px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)]"
                                key={sec}
                                onClick={() => scrollToSection(sec)}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-row space-x-4 items-center">
                        <button onClick={toggleMusic}>
                            {musicPlaying ? <FaVolumeUp className="w-5 h-5" /> : <FaVolumeMute className="w-5 h-5" />}
                        </button>
                        <button onClick={toggleTheme}>
                            {darkMode ? <IoIosSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

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

            <div className="fixed bottom-5 right-5 flex flex-col items-end">
                {/* The message box on top */}
                {chibbiMessage && (
                    <div className="bg-gray-200 text-black px-4 py-2 rounded-md mb-1 max-w-xs text-sm shadow-lg">
                        <p>{chibbiMessage}</p>
                    </div>
                )}
                {/* The chibbi on bottom */}
                <img src={chibbiGif} alt="Chibbi" className="size-28" />
            </div>
        </div >
    );
};

export default Home;