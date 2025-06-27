import React, { useState, useRef } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import paperClose from '../assets/paper-close.mov';

const Dropdown = ({ question, answer, darkMode, soundOn }) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const closeAudioRef = useRef(null);

    const handleToggle = () => {
        if (soundOn && closeAudioRef.current) {
            closeAudioRef.current.currentTime = 0;
            closeAudioRef.current.play();
        }
        setOpen((prev) => !prev);
    };

    return (
        <div className="mb-4 rounded-lg overflow-hidden shadow">
            <audio ref={closeAudioRef} src={paperClose} preload="auto" />
            <button
                className={`w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                onClick={handleToggle}
            >
                <span>{question}</span>
                <span>{open ? <MdExpandLess /> : <MdExpandMore />}</span>
            </button>
            <div
                ref={contentRef}
                className={`transition-all duration-300 ease-in-out ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                style={{
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    color: darkMode ? '#e5e7eb' : '#374151',
                    padding: open ? '1rem' : '0 1rem',
                }}
            >
                {answer}
            </div>
        </div>
    );
};

export default Dropdown;
