import React from 'react';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaBehanceSquare } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import { GITHUB_URL, LINKEDIN_URL, BEHANCE_URL, EMAIL_URL } from './Constants';
import { COLOR_LIGHT_GRAY, COLOR_GRAY_600 } from './ColorConstants';

const LINKS = [
    { label: 'Email', url: EMAIL_URL, Icon: IoMailUnread, external: false },
    { label: 'LinkedIn', url: LINKEDIN_URL, Icon: FaLinkedin, external: true },
    { label: 'GitHub', url: GITHUB_URL, Icon: FaGithubSquare, external: true },
    { label: 'Behance', url: BEHANCE_URL, Icon: FaBehanceSquare, external: true },
];

const Contacts = ({ darkMode = false, playClickSound = () => { } }) => {
    // Colours come from JS constants, so they are applied inline — Tailwind's
    // scanner cannot see arbitrary values built from template literals.
    const iconStyle = {
        backgroundColor: darkMode ? COLOR_GRAY_600 : COLOR_LIGHT_GRAY,
        color: darkMode ? COLOR_LIGHT_GRAY : COLOR_GRAY_600,
    };

    return (
        <div className='flex justify-center items-center gap-4'>
            {LINKS.map(({ label, url, Icon, external }) => (
                <a
                    key={label}
                    href={url}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 group"
                    aria-label={label}
                    onClick={playClickSound}
                >
                    <div
                        className={`rounded-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 ${darkMode ? 'dark' : ''}`}
                        style={iconStyle}
                    >
                        <Icon className="size-8" />
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Contacts;
