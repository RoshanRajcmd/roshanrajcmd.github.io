import ProfileImg from '../assets/Profile_1.png';
import React, { useState, useRef, useEffect} from 'react';
import { ONLINE, OFFLINE } from './Constants';
import { Online } from './Online';
import { Offline } from './Offline';


const About = ({ soundOn, darkMode, playClickSound }) => {
    const [activeTab, setActiveTab] = useState(0);
    const marqueeRef = useRef(null);
    const containerRef = useRef(null);
    const [marqueeDuration, setMarqueeDuration] = useState(24); // fallback default
    const aboutTabs = [{ label: ONLINE }, { label: OFFLINE }];

    useEffect(() => {
        function updateDuration() {
            if (marqueeRef.current && containerRef.current) {
                const marqueeWidth = marqueeRef.current.scrollWidth;
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

                    {/* Online / Offline tabs */}
                    <div className="relative mx-auto flex w-full max-w-md rounded-full bg-gray-200 p-1 mt-6 mb-2">
                        <div
                            className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
                            style={{
                                width: `calc(100% / ${aboutTabs.length} - 0.25rem)`,
                                transform: `translateX(${activeTab * 100}%)`,
                            }}
                        />

                        {aboutTabs.map((tab, index) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(index)}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors ${activeTab === index ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 0
                        ? <Online soundOn={soundOn} playClickSound={playClickSound} />
                        : <Offline />}

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
