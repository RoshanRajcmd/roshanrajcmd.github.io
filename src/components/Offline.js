import React, { useState } from 'react';
import { OFFLINE_PROJECTS } from './Constants';
import { COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_TEXT, COLOR_LIGHT_GRAY, COLOR_MEDIUM_GRAY, COLOR_LIGHT_GRAY_TEXT } from './ColorConstants';

export function Offline({ soundOn, darkMode, playClickSound }) {

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tagBgColors, setTagBgColors] = useState({});


  const handleProjectClick = (item) => {
    if (playClickSound) playClickSound();
    if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-16" >
      <h2 className="justify-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-center mb-4">Hobbies 'n Interests</h2>
      <span className="justify-center text-center block">F1 enthusiast and racing fan</span>

      <span className="justify-center text-center block">Dive into 3D virtual space 3D printing, 3D rendering and more</span>
      <div className="grid md:grid-cols-3 gap-6 pt-6">
        {OFFLINE_PROJECTS.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_LIGHT_TEXT}]` : `bg-[${COLOR_DARK_BG}] text-[${COLOR_LIGHT_GRAY}]`} ${!item.url ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleProjectClick(item)}
          >
            <div className={`w-full flex items-center justify-center aspect-video relative p-2 ${darkMode ? `bg-[${COLOR_LIGHT_GRAY}]` : `bg-[${COLOR_DARK_BG}]`}`}>
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full object-cover rounded-lg`}
              />
            </div>
            <div className="px-4 pt-2 pb-6 flex flex-col gap-1 flex-1">
              <p className="text-xl pb-4 font-semibold ">{item.title}</p>
              <p className={`text-sm  font-light ${darkMode ? `text-[${COLOR_LIGHT_TEXT}]` : 'text-gray-500'}`}>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}