import React from 'react';
import ProfileImg from '../assets/Profile_1.png';

const About = () => (
    <div>
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
                <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">A Jack of All Trades</h2>
                <p className=" text-base font-normal leading-normal pb-3 pt-1 px-4">
                    I am a software developer with 3+ years of experience in building web and desktop applications. I specialize in full-stack development and have a strong understanding
                    of software engineering principles. My goal is to create impactful and user-friendly applications that solve real-world problems.
                </p>
                <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Skills</h2>
                <div className="flex gap-3 p-3 flex-wrap pr-4">
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Java</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">SpringBoot</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">React.js</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Python</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Flask</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Docker & K8</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">AWS</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">SQL</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Git</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">REST APIs</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">Selenium</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">CI/CD tools</p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#ededed] text-[#141414]">
                        <p className="text-sm font-medium leading-normal">And more...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;
