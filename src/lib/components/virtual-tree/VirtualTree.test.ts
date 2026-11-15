/**
 * Tests of `VirtualTree`: its tree roles and levels, the one tab stop on the focused row, the
 * keyboard (moving, opening, typeahead) reaching rows out of view, selection, the focus kept on a
 * shown row when a branch closes over it and kept in the page when scrolled out of view, and
 * renaming.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet, tick } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import { createTreeCollection } from '@ark-ui/svelte';
import VirtualTree from './VirtualTree.svelte';

interface Node {
	id: string;
	name: string;
	children?: Node[];
}

/** a (a1, a2 (a2x)), b. */
function tree(children?: Node[]) {
	return createTreeCollection<Node>({
		nodeToValue: (n) => n.id,
		nodeToString: (n) => n.name,
		rootNode: {
			id: 'root',
			name: '',
			children: children ?? [
				{
					id: 'a',
					name: 'a',
					children: [
						{ id: 'a1', name: 'a1' },
						{ id: 'a2', name: 'a2', children: [{ id: 'a2x', name: 'a2x' }] }
					]
				},
				{ id: 'b', name: 'b' }
			]
		}
	});
}

const row = createRawSnippet((node: () => Node) => ({
	render: () => `<span>${node().name}</span>`
}));

/** Ark moves the focus after the row is scrolled into view, in the next animation frame. */
const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

function setup(props: Record<string, unknown> = {}) {
	const result = render(VirtualTree<Node>, {
		collection: tree(),
		label: 'Hierarchy',
		row,
		...props
	});
	const treeEl = result.getByRole('tree', { name: 'Hierarchy' });
	/** A row: an item, or a branch's control (the element that takes the focus). */
	const rowOf = (value: string) => {
		const el = treeEl.querySelector<HTMLElement>(
			`[data-value="${value}"]:is([data-part="item"], [data-part="branch-control"])`
		);
		if (!el) throw new Error(`no row ${value}`);
		return el;
	};
	const press = async (key: string, init: KeyboardEventInit = {}) => {
		await fireEvent.keyDown(document.activeElement ?? document.body, { key, ...init });
		await frame();
	};
	const focused = () => (document.activeElement as HTMLElement | null)?.dataset.value;
	const selected = () =>
		[...treeEl.querySelectorAll('[aria-selected="true"]')].map((el) =>
			el.getAttribute('data-value')
		);
	return { ...result, treeEl, rowOf, press, focused, selected };
}

