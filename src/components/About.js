import ProfileImg from '../assets/Profile_1.png';
import React, { useState, useRef } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import doublePopup from '../assets/pop-up.mp3';
import { SKILLS, INITIAL_VISIBLE_SKILLS, TESTIMONIALS } from './Constants';

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
                    <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">A Jack of All Trades</h2>
                    <p className=" text-base font-normal leading-normal pb-3 pt-1 px-4">
                        I am a software developer with 3+ years of experience in building web and desktop applications. I specialize in full-stack development and have a strong understanding
                        of software engineering principles. My goal is to create impactful and user-friendly applications that solve real-world problems.
                    </p>
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
