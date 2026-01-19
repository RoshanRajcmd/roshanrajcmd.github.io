import React, { useState, useEffect } from "react";
import { HiMenuAlt2, HiX, HiOutlineDocumentDownload } from "react-icons/hi";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import resumeFile from "../assets/resume.pdf";
import Contacts from "./Contacts";
import { BLOG_URL } from "./Constants";
import { COLOR_NEON_GREEN, COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_TEXT } from "./ColorConstants";

const Navbar = ({
    darkMode,
    scrolled,
    toggleTheme,
    sections,
    scrollToSection,
    soundOn,
    setSoundOn,
    activeSection,
    playClickSound
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
                        className={`p-2 rounded-lg shadow-lg backdrop-blur-sm transition-all ${darkMode ? `text-[${COLOR_DARK_TEXT}]` : `text-[${COLOR_LIGHT_TEXT}]`
                            }`}
                    >
                        <HiMenuAlt2 className="w-10 h-10" />
                    </button>

                    {/* FULLSCREEN MENU */}
                    <div
                        className={`
              fixed inset-0 z-40 flex flex-col
              transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]
              ${open
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 scale-95 -translate-y-6 pointer-events-none"
                            }
              ${darkMode
                                ? `bg-[${COLOR_LIGHT_TEXT}] text-[${COLOR_DARK_TEXT}]`
                                : `bg-[${COLOR_DARK_TEXT}] text-[${COLOR_LIGHT_TEXT}]`
                            }
            `}
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
                                        <span className={`absolute inset-x-0 top-1/2 h-[3px] bg-[${COLOR_NEON_GREEN}]`} />
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
                                className={`flex items-center gap-2 bg-[${COLOR_NEON_GREEN}] text-[${COLOR_LIGHT_TEXT}] font-bold text-sm px-5 py-2 rounded-lg`}
                            >
                                <HiOutlineDocumentDownload className="w-5 h-5" />
                                Resume
                            </a>
                        </div>

                        {/* FOOTER */}
                        <div className="text-xs text-center mt-auto mb-6">
                            <div>BUSINESS ENQUIRIES</div>
                            <Contacts darkMode={darkMode} playClickSound={playClickSound} />
                        </div>
                    </div>
                </nav>
            ) : (
                /* DESKTOP NAV (UNCHANGED LOGIC, CLEANED) */
                <nav className="fixed inset-x-0 top-2 sm:top-4 md:top-7 z-50 flex justify-center items-center">
                    <div
                        className={`flex items-center justify-between w-full rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 px-4 py-4 ${scrolled
                            ? "max-w-4xl lg:max-w-5xl"
                            : "max-w-7xl"
                            }`}
                    >
                        {/* Resume */}
                        <a
                            href={resumeFile}
                            download
                            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-[${COLOR_NEON_GREEN}] text-[${COLOR_LIGHT_TEXT}] hover:shadow-lg`}
                        >
                            <HiOutlineDocumentDownload className="w-5 h-5" />
                            <span className="text-sm font-semibold">Resume</span>
                        </a>

                        {/* Sections */}
                        <div className="flex gap-4 items-center">
                            {sections.map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => scrollToSection(sec)}
                                    className="bg-transparent px-4 rounded-full transition-shadow duration-300
                                            sm:text-xl block mx-auto
                                            text-[clamp(2.2rem,6vw,4rem)] font-extrabold uppercase tracking-tight"
                                >
                                    <span className="relative inline-block">
                                        {activeSection === sec && (
                                            <span className={`absolute left-0 right-0 top-1/2 h-[3px] bg-[${COLOR_NEON_GREEN}]`} />
                                        )}

                                        <span
                                            className={`relative ${activeSection === sec ? "opacity-60" : "hover:opacity-70"
                                                }`}
                                        >
                                            {sec}
                                        </span>
                                    </span>
                                </button>
                            ))}

                            {/* Blog section - will be enabled in future*/}
                            {/* <a
                                href={BLOG_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-transparent px-2 sm:px-4 rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(230,190,10,0.8)] text-base sm:text-xl"
                            >
                                Blog
                            </a> */}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4 px-9 py-2 ">
                            <button onClick={() => setSoundOn((p) => !p)}>
                                {soundOn ? <FaVolumeUp className="w-5 h-5" /> : <FaVolumeMute className="w-5 h-5" />}
                            </button>
                            <button onClick={toggleTheme}>
                                {darkMode ? <IoIosSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Navbar;