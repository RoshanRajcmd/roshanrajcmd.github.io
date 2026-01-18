import React from 'react';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaBehanceSquare } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import { GITHUB_URL, LINKEDIN_URL, BEHANCE_URL, EMAIL_URL } from './Constants';

const Contacts = ({ darkMode = false, playClickSound = () => { } }) => {
    return (
        <div className='flex justify-center items-center gap-4'>
            <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                aria-label="GitHub"
                onClick={playClickSound}
            >
                <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="GithubLogo" data-size="20px" data-weight="regular">
                    <FaGithubSquare className="size-8" />
                </div>
            </a>
            <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                aria-label="LinkedIn"
                onClick={playClickSound}
            >
                <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                    <FaLinkedin className="size-8" />
                </div>
            </a>
            <a
                href={BEHANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                aria-label="LinkedIn"
                onClick={playClickSound}
            >
                <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`} data-icon="LinkedinLogo" data-size="20px" data-weight="regular">
                    <FaBehanceSquare className="size-8" />
                </div>
            </a>
            <a
                href={EMAIL_URL}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                aria-label="Email"
                onClick={playClickSound}
            >
                <div className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark bg-gray-600 text-[#ededed]' : 'bg-[#ededed] text-gray-600'}`}>
                    <IoMailUnread className="size-8" />
                </div>
            </a>
        </div>
    );
};

export default Contacts;