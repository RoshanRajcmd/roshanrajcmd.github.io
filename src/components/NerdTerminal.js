import React, { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import Home from './Home';
import TerminalView from './terminal/TerminalView';
import { TERMINAL_COLORS } from './ColorConstants';

/**
 * Toggles between the recruiter-friendly site (Home) and the terminal
 * ("Nerd View"). All terminal behaviour lives in ./terminal.
 */
export default function NerdTerminal() {
    const [isNerdMode, setIsNerdMode] = useState(false);

    // The terminal is a full-screen fixed overlay; stop the page behind it from scrolling.
    useEffect(() => {
        if (!isNerdMode) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isNerdMode]);

    return (
        <>
            {isNerdMode ? <TerminalView onExit={() => setIsNerdMode(false)} /> : <Home />}

            {!isNerdMode && (
                <button
                    type="button"
                    onClick={() => setIsNerdMode(true)}
                    aria-label="Open Nerd View terminal"
                    className="nerd-view-btn fixed left-4 bottom-4 z-40 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                    style={{ background: TERMINAL_COLORS.bg, color: TERMINAL_COLORS.text }}
                >
                    <BsStars aria-hidden="true" className="relative z-10 w-4 h-4" />
                    <span className="relative z-10">Nerd View</span>
                </button>
            )}
        </>
    );
}
