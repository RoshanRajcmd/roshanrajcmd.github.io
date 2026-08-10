// Pure command registry for the Nerd View terminal.
//
// Nothing in this module performs I/O — every command is a pure function of the
// app's constant data that returns descriptor objects. The UI layer (TerminalView)
// decides how to render them and which side effects (window.open, clear, exit) to run.
// This keeps the command surface trivially testable and easy to extend.

import {
    PROJECTS,
    DEVELOPMENT,
    FAQS,
    ABOUT_CARDS,
    EXPERIENCES,
    SKILLS,
    GITHUB_URL,
    LINKEDIN_URL,
    BEHANCE_URL,
    BLOG_URL,
    EMAIL_URL,
    EMAIL_ADDRESS,
    CAREER_EXPERIENCE_START_DATE,
} from '../Constants';
import { getYearsAndMonthsSinceInWords } from '../Utility';

// ---------------------------------------------------------------------------
// Block types produced by commands
// ---------------------------------------------------------------------------
export const BLOCK_BANNER = 'banner';   // startup splash
export const BLOCK_PROMPT = 'prompt';   // echo of what the user typed
export const BLOCK_TEXT = 'text';       // plain assistant-style output
export const BLOCK_TREE = 'tree';       // labelled key/value lines
export const BLOCK_SELECT = 'select';   // interactive ↑/↓ + Enter list
export const BLOCK_ERROR = 'error';
export const BLOCK_NOTICE = 'notice';   // dim status line
export const BLOCK_AI = 'ai';           // streamed Ari answer

// Side effects the shell may be asked to perform after a command resolves.
export const ACTION_CLEAR = 'clear';
export const ACTION_EXIT = 'exit';
export const ACTION_ASK_ARI = 'ask-ari';
export const ACTION_EXIT_ARI = 'exit-ari';

// ---------------------------------------------------------------------------
// Option lists
// ---------------------------------------------------------------------------
const workOptions = () =>
    PROJECTS.filter((p) => p.category === DEVELOPMENT).map((p) => ({
        label: p.title,
        hint: p.techStack.slice(0, 3).join(' · '),
        detail: p.subtitle,
        url: p.url,
    }));

const contactOptions = () => [
    { label: 'Email', hint: EMAIL_ADDRESS, url: EMAIL_URL },
    { label: 'LinkedIn', hint: 'in/roshanraj1999', url: LINKEDIN_URL },
    { label: 'GitHub', hint: '@roshanrajcmd', url: GITHUB_URL },
];

const socialOptions = () => [
    { label: 'GitHub', hint: '@roshanrajcmd', url: GITHUB_URL },
    { label: 'LinkedIn', hint: 'in/roshanraj1999', url: LINKEDIN_URL },
    { label: 'Behance', hint: 'RoshanRaj512', url: BEHANCE_URL },
    { label: 'Medium', hint: 'Blog & write-ups', url: BLOG_URL },
];

const faqOptions = () =>
    FAQS.map((f) => ({
        label: f.question,
        detail: f.link ? `${f.answer} ${f.link.label}: ${f.link.url}` : f.answer,
        url: f.link?.url,
    }));

// ---------------------------------------------------------------------------
// Command registry
// ---------------------------------------------------------------------------
export const COMMANDS = [
    {
        name: '/work',
        summary: 'Browse featured projects',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_SELECT,
                    title: 'Select a project to open on GitHub',
                    options: workOptions(),
                },
            ],
        }),
    },
    {
        name: '/about',
        summary: 'Who is Roshan Raj',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_TEXT,
                    text: `Roshan Raj — Software Development Engineer, Bangalore IN.\n${getYearsAndMonthsSinceInWords(
                        CAREER_EXPERIENCE_START_DATE
                    )} building full-stack web and desktop software.`,
                },
                {
                    type: BLOCK_TREE,
                    title: 'Experience',
                    rows: EXPERIENCES.map((e) => ({
                        key: `${e.compName}${e.current ? ' (current)' : ''}`,
                        value: `${e.role} · ${e.timePeriod} · ${e.duration}`,
                    })),
                },
                {
                    type: BLOCK_TREE,
                    title: 'Principles',
                    rows: ABOUT_CARDS.map((c) => ({ key: c.title, value: '' })),
                },
                {
                    type: BLOCK_TEXT,
                    text: `Core stack: ${SKILLS.slice(0, 12).join(', ')} … +${SKILLS.length - 12} more`,
                },
            ],
        }),
    },
    {
        name: '/social',
        summary: 'Social profiles',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_SELECT,
                    title: 'Select a profile to open',
                    options: socialOptions(),
                },
            ],
        }),
    },
    {
        name: '/faq',
        summary: 'Frequently asked questions',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_SELECT,
                    title: 'Select a question to reveal the answer',
                    options: faqOptions(),
                    revealDetail: true, // Enter expands inline instead of opening a link
                },
            ],
        }),
    },
    {
        name: '/contact',
        summary: 'Ways to reach out',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_SELECT,
                    title: 'Select how you would like to get in touch',
                    options: contactOptions(),
                },
            ],
        }),
    },
    {
        name: '/ask-ari',
        summary: 'Chat with Ari, the on-device AI guide',
        run: () => ({
            blocks: [
                {
                    type: BLOCK_NOTICE,
                    text: 'Ari runs entirely in your browser via WebGPU. First load downloads the model — expect a cold start. Type a question, or /exit-ari to leave.',
                },
            ],
            action: ACTION_ASK_ARI,
        }),
    },
    {
        name: '/exit-ari',
        summary: 'End the Ari chat session',
        ariOnly: true, // only offered while a chat session is active
        run: () => ({
            blocks: [{ type: BLOCK_NOTICE, text: 'Ari session ended.' }],
            action: ACTION_EXIT_ARI,
        }),
    },
    {
        name: '/clear',
        summary: 'Clear the screen',
        run: () => ({ blocks: [], action: ACTION_CLEAR }),
    },
    {
        name: '/exit',
        summary: 'Leave Nerd View and return to the site',
        run: () => ({ blocks: [], action: ACTION_EXIT }),
    },
    {
        name: '/help',
        summary: 'List available commands',
        run: (ctx) => ({
            blocks: [
                {
                    type: BLOCK_TREE,
                    title: 'Available commands',
                    rows: visibleCommands(ctx).map((c) => ({ key: c.name, value: c.summary })),
                },
            ],
        }),
    },
];

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

/** Commands offered in the current context (`{ ariActive }`). */
export function visibleCommands({ ariActive = false } = {}) {
    return COMMANDS.filter((c) => (c.ariOnly ? ariActive : true));
}

/** Commands whose name starts with the given (possibly partial) input. */
export function matchCommands(input, ctx) {
    const q = input.trim().toLowerCase();
    if (!q.startsWith('/')) return [];
    return visibleCommands(ctx).filter((c) => c.name.startsWith(q));
}

/**
 * Resolve a raw input line to blocks + an optional action.
 * Accepts commands with or without the leading slash.
 */
export function runCommand(raw, ctx = {}) {
    const input = raw.trim().toLowerCase();
    const name = input.startsWith('/') ? input : `/${input}`;
    const command = visibleCommands(ctx).find((c) => c.name === name);

    if (!command) {
        return {
            blocks: [
                {
                    type: BLOCK_ERROR,
                    text: `Unknown command: ${raw.trim()}`,
                    hint: 'Run /help to see everything available.',
                },
            ],
        };
    }
    return command.run(ctx);
}

export const WELCOME_TIP =
    'Type / to see commands. ↑/↓ to pick an option, Enter to select, Esc to dismiss.';
