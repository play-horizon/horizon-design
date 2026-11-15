/**
 * Tests of the command palette: its search (which commands match, ignoring case and accents, and
 * in which order), running a command from the keyboard once the palette has closed, the combobox
 * state when nothing matches, the list scrolled back to the first command when the query changes,
 * and the empty text announced.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import CommandPalette from './CommandPalette.svelte';
import type { Command } from './filter';

const commands: Command[] = [
	{ id: 'open', label: 'Open docs', group: 'Help' },
	{ id: 'panel', label: 'Docs panel', group: 'Panels', shortcut: 'Ctrl D' },
	{ id: 'apply', label: 'Apply', group: 'Script', keywords: ['save'] },
	{ id: 'stop', label: 'Stop play-test', disabled: true }
];

// Ark mounts the dialog's content after a tick: find it asynchronously.
async function setup({ onRun = vi.fn(), list = commands } = {}) {
	const view = render(CommandPalette, {
		open: true,
		commands: list,
		onRun,
		label: 'Commands',
		placeholder: 'Type a command',
		emptyText: 'No command matches.'
	});
	const input = await view.findByRole('combobox', { name: 'Commands' });
	return { ...view, onRun, input: input as HTMLInputElement };
}

/** The ids of the commands listed for `query`, in their order. */
async function search(query: string, list = commands): Promise<(string | undefined)[]> {
	const { input, queryAllByRole, unmount } = await setup({ list });
	await fireEvent.input(input, { target: { value: query } });
	const ids = queryAllByRole('option').map((option) => option.dataset.value);
	unmount();
	return ids;
}

describe('CommandPalette search', () => {
	it('matches every typed word in the label, group or keywords, ignoring case', async () => {
		expect(await search('SAVE')).toEqual(['apply']);
		expect(await search('help docs')).toEqual(['open']);
		expect(await search('nothing')).toEqual([]);
	});

	it('wants each word whole, not its letters scattered', async () => {
		expect(await search('odc')).toEqual([]);
		expect((await search('ocs')).sort()).toEqual(['open', 'panel']);
	});

	it('ignores accents, in the label and in the query', async () => {
		const list: Command[] = [
			{ id: 'create', label: 'Créer une scène' },
			{ id: 'scene', label: 'Open scene' }
		];
		expect(await search('creer', list)).toEqual(['create']);
		expect(await search('CRÉER SCENE', list)).toEqual(['create']);
		expect(await search('scène', list)).toEqual(['scene', 'create']);
	});

	it('lists every command, in the given order, for a blank query', async () => {
		expect(await search('  ')).toEqual(['open', 'panel', 'apply', 'stop']);
	});

	it('puts commands found by their label before those found by their group or keywords', async () => {
		const list: Command[] = [
			{ id: 'console', label: 'Focus console', group: 'Panels' },
			{ id: 'docs', label: 'Open the docs panel', group: 'Help' }
		];
		expect(await search('panel', list)).toEqual(['docs', 'console']);
	});

	it('ranks a match at the start of the label first, and keeps the given order on a tie', async () => {
		const list: Command[] = [
			{ id: 'reopen', label: 'Reopen file' },
			{ id: 'scene-2', label: 'Open scene 2' },
			{ id: 'scene-1', label: 'Open scene 1' }
		];
		expect(await search('open', list)).toEqual(['scene-2', 'scene-1', 'reopen']);
	});
});

