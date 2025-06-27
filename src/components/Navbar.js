import React, { useRef, useState } from 'react';
import { IoMdDownload } from "react-icons/io";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import resumeFile from '../assets/resume.pdf';
import muteMusic from '../assets/drop_click.mp3';

const Navbar = ({
    darkMode,
    scrolled,
    sections,
    scrollToSection,
    blogLink,
}) => {

    const soundRef = useRef(null);
    const [soundOn, setSoundOn] = useState(false);
    const playSoundEffect = () => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play();
        }
        setSoundOn((prev) => !prev);
    };
    return (
        <nav className="fixed w-full top-2 sm:top-4 md:top-7 inset-x-0 z-50 flex justify-center">
            <audio ref={soundRef} src={muteMusic} preload="auto" />
            <div
                id="navbar"
                className={`
                    flex flex-row items-center justify-between w-full
                    mx-auto rounded-full bg-opacity-80 backdrop-blur shadow-lg 
                    transition-all duration-300 py-2 bg-transparent
                    min-w-0
                    ${scrolled ? 'max-w-3xl md:max-w-4xl lg:max-w-5xl md:px-24 lg:px-40' : 'max-w-full sm:max-w-7xl sm:px-4'}
                `}
            >
                {/* Download Resume */}
                <div className="flex flex-row items-center bg-transparent px-2 sm:px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] mb-2 sm:mb-0">
                    <a className="flex items-center gap-2" href={resumeFile} download>
                        <IoMdDownload className="w-5 h-5" />
                        <span className="text-sm font-semibold">Resume</span>
                    </a>
                </div>

                {/* Sections*/}
                <div className="flex flex-1 flex-wrap justify-center items-center gap-2 sm:gap-6 mb-2 sm:mb-0 min-w-0">
                    {sections.map((sec) => (
                        <button
                            className="bg-transparent px-2 sm:px-4 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-base sm:text-xl"
                            key={sec}
                            onClick={() => scrollToSection(sec)}
                        >
                            {sec}
                        </button>
                    ))}
                    {/* Blog section - will be implemented later once i wrote some posts */}
                    {/* <a
                        href={blogLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent px-2 sm:px-4 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-base sm:text-xl"
                    >
                        Blog
                    </a> */}
                </div>

                <div className="flex flex-row space-x-2 sm:space-x-4 items-center">
                    <button onClick={playSoundEffect}>
                        {soundOn ? <FaVolumeUp className="w-5 h-5" /> : <FaVolumeMute className="w-5 h-5" />}
                    </button>
                    <button onClick={playSoundEffect}>
                        {darkMode ? <IoIosSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;