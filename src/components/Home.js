import React, { useRef, useState } from 'react';
import { IoIosSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import clippyGif from '../assets/clippy.gif';
import musicFile from '../assets/background-music.mp3';
import resumeFile from '../assets/resume.pdf';

const sections = ['Work', 'About', 'Contact', 'FAQ'];

const Home = () => {
    const sectionRefs = useRef({});
    const [darkMode, setDarkMode] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [clippyMessage, setClippyMessage] = useState('');

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
        setDarkMode((prev) => !prev);
        setClippyMessage('You just toggled the theme! Stylish choice ✨');
        setTimeout(() => setClippyMessage(''), 4000);
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

    return (
        <div className={darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}>
            <nav className="fixed w-full top-0 z-50 bg-opacity-80 backdrop-blur p-4 flex justify-between items-center">
                <div className="space-x-4">
                    <a href={resumeFile} download>
                        <button>Download Resume</button>
                    </a>
                </div>
                <div className="space-x-4">
                    {sections.map((sec) => (
                        <button key={sec} onClick={() => scrollToSection(sec)}>{sec}</button>
                    ))}
                </div>
                <div className="space-x-4 items-center">
                    <button onClick={toggleMusic}>
                        {musicPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
                    </button>
                    <button onClick={toggleTheme}>
                        {darkMode ? <IoIosSunny /> : <IoMdMoon />}
                    </button>
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
                ))}
            </main>

            <footer className="p-8 text-center">
                <p>
                    Connect with me:
                    <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer" className="ml-2 text-blue-500">GitHub</a>
                    <span>,</span>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="ml-2 text-blue-500">LinkedIn</a>
                </p>
            </footer>

            <div className="fixed bottom-4 right-4 flex items-end space-x-2">
                <img src={clippyGif} alt="Clippy" className="w-24 h-24" />
                {clippyMessage && (
                    <div className="bg-gray-200 text-black p-2 rounded shadow max-w-xs">
                        {clippyMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
