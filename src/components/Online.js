import React, { useState, useRef, useEffect } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import ProfileImg from '../assets/Profile_1.png';
import { getYearsAndMonthsSinceInWords } from './Utility';
import doublePopup from '../assets/pop-up.mov';
import { SKILLS, INITIAL_VISIBLE_SKILLS, TESTIMONIALS, ABOUT_CARDS, EXPERIENCES, CERTIFICATES, CAREER_EXPERIENCE_START_DATE, } from './Constants';

export function Online({ soundOn, darkMode, playClickSound }) {
  const audioRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [aboutIdx, setAboutIdx] = useState(0);
  const [direction, setDirection] = useState('right'); // for animation
  const yoeInWords = getYearsAndMonthsSinceInWords(CAREER_EXPERIENCE_START_DATE, false);
  const visibleSkills = showMore ? SKILLS : SKILLS.slice(0, INITIAL_VISIBLE_SKILLS);

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

  // About Me cards for carousel
  const handlePrevAbout = () => {
    setDirection('left');
    setAboutIdx((prev) => (prev === 0 ? ABOUT_CARDS.length - 1 : prev - 1));
  };
  const handleNextAbout = () => {
    setDirection('right');
    setAboutIdx((prev) => (prev === ABOUT_CARDS.length - 1 ? 0 : prev + 1));
  };

  const handleCertificateClick = (item) => {
    if (playClickSound) playClickSound();
    if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const handleShowMore = () => {
    if (soundOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setShowMore((prev) => !prev);
  };

  return (
    <div className="">
      <audio ref={audioRef} src={doublePopup} preload="auto" />
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
                <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Roshan Raj</p>
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
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center  pb-3 ">{ABOUT_CARDS[aboutIdx].title}</h2>
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

        {/* Skills */}
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
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 bg-[#bcbbbb] text-[#141414] cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
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

        {/* Educations */}
        <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-5 pt-10">Education</h2>
        <div className="flex items-center justify-center">
          <div className="w-72 gap-x-2 rounded-lg p-4 bg-[#ededed]">
            <p className="text-center text-base font-normal leading-normal  text-[#141414] italic">Mechatronics Engineering</p>
            <p className="text-center text-sm font-medium leading-normal text-neutral-500 ">Chennai Institue of Technology <br /> 2017 - 2021</p>
            <p className="text-center text-sm font-medium leading-normal text-[#141414]">🏆 Top 7 distinction in the state. 🎓</p>
          </div>
        </div>

        {/* Certifications - will be enabled in future*/}
        <h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-5 pt-16">Certifications</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CERTIFICATES.map((item, idx) => (
            <div
              key={idx}
              className={`items-center justify-center text-center p-4 rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 bg-[#ededed] text-[#141414] ${!item.url ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => handleCertificateClick(item)}
            >
              <span className="text-xl">{item.certifiName}</span>
              <div className='flex gap-2 justify-center items-center'>
                <span className="text-xs font-semibold">{item.time}</span>
                <FiExternalLink />
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section (Responsive Timeline) */}
        < h2 className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pt-16" >Experience</h2>
        <h3 className="text-center text-[18px] font-medium text-neutral-500 leading-normal tracking-[-0.015em] px-2 sm:px-4 pt-2">{yoeInWords}</h3>
        <div className="w-full flex flex-col items-center pb-4">
          <div className="overflow-x-auto w-full whitespace-nowrap py-4">
            <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-stretch gap-8 sm:gap-0">
              {/* Timeline vertical line */}
              <div className="hidden sm:block absolute left-1/2 right-1/2 top-1.5 h-1 w-full bg-[#ededed] -translate-x-1/2" aria-hidden="true"></div>
              {/* Timeline vertical line for mobile */}
              <div className="block sm:hidden absolute left-1.5 top-0 h-full w-1 bg-[#ededed]" aria-hidden="true"></div>
              {/* Experience Items */}
              <div className="relative w-full flex flex-col sm:flex-row sm:justify-between gap-8">
                {EXPERIENCES.map((experience, idx) => (
                  <div className="flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-1/2">

                    {/* Dot */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      {/* Outer static green circle for current experience */}
                      {experience.current && (
                        <span className={"absolute inline-flex h-full w-full rounded-full bg-[#00ff22]"}></span>
                      )}
                      {/* Live green dot */}
                      <span
                        className={`absolute inline-flex  rounded-full ${experience.current
                          ? "h-5 w-5 bg-[#00ff22] opacity-75 animate-ping"
                          : "h-full w-full bg-[#ededed]"
                          }`}
                      ></span>
                      {/* Inner solid circle */}
                      <span className="relative inline-flex rounded-full w-2 h-2 bg-[#141414]"></span>
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

        {/* Testimonials */}
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
      </div >
    </div>
  );
}