describe('CommandPalette', () => {
	it('lists the matching commands with their shortcuts', async () => {
		const { input, getAllByRole, getByText } = await setup();
		await fireEvent.input(input, { target: { value: 'panel' } });
		expect(getAllByRole('option').map((o) => o.textContent?.trim())).toEqual([
			expect.stringContaining('Docs panel')
		]);
		expect(getByText('Ctrl D')).toBeTruthy();
	});

	it('runs the highlighted command with Enter', async () => {
		const { input, onRun } = await setup();
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'Enter' });
		await vi.waitFor(() => expect(onRun).toHaveBeenCalledWith(commands[1]));
	});

	it('skips a disabled command, and stops at the last one', async () => {
		const { input, onRun } = await setup();
		for (let press = 0; press < 4; press++) {
			await fireEvent.keyDown(input, { key: 'ArrowDown' });
		}
		await fireEvent.keyDown(input, { key: 'Enter' });
		await vi.waitFor(() => expect(onRun).toHaveBeenCalledWith(commands[2]));
	});

	it('runs the command once closed, so it can move the focus out of the palette', async () => {
		const field = document.createElement('input');
		document.body.append(field);
		let fieldWasHidden: boolean | undefined;
		const onRun = vi.fn(() => {
			fieldWasHidden = field.closest('[inert], [aria-hidden="true"]') !== null;
			field.focus();
		});
		const { input, queryByRole } = await setup({ onRun });
		// The dialog hides the rest of the page a frame after it opens.
		await vi.waitFor(() => expect(field.closest('[inert], [aria-hidden="true"]')).not.toBeNull());

		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onRun).not.toHaveBeenCalled();
		await vi.waitFor(() => expect(onRun).toHaveBeenCalledExactlyOnceWith(commands[0]));
		expect(fieldWasHidden).toBe(false);
		expect(queryByRole('combobox')).toBeNull();
		// The dialog's focus restoration, which comes later, must leave the focus where the command put it.
		await new Promise((resolve) => setTimeout(resolve, 50));
		expect(document.activeElement).toBe(field);
		field.remove();
	});

	it('runs a clicked command, and keeps the focus in the search field when pressed', async () => {
		const { getAllByRole, onRun } = await setup();
		const option = getAllByRole('option')[1];
		const press = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
		option.dispatchEvent(press);
		expect(press.defaultPrevented).toBe(true);
		await fireEvent.click(option);
		await vi.waitFor(() => expect(onRun).toHaveBeenCalledExactlyOnceWith(commands[1]));
	});

	it('stays open while nothing matches, and closes with a single Escape', async () => {
		const { input, queryByRole, container } = await setup();
		// The dialog listens for Escape once it has hidden the rest of the page, a frame after it opens.
		await vi.waitFor(() =>
			expect(container.closest('[inert], [aria-hidden="true"]')).not.toBeNull()
		);
		await fireEvent.input(input, { target: { value: 'zzz' } });
		await fireEvent.input(input, { target: { value: '' } });
		await new Promise((resolve) => setTimeout(resolve, 50));
		expect(queryByRole('combobox')).toBe(input);

		await fireEvent.keyDown(input, { key: 'Escape' });
		await vi.waitFor(() => expect(queryByRole('combobox')).toBeNull());
	});

	it('starts with an empty search each time it opens', async () => {
		const { input, rerender, findByRole, queryByRole } = await setup();
		await fireEvent.input(input, { target: { value: 'docs' } });
		await rerender({ open: false });
		await vi.waitFor(() => expect(queryByRole('combobox')).toBeNull());
		await rerender({ open: true });
		const reopened = (await findByRole('combobox', { name: 'Commands' })) as HTMLInputElement;
		expect(reopened.value).toBe('');
	});

	it('does not run a disabled command, and says when nothing matches', async () => {
		const { input, onRun, getByText, getAllByRole } = await setup();
		await fireEvent.input(input, { target: { value: 'stop' } });
		await fireEvent.click(getAllByRole('option')[0]);
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onRun).not.toHaveBeenCalled();
		expect(input.value).toBe('stop');

		await fireEvent.input(input, { target: { value: 'zzz' } });
		expect(getByText('No command matches.')).toBeTruthy();
	});

	it('shows the list as collapsed, and points at nothing, when nothing matches', async () => {
		const { input, getByRole } = await setup();
		expect(input.getAttribute('aria-expanded')).toBe('true');
		expect(input.getAttribute('aria-controls')).toBe(getByRole('listbox').id);
		expect(input.getAttribute('aria-activedescendant')).toBe(
			getByRole('option', { name: /Open docs/ }).id
		);

		await fireEvent.input(input, { target: { value: 'zzz' } });
		await vi.waitFor(() => expect(input.getAttribute('aria-expanded')).toBe('false'));
		expect(input.hasAttribute('aria-activedescendant')).toBe(false);
	});

	it('announces the empty text in a live region', async () => {
		const { input, getAllByRole } = await setup();
		// Ark adds its own live regions while the list is open.
		const status = () => getAllByRole('status').find((region) => !region.dataset.liveAnnouncer);
		expect(status()?.textContent?.trim()).toBe('');
		await fireEvent.input(input, { target: { value: 'zzz' } });
		expect(status()?.textContent?.trim()).toBe('No command matches.');
	});

	it('keeps Ark’s announcements of the commands found silent', async () => {
		const { input, getAllByRole } = await setup();
		await fireEvent.input(input, { target: { value: 'p' } });
		const arkRegions = getAllByRole('status').filter((region) => region.dataset.liveAnnouncer);
		expect(arkRegions.length).toBeGreaterThan(0);
		// Past Ark's announcement delay (1 s).
		await new Promise((resolve) => setTimeout(resolve, 1200));
		expect(arkRegions.map((region) => region.textContent)).toEqual(arkRegions.map(() => ''));
	});

	it('scrolls back to the first command, which it highlights, when the query changes', async () => {
		const { input, getByRole, getAllByRole } = await setup();
		const listbox = getByRole('listbox');
		// jsdom has no layout: the list shows four rows.
		Object.defineProperty(listbox, 'clientHeight', { configurable: true, value: 136 });
		listbox.scrollTop = 60;
		await fireEvent.scroll(listbox);
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.input(input, { target: { value: 'p' } });
		expect(listbox.scrollTop).toBe(0);
		expect(input.getAttribute('aria-activedescendant')).toBe(getAllByRole('option')[0].id);
	});
});
