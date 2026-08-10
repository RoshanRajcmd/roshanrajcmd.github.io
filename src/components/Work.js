import React, { useState } from 'react';
import { DEVELOPMENT, OTHERS, PROJECTS } from './Constants';
import { COLOR_DARK_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_GRAY, COLOR_MEDIUM_GRAY, COLOR_LIGHT_GRAY_TEXT } from './ColorConstants';

// Utility to get a random contrasting color
function getRandomContrastColor() {
    const colors = ['#FFB300', '#FF7043', '#66BB6A', '#29B6F6', '#FFD600', '#FF4081', '#00838F', '#AB47BC'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const Work = ({ darkMode, playClickSound }) => {
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [tagBgColors, setTagBgColors] = useState({});
    const [activeTab, setActiveTab] = useState(0);

    const workTabs = [{ label: DEVELOPMENT }, { label: OTHERS }];
    const visibleProjects = activeTab === 0
        ? PROJECTS.filter((item) => item.category === DEVELOPMENT)
        : PROJECTS.filter((item) => item.category === OTHERS);

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

    // Colours live in JS constants, so they are applied inline — Tailwind's
    // scanner cannot generate arbitrary values built from template literals.
    const cardStyle = {
        backgroundColor: darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
        color: darkMode ? COLOR_LIGHT_TEXT : COLOR_LIGHT_GRAY,
    };
    const techStyle = {
        backgroundColor: darkMode ? COLOR_MEDIUM_GRAY : COLOR_LIGHT_GRAY_TEXT,
        color: darkMode ? COLOR_LIGHT_GRAY : COLOR_LIGHT_TEXT,
    };

    return (
        <div className="pt-16">
            <h2 className="justify-center text-center text-4xl font-bold mb-4">Work</h2>
            <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Projects</h2>

            <div className="relative mx-auto flex w-full max-w-md rounded-full bg-gray-200 p-1 mb-6">
                <div
                    className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
                    style={{
                        width: `calc(100% / ${workTabs.length} - 0.25rem)`,
                        transform: `translateX(${activeTab * 100}%)`,
                    }}
                />

                {workTabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(index)}
                        className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors ${activeTab === index ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6">
                {visibleProjects.map((item, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${!item.url ? 'cursor-default' : 'cursor-pointer'}`}
                        style={cardStyle}
                        onClick={() => handleProjectClick(item)}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="w-full flex items-center justify-center aspect-video relative p-2"
                            style={{ backgroundColor: cardStyle.backgroundColor }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover rounded-lg`}
                            />
                            <div className="absolute top-8 left-8">
                                <span
                                    className={`inline-block text-xs font-normal rounded-full px-3 py-1 transition-colors duration-300${hoveredIdx === idx ? ' shadow-lg' : ''}`}
                                    style={{
                                        backgroundColor: hoveredIdx === idx ? tagBgColors[idx] : (darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG),
                                        color: darkMode ? COLOR_LIGHT_TEXT : COLOR_LIGHT_GRAY,
                                    }}
                                >
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                        <div className="px-4 pt-2 pb-6 flex flex-col gap-1 flex-1">
                            <p className="text-xl pb-4 font-semibold ">{item.title}</p>
                            <div className='flex flex-wrap gap-1'>
                                {item.techStack.map((tech) => (
                                    <p key={tech} className="text-xs px-2 py-0 rounded-full" style={techStyle}>
                                        {tech}
                                    </p>
                                ))}
                            </div>
                            {darkMode ? (
                                <p className="text-sm font-light" style={{ color: COLOR_LIGHT_TEXT }}>{item.subtitle}</p>
                            ) : (
                                <p className="text-sm font-light text-gray-500">{item.subtitle}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Work;