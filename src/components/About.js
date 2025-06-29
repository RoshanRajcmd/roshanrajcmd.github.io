import ProfileImg from '../assets/Profile_1.png';
import React, { useState, useRef } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import doublePopup from '../assets/pop-up.mov';
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
            <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5 w-full">
                <div className="layout-content-container flex flex-col max-w-[960px] w-full flex-1">
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
                    <div className="flex justify-center items-center w-full px-2 sm:px-4 pb-3 pt-10">
                        <button
                            aria-label="Previous"
                            onClick={handlePrevAbout}
                            className="p-2 rounded-full hover:bg-[#ededed] hover:text-[#141414] transition-colors duration-200"
                        >
                            <FaChevronLeft size={22} />
                        </button>
                        <div
                            key={aboutIdx}
                            className={`mx-2 sm:mx-6 w-full max-w-4xl flex flex-col items-center transition-transform duration-500 ease-in-out ${direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'}`}
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
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-3 pt-10">Skills</h2>
                    <div className="flex gap-3 p-2 sm:p-3 flex-wrap pr-2 sm:pr-4">
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
                    {/* Experience Section (Responsive Timeline) */}
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pt-10">Experience</h2>
                    <div className={`flex flex-col gap-3 py-8 rounded-3xl ${darkMode ? 'bg-[#141414]' : 'bg-[#ffffff]'} w-full`}>
                        <div
                            className="rounded-full flex flex-col sm:flex-row w-full max-w-[360px] sm:max-w-[600px] bg-[#ededed] text-[#141414] p-4 gap-2 sm:gap-4 relative items-start sm:items-center mx-auto"
                        >
                            <div className="flex flex-col pl-2 w-auto whitespace-nowrap">
                                <span className="font-bold whitespace-nowrap">Quess Corp</span>
                                <span className="text-xs font-normal whitespace-nowrap">Software Engineer</span>
                                <span className="text-xs font-normal whitespace-nowrap">Client - Renault RNTBCI</span>
                            </div>
                            <span className="sm:absolute right-6 top-1/2 sm:-translate-y-1/2 text-xs font-semibold whitespace-nowrap mt-2 sm:mt-0">2024 - 2025</span>
                            <span className="ml-0 sm:ml-3 text-neutral-400 font-medium">8m</span>
                        </div>
                        <div className="rounded-full flex flex-col sm:flex-row w-full max-w-[360px] sm:max-w-[600px] bg-[#ededed] text-[#141414] p-4 gap-2 sm:gap-4 relative items-start sm:items-center mx-auto">
                            <div className="flex flex-col pl-2 w-auto whitespace-nowrap">
                                <span className="font-bold whitespace-nowrap">HCL Technologies</span>
                                <span className="text-xs font-normal whitespace-nowrap">Software Developer</span>
                                <span className="text-xs font-normal whitespace-nowrap">Client - Ford GTBC</span>
                            </div>
                            <span className="sm:absolute right-6 top-1/2 sm:-translate-y-1/2 text-xs font-semibold whitespace-nowrap mt-2 sm:mt-0">2020 - 2021</span>
                            <span className="ml-0 sm:ml-24 text-neutral-400 font-medium">2y 11m</span>
                        </div>
                    </div>
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-3 pt-10">Hear from others</h2>
                    <div className="flex flex-wrap gap-4 px-2 sm:px-4 pb-8 justify-center">
                        {TESTIMONIALS.map((testimonial, idx) => (
                            <div key={idx} className="bg-[#ededed] text-[#141414] rounded-xl p-5 shadow-md max-w-md flex-1 min-w-[220px]">
                                <FaQuoteLeft size={24} />
                                <p className="text-base italic mb-2">{testimonial.text}</p>
                                <p className="font-bold">— {testimonial.author}</p>
                                <p className="text-sm text-neutral-500">{testimonial.role} at {testimonial.company}</p>
                            </div>
                        ))}
                    </div>
                    {/* MyPics Stream Section */}
                    <div className="w-full py-12 flex flex-col items-center">
                        <div className="relative w-full max-w-5xl overflow-x-hidden">
                            {/* Auto-scroll on all devices */}
                            <div
                                className="flex flex-row flex-nowrap w-max sm:w-full gap-6 auto-marquee"
                                style={{
                                    animation: 'marquee 24s linear infinite',
                                    animationPlayState: 'running',
                                }}
                            >
                                {/* Duplicate images for seamless loop */}
                                {[1, 2].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src={require('../assets/myPics/myPic6.jpg')} alt="myPic6" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '1/1', width: '70vw', maxWidth: 320, minWidth: 160 }} />
                                        <img src={require('../assets/myPics/myPic1.jpg')} alt="myPic1" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '1/1', width: '90vw', maxWidth: 380, minWidth: 180 }} />
                                        <img src={require('../assets/myPics/myPic2.jpg')} alt="myPic2" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '4/3', width: '110vw', maxWidth: 440, minWidth: 200 }} />
                                        <img src={require('../assets/myPics/myPic3.jpeg')} alt="myPic3" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '3/4', width: '80vw', maxWidth: 320, minWidth: 160 }} />
                                        <img src={require('../assets/myPics/myPic4.jpeg')} alt="myPic4" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '16/9', width: '120vw', maxWidth: 480, minWidth: 220 }} />
                                        <img src={require('../assets/myPics/myPic5.jpeg')} alt="myPic5" className="rounded-lg object-cover mx-2" style={{ aspectRatio: '9/16', width: '70vw', maxWidth: 320, minWidth: 160 }} />
                                    </React.Fragment>
                                ))}
                            </div>
                            <style>{`
                                /* Removed media query so animation runs on all screens */
                                @keyframes marquee {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); }
                                }
                            `}</style>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
