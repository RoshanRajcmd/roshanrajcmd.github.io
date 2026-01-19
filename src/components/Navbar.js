import React, { useState, useEffect } from "react";
import { HiMenuAlt2, HiX, HiOutlineDocumentDownload } from "react-icons/hi";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import resumeFile from "../assets/resume.pdf";
import Contacts from "./Contacts";
import {
    COLOR_NEON_GREEN,
    COLOR_DARK_TEXT,
    COLOR_LIGHT_TEXT,
} from "./ColorConstants";

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
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Lock background scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    return (
        <>
            {isMobile ? (
                <nav className="fixed top-4 right-4 z-50">
                    <button
                        onClick={() => setOpen(true)}
                        className={`p-2 rounded-lg backdrop-blur-sm shadow-lg transition-colors ${darkMode
                            ? `text-[${COLOR_DARK_TEXT}]`
                            : `text-[${COLOR_LIGHT_TEXT}]`
                            }`}
                    >
                        <HiMenuAlt2 className="w-9 h-9" />
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
                            {sections.map((sec, i) => (
                                <button
                                    key={sec}
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                    onClick={() => {
                                        scrollToSection(sec);
                                        setOpen(false);
                                    }}
                                    className={`
                    relative block mx-auto
                    transition-all duration-500
                    ${open
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-6"
                                        }
                    text-[clamp(2.2rem,6vw,4rem)]
                    font-extrabold uppercase tracking-tight
                  `}
                                >
                                    {activeSection === sec && (
                                        <span
                                            className={`absolute inset-x-0 top-1/2 h-[3px] bg-[${COLOR_NEON_GREEN}]`}
                                        />
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
                <nav className="fixed inset-x-0 top-4 z-50 flex justify-center">
                    <div
                        className={`flex items-center justify-between w-full backdrop-blur-sm shadow-lg rounded-full px-6 py-4 transition-all duration-300 ${scrolled ? "max-w-5xl" : "max-w-7xl"
                            }`}
                    >
                        <a
                            href={resumeFile}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-[${COLOR_NEON_GREEN}] text-[${COLOR_LIGHT_TEXT}]`}
                        >
                            <HiOutlineDocumentDownload className="w-5 h-5" />
                            <span className="text-sm font-semibold">Resume</span>
                        </a>

                        <div className="flex items-center gap-4">
                            {sections.map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => scrollToSection(sec)}
                                    className="px-4 font-bold uppercase relative"
                                >
                                    {activeSection === sec && (
                                        <span
                                            className={`absolute inset-x-0 top-1/2 h-[3px] bg-[${COLOR_NEON_GREEN}]`}
                                        />
                                    )}
                                    <span className="relative">{sec}</span>
                                </button>
                            ))}
                        </div>

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
