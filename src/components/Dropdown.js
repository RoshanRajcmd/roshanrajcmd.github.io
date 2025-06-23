import React, { useState } from 'react';
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

const Dropdown = ({ question, answer, darkMode }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mb-4 rounded-lg overflow-hidden shadow">
            <button
                className={`w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{question}</span>
                <span>{open ? <MdExpandLess /> : <MdExpandMore />}</span>
            </button>
            {open && (
                <div className={`px-4 py-3 text-base font-normal leading-normal ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
                    {answer}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