describe('VirtualTree', () => {
	it('exposes a labelled tree with levels, places and open states', () => {
		const { getAllByRole } = setup({ expandedValue: ['a'] });
		const items = getAllByRole('treeitem');
		expect(items.map((i) => i.getAttribute('aria-level'))).toEqual(['1', '2', '2', '1']);
		expect(items.map((i) => i.getAttribute('aria-posinset'))).toEqual(['1', '1', '2', '2']);
		expect(items.map((i) => i.getAttribute('aria-setsize'))).toEqual(['2', '2', '2', '2']);
		expect(items[0].getAttribute('aria-expanded')).toBe('true');
		expect(items[1].hasAttribute('aria-expanded')).toBe(false);
		// A branch's focusable row is the treeitem itself, not a button inside it.
		expect(items[0].tabIndex).toBe(0);
		expect(items[0].querySelector('[role="button"]')).toBeNull();
	});

	it('has one tab stop, on the first row until a row takes the focus', async () => {
		const { treeEl, rowOf } = setup({ expandedValue: ['a'] });
		const stops = () => [...treeEl.querySelectorAll('[tabindex="0"]')];
		expect(treeEl.tabIndex).toBe(-1);
		expect(stops()).toEqual([rowOf('a')]);
		rowOf('a2').focus();
		await tick();
		expect(stops()).toEqual([rowOf('a2')]);
	});

	it('makes an empty tree a tab stop itself', () => {
		const { treeEl } = setup({ collection: tree([]) });
		expect(treeEl.tabIndex).toBe(0);
	});

	it('opens, enters and moves with the keyboard, and activates with Enter', async () => {
		const onActivate = vi.fn();
		const { rowOf, getAllByRole, press, focused, selected } = setup({ onActivate });
		expect(getAllByRole('treeitem')).toHaveLength(2);
		rowOf('a').focus();

		await press('ArrowRight');
		expect(getAllByRole('treeitem')).toHaveLength(4);
		await press('ArrowRight');
		expect(focused()).toBe('a1');
		await press('ArrowDown');
		expect(focused()).toBe('a2');
		await press('ArrowLeft');
		expect(focused()).toBe('a');

		await press('End');
		expect(focused()).toBe('b');
		await press('Enter');
		expect(onActivate).toHaveBeenCalledWith({ id: 'b', name: 'b' });
		expect(selected()).toEqual(['b']);
	});

	it('reaches rows out of view with the arrows and typeahead, scrolling them in', async () => {
		const leaves = Array.from({ length: 100 }, (_, i) => ({ id: `n${i}`, name: `Item ${i}` }));
		leaves[80] = { id: 'zebra', name: 'Zebra' };
		const { treeEl, rowOf, press, focused } = setup({ collection: tree(leaves) });
		rowOf('n0').focus();
		await press('End');
		expect(focused()).toBe('n99');
		// Row 99 at 26 px a row, brought just into a view of no height (jsdom has no layout).
		expect(treeEl.scrollTop).toBe(2600);
		await press('z');
		expect(focused()).toBe('zebra');
		expect(treeEl.scrollTop).toBe(80 * 26);
	});

	it('finds names with spaces by typing, and cycles with a repeated character', async () => {
		const { rowOf, press, focused, selected } = setup({
			collection: tree([
				{ id: 'light', name: 'Main Light' },
				{ id: 'frame', name: 'Mainframe' },
				{ id: 'camera', name: 'Main Camera' },
				{ id: 'audio', name: 'audio' },
				{ id: 'map', name: 'Map' }
			]),
			multiple: true,
			selectedValue: ['audio']
		});
		rowOf('light').focus();
		// Without the Space, "mainc" would find nothing and the focus would stay on Mainframe.
		for (const key of 'main c') await press(key);
		expect(focused()).toBe('camera');
		// The Space inside the name selected nothing.
		expect(selected()).toEqual(['audio']);
		// Later, a plain `a` searches too, and `m` twice goes to Map, then round to Main Light.
		await new Promise((resolve) => setTimeout(resolve, 400));
		await press('a');
		expect(focused()).toBe('audio');
		await new Promise((resolve) => setTimeout(resolve, 400));
		await press('m');
		expect(focused()).toBe('map');
		await press('m');
		expect(focused()).toBe('light');
	});

	it('selects the focused node with a Space that starts no search', async () => {
		const { rowOf, press, selected } = setup({ multiple: true });
		rowOf('b').focus();
		await press(' ');
		expect(selected()).toEqual(['b']);
	});

	it('selects one node on click, adds with Ctrl, ranges with Shift, when multiple', async () => {
		const { rowOf, selected } = setup({ multiple: true, expandedValue: ['a'] });
		await fireEvent.click(rowOf('a1'));
		await fireEvent.click(rowOf('b'), { ctrlKey: true });
		expect(selected()).toEqual(['a1', 'b']);
		await fireEvent.click(rowOf('b'));
		expect(selected()).toEqual(['b']);
		// From b, the first selected node, up to a1.
		await fireEvent.click(rowOf('a1'), { shiftKey: true });
		expect(selected()).toEqual(['a1', 'a2', 'b']);
	});

	it('extends the selection with Shift+arrows, one row at a time', async () => {
		const { rowOf, press, focused, selected } = setup({ multiple: true, expandedValue: ['a'] });
		await fireEvent.click(rowOf('a'));
		rowOf('a').focus();
		await press('ArrowDown', { shiftKey: true });
		expect(focused()).toBe('a1');
		expect(selected()).toEqual(['a', 'a1']);
		await press('ArrowDown', { shiftKey: true });
		expect(selected()).toEqual(['a', 'a1', 'a2']);
	});

	it("doesn't open a branch on click unless asked, but its caret does", async () => {
		const { rowOf, getAllByRole } = setup();
		await fireEvent.click(rowOf('a'));
		expect(getAllByRole('treeitem')).toHaveLength(2);
		await fireEvent.click(rowOf('a').querySelector('[data-part="branch-indicator"]')!);
		expect(getAllByRole('treeitem')).toHaveLength(4);
	});

	it('keeps the focused row in the page once scrolled out of view', async () => {
		const leaves = Array.from({ length: 100 }, (_, i) => ({ id: `n${i}`, name: `n${i}` }));
		const { treeEl, rowOf, press } = setup({ collection: tree(leaves) });
		rowOf('n0').focus();
		await press('ArrowDown');
		treeEl.scrollTop = 2600; // row 100 at 26 px a row: n1 is far out of view
		await fireEvent.scroll(treeEl);
		expect(document.activeElement).toBe(rowOf('n1'));
		expect(rowOf('n1').isConnected).toBe(true);
	});

	it('moves the tab stop to a branch closed over the focused row', async () => {
		const { rowOf, getAllByRole } = setup({ expandedValue: ['a', 'a2'] });
		rowOf('a2x').focus();
		await fireEvent.click(rowOf('a2').querySelector('[data-part="branch-indicator"]')!);
		expect(getAllByRole('treeitem').map((i) => i.textContent?.trim())).toEqual([
			'a',
			'a1',
			'a2',
			'b'
		]);
		expect(rowOf('a2').tabIndex).toBe(0);
	});

	it('renames with F2 and Enter, cancels with Escape, and keeps the name when left blank', async () => {
		const onRename = vi.fn();
		const { rowOf, press, getByRole, queryByRole } = setup({
			rename: { canRename: (n: Node) => n.id !== 'a', label: 'Name', onRename }
		});
		rowOf('a').focus();
		await press('F2');
		expect(queryByRole('textbox')).toBeNull();

		rowOf('b').focus();
		await press('F2');
		const input = getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
		expect(input.value).toBe('b');
		expect(document.activeElement).toBe(input);
		await fireEvent.input(input, { target: { value: ' Bee ' } });
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onRename).toHaveBeenCalledWith({ value: 'b', label: 'Bee', indexPath: [1] });
		expect(document.activeElement).toBe(rowOf('b'));

		await press('F2');
		await fireEvent.keyDown(getByRole('textbox'), { key: 'Escape' });
		expect(queryByRole('textbox')).toBeNull();

		await press('F2');
		await fireEvent.input(getByRole('textbox'), { target: { value: '  ' } });
		await fireEvent.focusOut(getByRole('textbox'));
		expect(queryByRole('textbox')).toBeNull();
		expect(onRename).toHaveBeenCalledTimes(1);
	});

	it('keeps the selection and activates nothing when the rename field is clicked', async () => {
		const onActivate = vi.fn();
		const { rowOf, press, getByRole, selected } = setup({
			multiple: true,
			selectedValue: ['a', 'b'],
			rename: { canRename: () => true, label: 'Name', onRename: vi.fn() },
			onActivate
		});
		rowOf('b').focus();
		await press('F2');
		const input = getByRole('textbox', { name: 'Name' });
		await fireEvent.click(input);
		await fireEvent.dblClick(input);
		expect(selected()).toEqual(['a', 'b']);
		expect(onActivate).not.toHaveBeenCalled();
	});

	it('lets onKeyDown take a key from the tree', async () => {
		const onKeyDown = vi.fn((event: KeyboardEvent) => event.preventDefault());
		const { rowOf, press, focused } = setup({ onKeyDown });
		rowOf('a').focus();
		await press('ArrowDown');
		expect(onKeyDown).toHaveBeenCalledWith(
			expect.any(KeyboardEvent),
			expect.objectContaining({ id: 'a' })
		);
		expect(focused()).toBe('a');
	});
});
