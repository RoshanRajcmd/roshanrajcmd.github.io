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
    const marqueeRef = useRef(null);
    const containerRef = useRef(null);
    const [marqueeDuration, setMarqueeDuration] = useState(24); // fallback default
    const [aboutIdx, setAboutIdx] = useState(0);
    const [direction, setDirection] = useState('right'); // for animation
    const experienceStartDate = "2021-09-07"; // yyyy-mm-dd
    const { years, months } = getYearsAndMonthsSince(experienceStartDate);

    const handleShowMore = () => {
        if (soundOn && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        setShowMore((prev) => !prev);
    };

    // About Me cards for carousel
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

    // For consistent marquee speed

    function getYearsAndMonthsSince(dateString) {
        const startDate = new Date(dateString);
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();

        // Adjust if current month is earlier than start month
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months };
    }


    React.useEffect(() => {
        function updateDuration() {
            if (marqueeRef.current && containerRef.current) {
                const marqueeWidth = marqueeRef.current.scrollWidth;
                const containerWidth = containerRef.current.offsetWidth;
                // Set speed: e.g., 100px/sec
                const speed = 100; // px per second
                const distance = marqueeWidth / 2; // since translateX(-50%)
                const duration = distance / speed;
                setMarqueeDuration(duration);
            }
        }
        updateDuration();
        window.addEventListener('resize', updateDuration);
        return () => window.removeEventListener('resize', updateDuration);
    }, []);

    return (
        <div>
            <audio ref={audioRef} src={doublePopup} preload="auto" />
            <h2 className="justify-center text-center text-4xl font-bold mb-4">About Me</h2>
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
                    <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-3 pt-10">Skills</h2>
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
                    <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pt-10">Experience</h2>
                    <h3 className="text-center text-[18px] font-medium text-neutral-500 leading-normal tracking-[-0.015em] px-2 sm:px-4 pt-2">{years} year{years !== 1 ? "s" : ""} and {months} month{months !== 1 ? "s" : ""}</h3>
                    <div className="w-full flex flex-col items-center pb-4">
                        <div className="overflow-x-auto w-full whitespace-nowrap py-4">
                            <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-stretch gap-8 sm:gap-0">
                                {/* Timeline vertical line */}
                                <div className="hidden sm:block absolute left-1/2 right-1/2 top-1.5 h-1 w-full bg-[#ededed] -translate-x-1/2 z-0" aria-hidden="true"></div>
                                {/* Timeline vertical line for mobile */}
                                <div className="block sm:hidden absolute left-1.5 top-0 h-full w-1 bg-[#ededed] z-0" aria-hidden="true"></div>
                                {/* Experience Items */}
                                <div className="relative z-10 w-full flex flex-col sm:flex-row items-center sm:justify-between gap-8">
                                    {EXPERIENCES.map((experience, idx) => (
                                        <div className="flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-1/2">

                                            {/* Dot */}
                                            <div className="relative w-4 h-4 flex items-center justify-center">
                                                {/* Outer static green circle for current experience */}
                                                {experience.current && (
                                                    <span className={"absolute inline-flex h-full w-full rounded-full bg-green-500"}></span>
                                                )}
                                                {/* Live green dot */}
                                                <span
                                                    className={`absolute inline-flex  rounded-full ${experience.current
                                                        ? "h-5 w-5 bg-green-400 opacity-75 animate-ping"
                                                        : "h-full w-full bg-[#ededed]"
                                                        }`}
                                                ></span>
                                                {/* Inner solid circle */}
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#141414]"></span>
                                            </div>

                                            {/* Experience Card */}
                                            <div className="rounded-2xl bg-[#ededed] text-[#141414] p-4 flex flex-col min-w-[180px] max-w-xs w-full">
                                                <span className="font-bold">{experience.compName}</span>
                                                <span className="text-xs font-normal">{experience.role}</span>
                                                {typeof experience.clientCompName === 'string' && experience.clientCompName.trim() !== '' && (
                                                    <span className="text-xs font-normal">{experience.clientCompName}</span>
                                                )}
                                                <div className="flex flex-row justify-between items-center mt-2">
                                                    <span className="text-xs font-semibold">{experience.timePeriod}</span>
                                                    <span className="text-neutral-400 font-medium ml-2">{experience.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-5 pt-10">Hear from others</h2>
                    <div className="flex flex-wrap gap-4 px-2 sm:px-4 pb-8 justify-center">
                        {TESTIMONIALS.map((testimonial, idx) => (
                            <div key={idx} className="bg-[#ededed] text-[#141414] rounded-xl p-5 max-w-md flex-1 min-w-[220px]">
                                <FaQuoteLeft size={24} />
                                <p className="text-base italic mb-2">{testimonial.text}</p>
                                <p className="font-bold">— {testimonial.author}</p>
                                <p className="text-sm text-neutral-500">{testimonial.role} at {testimonial.company}</p>
                            </div>
                        ))}
                    </div>
                    {/* MyPics Stream Section */}
                    <div className="w-full py-12 flex flex-col items-center">
                        <div className="relative w-full max-w-5xl overflow-x-hidden" ref={containerRef}>
                            {/* Auto-scroll on all devices */}
                            <div
                                className="flex flex-row flex-nowrap w-max sm:w-full gap-6 auto-marquee"
                                ref={marqueeRef}
                                style={{
                                    animation: `marquee ${marqueeDuration}s linear infinite`,
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
                                @keyframes marquee {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); }
                                }
                            `}</style>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default About;
