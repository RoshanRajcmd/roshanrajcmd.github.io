import React, { useState } from 'react';
import Project1 from '../assets/Project1.png';
import Project2 from '../assets/Project2.png';
import Project3 from '../assets/Project3.png';
import Project4 from '../assets/Project4.png';
import Project5 from '../assets/Project5.png';

// Utility to get a random contrasting color
function getRandomContrastColor() {
    const colors = ['#FFB300', '#FF7043', '#66BB6A', '#29B6F6', '#FFD600', '#FF4081', '#C62828', '#00838F', '#AB47BC'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const Work = ({ darkMode }) => {
    const projects = [
        {
            tag: "Fashion",
            title: "Book Reading Web App",
            subtitle:
                "A web application that allows users to track and manage their book readings.",
            image: Project4,
            url: "https://github.com/RoshanRajcmd/myreads-web-app",
        },
        {
            tag: "Desktop",
            title: "Custom Web Browser for Desktop",
            subtitle:
                "A custom web browser built with Python and PyQt, featuring a sleek design and essential functionalities.",
            image: Project5,
            url: "https://github.com/RoshanRajcmd/py-browser",
        },
        {
            tag: "Lifestyle",
            title: "E-commerce Platform",
            subtitle: "A full-featured e-commerce platform built with React, Node.js, and a SQL database.",
            image: Project3,
            url: "https://github.com/RoshanRajcmd/ecom-web-app",
        },
        {
            tag: "Fashion",
            title: "Book Reading Web App",
            subtitle:
                "A web application that allows users to track and manage their book readings.",
            image: Project4,
            url: "https://github.com/RoshanRajcmd/myreads-web-app",
        },
        {
            tag: "Lifestyle",
            title: "E-commerce Platform",
            subtitle: "A full-featured e-commerce platform built with React, Node.js, and a SQL database.",
            image: Project3,
            url: "https://github.com/RoshanRajcmd/ecom-web-app",
        },
        {
            tag: "Desktop",
            title: "Custom Web Browser for Desktop",
            subtitle:
                "A custom web browser built with Python and PyQt, featuring a sleek design and essential functionalities.",
            image: Project5,
            url: "https://github.com/RoshanRajcmd/py-browser",
        },
    ];
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

    return (
        <div className="pt-16">
            <h2 className="justify-center text-4xl font-bold mb-4">Work</h2>
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Projects</h2>
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
                {projects.map((item, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden shadow-md flex flex-col cursor-pointer transition-transform duration-200 active:scale-95 hover:-translate-y-1 hover:scale-105 ${darkMode ? 'bg-[#ededed] text-[#141414]' : 'bg-[#141414] text-[#ededed]'}`}
                        onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
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
                                    className={`inline-block text-xs font-thin rounded-full px-3 py-1 transition-colors duration-300 ${darkMode ? 'text-[#141414]' : 'text-[#ededed]'}`}
                                    style={{ backgroundColor: hoveredIdx === idx ? tagBgColors[idx] : (darkMode ? '#ededed' : '#141414') }}
                                >
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                        <div className="px-4 pt-2 pb-6 flex flex-col gap-1 flex-1">
                            <p className="text-xl font-thin ">{item.title}</p>
                            <p className="text-sm text-gray-400 font-thin">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Work;