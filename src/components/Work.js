import React, { useState } from 'react';
import { PROJECTS } from './Constants';
import { COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_TEXT, COLOR_LIGHT_GRAY, COLOR_MEDIUM_GRAY, COLOR_LIGHT_GRAY_TEXT } from './ColorConstants';

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

            <div className="grid md:grid-cols-3 gap-6">
                {PROJECTS.map((item, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_LIGHT_TEXT}]` : `bg-[${COLOR_DARK_BG}] text-[${COLOR_LIGHT_GRAY}]`} ${!item.url ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => handleProjectClick(item)}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={`w-full flex items-center justify-center aspect-video relative p-2 ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}]` : `bg-[${COLOR_DARK_BG}]`}`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover rounded-lg`}
                            />
                            <div className="absolute top-8 left-8">
                                <span
                                    className={`inline-block text-xs font-normal rounded-full px-3 py-1 transition-colors duration-300 ${darkMode ? `text-[${COLOR_LIGHT_TEXT}]` : `text-[${COLOR_LIGHT_GRAY}]`}${hoveredIdx === idx ? ' shadow-lg' : ''}`}
                                    style={{ backgroundColor: hoveredIdx === idx ? tagBgColors[idx] : (darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG) }}
                                >
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                        <div className="px-4 pt-2 pb-6 flex flex-col gap-1 flex-1">
                            <p className="text-xl pb-4 font-semibold ">{item.title}</p>
                            <div className='flex flex-wrap gap-1'>
                                {item.techStack.map((tech, idx) => (
                                    <p className={`text-xs px-2 py-0 rounded-full bg-none ${darkMode ? `text-[${COLOR_LIGHT_GRAY}] bg-[${COLOR_MEDIUM_GRAY}]` : `text-[${COLOR_LIGHT_TEXT}] bg-[${COLOR_LIGHT_GRAY_TEXT}]`}`}>
                                        {tech}
                                    </p>
                                ))}
                            </div>
                            <p className={`text-sm  font-light ${darkMode ? `text-[${COLOR_LIGHT_TEXT}]` : 'text-gray-500'}`}>{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Work;