import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TerminalView from './TerminalView';

// web-llm is dynamically imported by useAriEngine and needs WebGPU, which jsdom
// lacks. The stub never resolves so the engine stays in its loading state — these
// tests cover the command surface, not model inference.
jest.mock(
    '@mlc-ai/web-llm',
    () => ({ CreateMLCEngine: () => new Promise(() => {}) }),
    { virtual: true }
);

const type = async (text) => {
    await userEvent.type(screen.getByLabelText(/terminal input/i), text);
};

describe('TerminalView', () => {
    test('shows the banner and a command hint on mount', () => {
        render(<TerminalView />);
        expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/terminal input/i)).toBeInTheDocument();
    });

    test('typing "/" opens the autocomplete menu', async () => {
        render(<TerminalView />);
        await type('/co');
        expect(screen.getByText('/contact')).toBeInTheDocument();
    });

    test('/contact renders Email, LinkedIn and GitHub options', async () => {
        render(<TerminalView />);
        await type('/contact{Enter}');
        expect(screen.getByText(/how you would like to get in touch/i)).toBeInTheDocument();
        ['Email', 'LinkedIn', 'GitHub'].forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    test('arrow keys move the cursor and Enter opens the chosen link', async () => {
        const open = jest.spyOn(window, 'open').mockImplementation(() => null);
        render(<TerminalView />);

        await type('/social{Enter}');
        // First row starts selected; ArrowDown moves to LinkedIn.
        await type('{ArrowDown}{Enter}');

        expect(open).toHaveBeenCalledWith(
            expect.stringContaining('linkedin.com'),
            '_blank',
            'noopener,noreferrer'
        );
        expect(screen.getByText(/Opening LinkedIn/i)).toBeInTheDocument();
        open.mockRestore();
    });

    test('Escape dismisses an option list without opening anything', async () => {
        const open = jest.spyOn(window, 'open').mockImplementation(() => null);
        render(<TerminalView />);

        await type('/work{Enter}');
        expect(screen.getByText(/↑\/↓ navigate/)).toBeInTheDocument();

        await type('{Escape}');
        expect(screen.queryByText(/↑\/↓ navigate/)).not.toBeInTheDocument();
        expect(open).not.toHaveBeenCalled();
        open.mockRestore();
    });

    test('an unknown command reports an error', async () => {
        render(<TerminalView />);
        await type('/bogus{Enter}');
        expect(screen.getByText(/Unknown command: \/bogus/i)).toBeInTheDocument();
    });

    test('/clear resets the screen back to the banner', async () => {
        render(<TerminalView />);
        await type('/about{Enter}');
        expect(screen.getByText(/Software Development Engineer/i)).toBeInTheDocument();

        await type('/clear{Enter}');
        expect(screen.queryByText(/Software Development Engineer/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    });

    test('/exit calls the onExit callback', async () => {
        const onExit = jest.fn();
        render(<TerminalView onExit={onExit} />);
        await type('/exit{Enter}');
        expect(onExit).toHaveBeenCalled();
    });

    test('/ask-ari starts a session and exposes /exit-ari', async () => {
        render(<TerminalView />);
        await type('/ask-ari{Enter}');
        expect(screen.getByText(/Ari runs entirely in your browser/i)).toBeInTheDocument();

        await type('/exit-{Enter}');
        expect(screen.getByText(/Ari session ended/i)).toBeInTheDocument();
    });

    test('ArrowUp recalls the previous command', async () => {
        render(<TerminalView />);
        await type('/about{Enter}');
        await type('{ArrowUp}');
        expect(screen.getByLabelText(/terminal input/i)).toHaveValue('/about');
    });
});
