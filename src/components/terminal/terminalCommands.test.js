import {
    ACTION_ASK_ARI,
    ACTION_CLEAR,
    ACTION_EXIT,
    ACTION_EXIT_ARI,
    BLOCK_ERROR,
    BLOCK_SELECT,
    matchCommands,
    runCommand,
    visibleCommands,
} from './terminalCommands';

describe('runCommand', () => {
    test('/contact offers Email, LinkedIn and GitHub as selectable options', () => {
        const { blocks } = runCommand('/contact');
        const select = blocks.find((b) => b.type === BLOCK_SELECT);
        expect(select.options.map((o) => o.label)).toEqual(['Email', 'LinkedIn', 'GitHub']);
        select.options.forEach((o) => expect(o.url).toBeTruthy());
    });

    test('/work lists development projects with GitHub urls', () => {
        const { blocks } = runCommand('/work');
        const select = blocks.find((b) => b.type === BLOCK_SELECT);
        expect(select.options.length).toBeGreaterThan(0);
        select.options.forEach((o) => expect(o.url).toMatch(/^https?:\/\//));
    });

    test('/faq reveals answers inline instead of opening links', () => {
        const { blocks } = runCommand('/faq');
        const select = blocks.find((b) => b.type === BLOCK_SELECT);
        expect(select.revealDetail).toBe(true);
        expect(select.options[0].detail).toBeTruthy();
    });

    test('accepts commands without the leading slash', () => {
        expect(runCommand('about').blocks[0].type).not.toBe(BLOCK_ERROR);
    });

    test('unknown input produces an error block, not a throw', () => {
        const { blocks } = runCommand('/nope');
        expect(blocks[0].type).toBe(BLOCK_ERROR);
        expect(blocks[0].text).toContain('/nope');
    });

    test('control commands map to their actions', () => {
        expect(runCommand('/clear').action).toBe(ACTION_CLEAR);
        expect(runCommand('/exit').action).toBe(ACTION_EXIT);
        expect(runCommand('/ask-ari').action).toBe(ACTION_ASK_ARI);
    });
});

describe('context gating', () => {
    test('/exit-ari is hidden until an Ari session is active', () => {
        expect(runCommand('/exit-ari').blocks[0].type).toBe(BLOCK_ERROR);
        expect(runCommand('/exit-ari', { ariActive: true }).action).toBe(ACTION_EXIT_ARI);
    });

    test('/help only lists commands available in the current context', () => {
        const names = (ctx) =>
            runCommand('/help', ctx).blocks[0].rows.map((r) => r.key);
        expect(names({})).not.toContain('/exit-ari');
        expect(names({ ariActive: true })).toContain('/exit-ari');
    });

    test('visibleCommands hides ari-only commands by default', () => {
        expect(visibleCommands().some((c) => c.ariOnly)).toBe(false);
    });
});

describe('matchCommands', () => {
    test('prefix matches slash input', () => {
        expect(matchCommands('/a').map((c) => c.name)).toEqual(
            expect.arrayContaining(['/about', '/ask-ari'])
        );
    });

    test('returns every command for a bare slash', () => {
        expect(matchCommands('/').length).toBe(visibleCommands().length);
    });

    test('ignores input that is not a command', () => {
        expect(matchCommands('hello there')).toEqual([]);
    });
});
