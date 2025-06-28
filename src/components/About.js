import ProfileImg from '../assets/Profile_1.png';
import React, { useState, useRef } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import doublePopup from '../assets/pop-up.mp3';
import { SKILLS, INITIAL_VISIBLE_SKILLS, TESTIMONIALS, ABOUT_CARDS, EXPERIENCES } from './Constants';

const About = ({ soundOn, darkMode }) => {
    const [showMore, setShowMore] = useState(false);
    const audioRef = useRef(null);
    const visibleSkills = showMore ? SKILLS : SKILLS.slice(0, INITIAL_VISIBLE_SKILLS);

    const handleShowMore = () => {
        if (soundOn && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        setShowMore((prev) => !prev);
    };

    // About Me cards for carousel
    const [aboutIdx, setAboutIdx] = useState(0);
    const [direction, setDirection] = useState('right'); // for animation
    const handlePrevAbout = () => {
        setDirection('left');
        setAboutIdx((prev) => (prev === 0 ? ABOUT_CARDS.length - 1 : prev - 1));
    };
    const handleNextAbout = () => {
        setDirection('right');
        setAboutIdx((prev) => (prev === ABOUT_CARDS.length - 1 ? 0 : prev + 1));
    };

    // Add slide-in animations for About Me card carousel
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes slide-right {
      0% { opacity: 0; transform: translateX(60px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-left {
      0% { opacity: 0; transform: translateX(-60px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-right {
      animation: slide-right 0.5s;
    }
    .animate-slide-left {
      animation: slide-left 0.5s;
    }
    `;
    if (!document.head.querySelector('style[data-about-carousel]')) {
        style.setAttribute('data-about-carousel', '');
        document.head.appendChild(style);
    }

    return (
        <div>
            <audio ref={audioRef} src={doublePopup} preload="auto" />
            <h2 className="justify-center text-4xl font-bold mb-4">About Me</h2>
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex p-4 @container">
                        <div className="flex w-full flex-col gap-4 items-center">
                            <div className="flex gap-4 flex-col items-center">
                                <img
                                    src={ProfileImg}
                                    alt="Profile"
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <p className=" text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Roshan Raj</p>
                                    <p className="text-neutral-500 text-base font-normal leading-normal text-center">Software Developement Engineer</p>
                                    <p className="text-neutral-500 text-base font-normal leading-normal text-center">Passionate software developer with a focus on creating innovative solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* About Me Card Carousel */}
                    <div className="flex justify-center items-center w-full px-4 pb-3 pt-10">
                        <button
                            aria-label="Previous"
                            onClick={handlePrevAbout}
                            className="p-2 rounded-full hover:bg-[#ededed] hover:text-[#141414] transition-colors duration-200"
                        >
                            <FaChevronLeft size={22} />
                        </button>
                        <div
                            key={aboutIdx}
                            className={`mx-6 w-full max-w-4xl flex flex-col items-center transition-transform duration-500 ease-in-out ${direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'}`}
                            style={{ minHeight: 140 }}
                        >
                            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{ABOUT_CARDS[aboutIdx].title}</h2>
                            <p className="text-base font-normal leading-normal text-center">{ABOUT_CARDS[aboutIdx].description}</p>
                        </div>
                        <button
                            aria-label="Next"
                            onClick={handleNextAbout}
                            className="p-2 rounded-full hover:bg-[#ededed] hover:text-[#141414] transition-colors duration-200"
                        >
                            <FaChevronRight size={22} />
                        </button>
                    </div>
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">Skills</h2>
                    <div className="flex gap-3 p-3 flex-wrap pr-4">
                        {visibleSkills.map((skill, idx) => (
                            <div key={skill} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                                <p className="text-sm font-medium leading-normal">{skill}</p>
                            </div>
                        ))}
                        {SKILLS.length > INITIAL_VISIBLE_SKILLS && (
                            <button
                                type="button"
                                className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414] cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
                                onClick={handleShowMore}
                            >
                                <p className="text-sm font-bold leading-normal flex items-center gap-1 ">
                                    {showMore ? (
                                        <>
                                            Show less <MdExpandLess />
                                        </>
                                    ) : (
                                        <>
                                            And more... <MdExpandMore />
                                        </>
                                    )}
                                </p>
                            </button>
                        )}
                    </div>
                    {/* Experience Section (Gantt Chart, stacked lines) */}
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">Experience</h2>
                    <div className={`py-16 px-4 rounded-3xl ${darkMode ? 'bg-[#141414]' : 'bg-[#ffffff]'}`} >
                        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
                            {EXPERIENCES.map((exp, idx) => {
                                // Each segment starts where the previous ends
                                // Calculate left offset based on cumulative periods of previous experiences
                                const prevPeriods = EXPERIENCES.slice(0, idx).reduce((acc, e) => acc + (e.periods || 0), 0);
                                const width = `${exp.periods * 120}px`;
                                const left = `${prevPeriods * 120}px`;
                                return (
                                    <div key={idx} className="relative h-fit pb-8 w-full flex items-center">
                                        <div
                                            className="absolute bg-[#ededed] text-[#141414] h-8 rounded-full flex items-center justify-between font-bold p-6 w-auto whitespace-nowrap gap-4"
                                            style={{
                                                minWidth: 'fit-content',
                                                left,
                                                transition: 'left 0.5s, width 0.5s',
                                            }}
                                        >
                                            <div className="flex flex-col w-auto whitespace-nowrap">
                                                <span className="whitespace-nowrap">{exp.company}</span>
                                                <span className="text-xs font-semibold whitespace-nowrap">{exp.role}</span>
                                            </div>
                                            <span className="ml-4 text-xs font-semibold whitespace-nowrap">{exp.duration}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Testimonial Section */}
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">Hear from others</h2>
                    <div className="flex flex-wrap gap-4 px-4 pb-8">
                        {TESTIMONIALS.map((testimonial, idx) => (
                            <div key={idx} className="bg-[#ededed] text-[#141414] rounded-xl p-5 shadow-md max-w-md flex-1 min-w-[260px]">
                                <FaQuoteLeft size={24} />
                                <p className="text-base italic mb-2">{testimonial.text}</p>
                                <p className="font-bold">— {testimonial.author}</p>
                                <p className="text-sm text-neutral-500">{testimonial.role} at {testimonial.company}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;
