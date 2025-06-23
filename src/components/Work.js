import React from 'react';
import Project1 from '../assets/Project1.png';
import Project2 from '../assets/Project2.png';

const Work = () => {
    return (
        <div className="pt-16"> {/* Add top padding to prevent collapse under navbar */}
            <h2 className="justify-center text-4xl font-bold mb-4">Work</h2>
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Projects</h2>
            <div className="p-4">
                <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-neutral-500 text-sm font-normal leading-normal">Featured Project</p>
                            <p className="text-base font-bold leading-tight">E-commerce Platform</p>
                            <p className="text-neutral-500 text-sm font-normal leading-normal">A full-featured e-commerce platform built with React, Node.js, and a SQL database.</p>
                        </div>
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit bg-[#ededed] text-[#141414]"
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
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit bg-[#ededed] text-[#141414]"
                        >
                            <span className="truncate">View Project</span>
                        </button>
                    </div>
                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 flex items-center justify-center">
                        <img src={Project2} alt="Mobile Task Manager" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Work;