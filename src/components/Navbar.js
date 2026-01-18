import React, { useState, useEffect } from "react";
import { HiMenuAlt2, HiX, HiOutlineDocumentDownload } from "react-icons/hi";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import resumeFile from "../assets/resume.pdf";
import Constacts from "./Contacts";

const Navbar = ({
    darkMode,
    scrolled,
    toggleTheme,
    sections,
    scrollToSection,
    soundOn,
    setSoundOn,
    activeSection
}) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent background scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    return (
        <>
            {isMobile ? (
                <nav className="fixed top-4 right-4 z-50">
                    <button
                        onClick={() => setOpen(true)}
                        className={`p-2 rounded-lg shadow-lg backdrop-blur-sm transition-all ${darkMode ? "bg-[#141414] text-white" : "bg-white text-black"
                            }`}
                    >
                        <HiMenuAlt2 className="w-10 h-10" />
                    </button>

                    {/* FULLSCREEN MENU */}
                    {open && (
                        <div
                            className={`fixed inset-0 z-50 flex flex-col ${darkMode ? "bg-[#141414] text-white" : "bg-white text-black"
                                }`}
                        >
                            {/* HEADER */}
                            <div className="flex justify-between items-center px-8 pt-6">
                                <div className="text-2xl leading-tight">
                                    <div className="font-name1 font-bold">ROSHAN</div>
                                    <div className="font-name2 font-black">RAJ</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button onClick={() => setSoundOn((p) => !p)}>
                                        {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
                                    </button>
                                    <button onClick={toggleTheme}>
                                        {darkMode ? <IoIosSunny /> : <IoMdMoon />}
                                    </button>
                                    <button onClick={() => setOpen(false)}>
                                        <HiX className="w-7 h-7" />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="w-full text-center mt-auto">
                                {sections.map((sec) => (
                                    <button
                                        key={sec}
                                        onClick={() => {
                                            scrollToSection(sec);
                                            setOpen(false);
                                        }}
                                        className="relative block mx-auto text-[clamp(2.2rem,6vw,4rem)] font-extrabold uppercase tracking-tight"
                                    >
                                        {activeSection === sec && (
                                            <span className="absolute inset-x-0 top-1/2 h-[3px] bg-[#00ff22]" />
                                        )}
                                        <span
                                            className={`relative ${activeSection === sec
                                                ? "opacity-60"
                                                : "hover:opacity-70"
                                                }`}
                                        >
                                            {sec}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Resume */}
                            <div className="flex justify-center mt-auto">
                                <a
                                    href={resumeFile}
                                    className="flex items-center gap-2 bg-[#00ff22] text-black font-bold text-sm px-5 py-2 rounded-lg"
                                >
                                    <HiOutlineDocumentDownload className="w-5 h-5" />
                                    Resume
                                </a>
                            </div>

                            {/* FOOTER */}
                            <div className="text-xs text-center mt-auto mb-6">
                                <div>BUSINESS ENQUIRIES</div>
                                <Constacts darkMode={darkMode} playClickSound />
                            </div>
                        </div>
                    )}
                </nav>
            ) : (
                /* DESKTOP NAV (UNCHANGED LOGIC, CLEANED) */
                <nav className="fixed inset-x-0 top-2 sm:top-4 md:top-7 z-50 flex justify-center">
                    <div
                        className={`flex items-center justify-between w-full rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 px-4 py-2 ${scrolled
                            ? "max-w-4xl lg:max-w-5xl"
                            : "max-w-7xl"
                            }`}
                    >
                        {/* Resume */}
                        <a
                            href={resumeFile}
                            download
                            className="flex items-center gap-2 px-4 py-2 rounded-full hover:shadow-lg transition"
                        >
                            <IoMdDownload />
                            <span className="text-sm font-semibold">Resume</span>
                        </a>

                        {/* Sections */}
                        <div className="flex gap-4">
                            {sections.map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => scrollToSection(sec)}
                                    className="bg-transparent px-2 sm:px-4 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-base sm:text-xl"
                                >
                                    {sec}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSoundOn((p) => !p)}>
                                {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
                            </button>
                            <button onClick={toggleTheme}>
                                {darkMode ? <IoIosSunny /> : <IoMdMoon />}
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Navbar;
