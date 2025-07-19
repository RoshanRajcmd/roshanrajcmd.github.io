import React, { useState } from 'react';
import { PROJECTS } from './Constants';

// Utility to get a random contrasting color
function getRandomContrastColor() {
    const colors = ['#FFB300', '#FF7043', '#66BB6A', '#29B6F6', '#FFD600', '#FF4081', '#00838F', '#AB47BC'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const Work = ({ darkMode, playClickSound }) => {
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [tagBgColors, setTagBgColors] = useState({});

    const handleMouseEnter = (idx) => {
        setHoveredIdx(idx);
        setTagBgColors((prev) => ({
            ...prev,
            [idx]: getRandomContrastColor()
        }));
    };
    const handleMouseLeave = () => setHoveredIdx(null);

    const handleProjectClick = (item) => {
        if (playClickSound) playClickSound();
        if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="pt-16">
            <h2 className="justify-center text-center text-4xl font-bold mb-4">Work</h2>
            <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Projects</h2>
            {/* <div className="p-4">
                <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-neutral-500 text-sm font-normal leading-normal">Featured Project</p>
                            <p className="text-base font-bold leading-tight">E-commerce Platform</p>
                            <p className="text-neutral-500 text-sm font-normal leading-normal">A full-featured e-commerce platform built with React, Node.js, and a SQL database.</p>
                        </div>
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit bg-[#ededed] text-[#141414] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
                        >
                            <span className="truncate">View Project</span>
                        </button>
                    </div>
                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 flex items-center justify-center">
                        <img src={Project1} alt="E-commerce Platform" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-neutral-500 text-sm font-normal leading-normal">Featured Project</p>
                            <p className="text-base font-bold leading-tight">Mobile Task Manager</p>
                            <p className="text-neutral-500 text-sm font-normal leading-normal">A mobile application for managing tasks and projects, built with React Native.</p>
                        </div>
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit bg-[#ededed] text-[#141414] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
                        >
                            <span className="truncate">View Project</span>
                        </button>
                    </div>
                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 flex items-center justify-center">
                        <img src={Project2} alt="Mobile Task Manager" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
            </div> */}

            <div className="grid md:grid-cols-3 gap-6">
                {PROJECTS.map((item, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden shadow-md flex flex-col transition-transform duration-200 active:scale-95 hover:-translate-y-1 hover:scale-105 ${darkMode ? 'bg-[#ededed] text-[#141414]' : 'bg-[#141414] text-[#ededed]'} ${!item.url ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => handleProjectClick(item)}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={`w-full flex items-center justify-center aspect-video relative p-2 ${darkMode ? 'bg-[#ededed]' : 'bg-[#141414]'}`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover rounded-lg`}
                            />
                            <div className="absolute top-8 left-8">
                                <span
                                    className={`inline-block text-xs font-normal rounded-full px-3 py-1 transition-colors duration-300 ${darkMode ? 'text-[#141414]' : 'text-[#ededed]'}${hoveredIdx === idx ? ' shadow-lg' : ''}`}
                                    style={{ backgroundColor: hoveredIdx === idx ? tagBgColors[idx] : (darkMode ? '#ededed' : '#141414') }}
                                >
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                        <div className="px-4 pt-2 pb-6 flex flex-col gap-1 flex-1">
                            <p className="text-xl font-semibold ">{item.title}</p>
                            <p className={`text-sm  font-light ${darkMode ? 'text-[#141414]' : 'text-gray-500'}`}>{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Work;