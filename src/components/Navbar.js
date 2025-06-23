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
    <nav className="fixed w-full top-2 sm:top-4 md:top-7 inset-x-0 z-50">
        <div
            id="navbar"
            className={`
                flex flex-wrap flex-row sm:flex-row items-center justify-between
                max-w-full sm:max-w-7xl mx-auto rounded-full bg-opacity-80 backdrop-blur shadow-lg 
                transition-all duration-300 py-2 bg-transparent
                ${scrolled ? 'md:px-24 lg:px-40' : 'sm:px-4'}
                min-w-0
            `}
        >
            {/* Download Resume */}
            <div className="flex flex-row items-center bg-transparent px-2 sm:px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] mb-2 sm:mb-0">
                <a className="flex items-center gap-2" href={resumeFile} download>
                    <IoMdDownload className="w-5 h-5" />
                    <span className="text-sm font-semibold">Resume</span>
                </a>
            </div>

            {/* Sections */}
            <div className="flex flex-wrap justify-center flex-1 gap-2 sm:gap-6 mb-2 sm:mb-0 min-w-0">
                {sections.map((sec) => (
                    <button
                        className="bg-transparent px-2 sm:px-4 py-2 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-base sm:text-xl"
                        key={sec}
                        onClick={() => scrollToSection(sec)}
                    >
                        {sec}
                    </button>
                ))}
            </div>

            <div className="flex flex-row space-x-2 sm:space-x-4 items-center">
                <button onClick={toggleMusic}>
                    {musicPlaying ? <FaVolumeUp className="w-5 h-5" /> : <FaVolumeMute className="w-5 h-5" />}
                </button>
                <button onClick={toggleTheme}>
                    {darkMode ? <IoIosSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
                </button>
            </div>
        </div>

        {/* Stitch Generated */}
        {/* <div class="flex items-center gap-4 text-[#141414]">
            <div class="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6_330)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                            fill="currentColor"
                        ></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_6_330"><rect width="48" height="48" fill="white"></rect></clipPath>
                    </defs>
                </svg>
            </div>
            <h2 class="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">Alex's Portfolio</h2>
        </div>
        <div class="flex flex-1 justify-end gap-8">
            <div class="flex items-center gap-9">
                <a class="text-[#141414] text-sm font-medium leading-normal" href="#">About</a>
                <a class="text-[#141414] text-sm font-medium leading-normal" href="#">Skills</a>
                <a class="text-[#141414] text-sm font-medium leading-normal" href="#">Projects</a>
                <a class="text-[#141414] text-sm font-medium leading-normal" href="#">Contact</a>
            </div>

            <div class="flex gap-2">
                <button
                    class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#ededed] text-[#141414] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                >
                    <div class="text-[#141414]" data-icon="GithubLogo" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                                d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"
                            ></path>
                        </svg>
                    </div>
                </button>
                <button
                    class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#ededed] text-[#141414] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                >
                    <div class="text-[#141414]" data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                                d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
                            ></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div> */}
    </nav>
);

export default Navbar;