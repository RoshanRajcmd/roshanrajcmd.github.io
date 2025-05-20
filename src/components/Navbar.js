import React from 'react';
import { IoMdDownload } from "react-icons/io";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import resumeFile from '../assets/resume.pdf';

const Navbar = ({
    darkMode,
    scrolled,
    musicPlaying,
    toggleMusic,
    toggleTheme,
    sections,
    scrollToSection,
}) => (
    <nav className="fixed w-full top-7 inset-x-0 z-50">
        <div
            id="navbar"
            className={`flex flex-row flex-wrap items-center justify-between max-w-7xl mx-auto rounded-full bg-opacity-80 backdrop-blur transition-all duration-300 py-2 bg-transparent
                ${scrolled ? 'px-40' : 'px-4'}
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
            <div className="flex flex-row flex-wrap content-center justify-center flex-1 gap-6">
                {sections.map((sec) => (
                    <button
                        className="bg-transparent px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-xl"
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
);

export default Navbar;