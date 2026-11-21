/**
 * Tests of `HierarchyView`: keyboard navigation, selection, reordering and reparenting with the
 * keyboard, renaming, deletion, drag and drop, nodes read through custom accessors, the tab stop
 * of an empty tree, and following a new `data`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { tick, type ComponentProps } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import { cancelDrag, drop, dragOver, startDrag } from '../../../test/drag';
import HierarchyView from './HierarchyView.svelte';
import type { AnyNode } from '.';

/** Player (Camera, Mesh), Light, UI (HUD); every branch closed. */
function scene(): AnyNode[] {
	return [
		{
			id: 'player',
			name: 'Player',
			children: [
				{ id: 'camera', name: 'Camera' },
				{ id: 'mesh', name: 'Mesh' }
			]
		},
		{ id: 'light', name: 'Light' },
		{ id: 'ui', name: 'UI', children: [{ id: 'hud', name: 'HUD' }] }
	];
}

/** The tree as nested values, so an expectation reads like the hierarchy. */
type Shape = (string | [string, Shape])[];

function shape(nodes: AnyNode[]): Shape {
	return nodes.map((n) => (n.children?.length ? [n.id as string, shape(n.children)] : n.id!));
}

/** The tree moves the focus after scrolling the row into view, in the next animation frame. */
const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

function setup(props: Partial<ComponentProps<typeof HierarchyView>> = {}) {
	const onDataChange = vi.fn();
	const onSelectionChange = vi.fn();
	const onExpandedChange = vi.fn();
	const result = render(HierarchyView, {
		data: scene(),
		label: 'Scene hierarchy',
		renameLabel: 'Name',
		dragLabel: (count: number) => `${count} objects`,
		onDataChange,
		onSelectionChange,
		onExpandedChange,
		...props
	});
	const tree = result.getByRole('tree', { name: 'Scene hierarchy' });
	/** A row: the element that takes the focus, the clicks and the drags. */
	const row = (value: string) => {
		const element = tree.querySelector<HTMLElement>(
			`[data-value="${value}"]:is([data-part="item"], [data-part="branch-control"])`
		);
		if (!element) throw new Error(`no row ${value}`);
		return element;
	};
	const item = (value: string) => row(value).closest<HTMLElement>('[role="treeitem"]')!;
	/** Tabs into the tree: its one tab stop takes the focus. */
	const focusTree = async () => {
		tree.querySelector<HTMLElement>('[tabindex="0"]')!.focus();
		await tick();
	};
	/** A click as a browser makes it: the press focuses the row, then the click lands. */
	const click = async (value: string, options: MouseEventInit = {}) => {
		row(value).focus();
		await fireEvent.click(row(value), options);
	};
	const cursor = () => (document.activeElement as HTMLElement | null)?.dataset.value;
	const press = async (key: string, options: KeyboardEventInit = {}) => {
		await fireEvent.keyDown(document.activeElement ?? document.body, { key, ...options });
		await frame();
	};
	const lastData = () => shape(onDataChange.mock.lastCall![0]);
	return {
		...result,
		tree,
		row,
		item,
		focusTree,
		click,
		cursor,
		press,
		lastData,
		onDataChange,
		onSelectionChange,
		onExpandedChange
	};
}

describe('HierarchyView', () => {
	it('moves the cursor and opens and closes branches with the keyboard', async () => {
		const { focusTree, item, cursor, press, onExpandedChange } = setup();
		await focusTree();
		expect(cursor()).toBe('player');

		await press('ArrowDown');
		expect(cursor()).toBe('light');
		await press('ArrowUp');
		expect(cursor()).toBe('player');
		await press('End');
		expect(cursor()).toBe('ui');
		await press('Home');
		expect(cursor()).toBe('player');

		await press('ArrowRight');
		expect(onExpandedChange).toHaveBeenLastCalledWith({ expandedValue: ['player'] });
		expect(item('player').getAttribute('aria-expanded')).toBe('true');
		expect(cursor()).toBe('player');
		await press('ArrowRight');
		expect(cursor()).toBe('camera');
		await press('ArrowDown');
		expect(cursor()).toBe('mesh');
		await press('ArrowLeft');
		expect(cursor()).toBe('player');
		await press('ArrowLeft');
		expect(onExpandedChange).toHaveBeenLastCalledWith({ expandedValue: [] });
		expect(item('player').getAttribute('aria-expanded')).toBe('false');
	});

	it('selects with clicks: one, Ctrl to add or remove, Shift for a range', async () => {
		const { click, item, onSelectionChange } = setup();
		await click('light');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['light'] });

		await click('player');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player'] });

		await click('light', { ctrlKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player', 'light'] });

		await click('player', { ctrlKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['light'] });

		// The range runs from Light, the first selected object, to UI.
		await click('ui', { shiftKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['light', 'ui'] });
		expect(item('light').getAttribute('aria-selected')).toBe('true');
		expect(item('player').getAttribute('aria-selected')).toBe('false');
	});

	it('clears the selection on a click on empty space', async () => {
		const { click, getByRole, onSelectionChange } = setup();
		await click('light');
		await fireEvent.click(getByRole('tree'));
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: [] });
	});

	it('toggles the selection with Space and Enter, and clears it with Escape', async () => {
		const { focusTree, press, onSelectionChange } = setup();
		await focusTree();
		await press(' ');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player'] });
		await press('ArrowDown');
		await press('Enter');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player', 'light'] });
		await press(' ');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player'] });
		await press('Escape');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: [] });
	});

	it('leaves a Space typed inside a name to type-to-find', async () => {
		const { focusTree, cursor, press, onSelectionChange } = setup({ selectedValue: ['light'] });
		await focusTree();
		// No other object starts with p, so the focus stays on Player.
		await press('p');
		await press(' ');
		expect(cursor()).toBe('player');
		expect(onSelectionChange).not.toHaveBeenCalled();
	});

	it('moves, indents and outdents the focused object with Shift+arrows', async () => {
		const { focusTree, cursor, press, lastData, onExpandedChange } = setup();
		await focusTree();

		await press('ArrowDown', { shiftKey: true });
		expect(lastData()).toEqual(['light', ['player', ['camera', 'mesh']], ['ui', ['hud']]]);
		expect(cursor()).toBe('player');

		await press('ArrowRight', { shiftKey: true });
		expect(lastData()).toEqual([
			['light', [['player', ['camera', 'mesh']]]],
			['ui', ['hud']]
		]);
		expect(onExpandedChange).toHaveBeenLastCalledWith({ expandedValue: ['light'] });
		expect(cursor()).toBe('player');

		await press('ArrowLeft', { shiftKey: true });
		expect(lastData()).toEqual(['light', ['player', ['camera', 'mesh']], ['ui', ['hud']]]);

		await press('ArrowUp', { shiftKey: true });
		expect(lastData()).toEqual([['player', ['camera', 'mesh']], 'light', ['ui', ['hud']]]);
		expect(cursor()).toBe('player');

		await press('ArrowUp', { shiftKey: true });
		expect(lastData()).toEqual([['player', ['camera', 'mesh']], 'light', ['ui', ['hud']]]);
	});

	it('renames with F2 and Enter, and keeps the name on Escape', async () => {
		const { focusTree, row, press, getByRole, getByText, onDataChange } = setup();
		await focusTree();
		await press('F2');
		const input = getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
		expect(input.value).toBe('Player');
		await fireEvent.input(input, { target: { value: '  Hero ' } });
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onDataChange.mock.lastCall![0][0].name).toBe('Hero');
		expect(getByText('Hero')).toBeTruthy();
		expect(document.activeElement).toBe(row('player'));

		await fireEvent.dblClick(row('light'));
		const second = getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
		// Ark fills the field in the next frame.
		await vi.waitFor(() => expect(second.value).toBe('Light'));
		await fireEvent.input(second, { target: { value: 'Sun' } });
		await fireEvent.keyDown(second, { key: 'Escape' });
		expect(onDataChange).toHaveBeenCalledTimes(1);
		expect(getByText('Light')).toBeTruthy();
	});

	it('moves the cursor to the parent a click closes over it, and the keys act there', async () => {
		const { focusTree, row, cursor, press, lastData } = setup({ expandedValue: ['player'] });
		await focusTree();
		await press('ArrowDown');
		expect(cursor()).toBe('camera');

		await fireEvent.click(
			row('player').querySelector<HTMLElement>('[data-part="branch-indicator"]')!
		);
		expect(row('player').tabIndex).toBe(0);
		// The press on the caret focuses its row, as in a browser.
		row('player').focus();
		await press('Delete');
		expect(lastData()).toEqual(['light', ['ui', ['hud']]]);
		expect(cursor()).toBe('light');
	});

	it('deletes the whole selection when the cursor is in it', async () => {
		const { click, cursor, press, lastData, onSelectionChange } = setup();
		await click('light');
		await click('ui', { ctrlKey: true });
		await press('Delete');
		expect(lastData()).toEqual([['player', ['camera', 'mesh']]]);
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: [] });
		expect(cursor()).toBe('player');
	});

	it('deletes the cursor object with its children and moves the cursor to the next row', async () => {
		const { click, focusTree, cursor, press, lastData, onSelectionChange } = setup();
		await click('light');
		await focusTree();
		await press('Home');
		await press('Backspace');
		expect(lastData()).toEqual(['light', ['ui', ['hud']]]);
		// Light, selected but not under the cursor, stays.
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['light'] });
		expect(cursor()).toBe('light');
	});

	it('follows a new data after a change of its own', async () => {
		const { focusTree, press, rerender, queryByText, onDataChange } = setup();
		await focusTree();
		await press('ArrowDown', { shiftKey: true });
		expect(onDataChange).toHaveBeenCalledTimes(1);
		await rerender({ data: [{ id: 'cube', name: 'Cube' }] });
		expect(queryByText('Cube')).toBeTruthy();
		expect(queryByText('Player')).toBeNull();
	});

	it('is a tab stop itself only when empty', async () => {
		const empty = setup({ data: [] });
		expect(empty.tree.tabIndex).toBe(0);
		empty.unmount();

		const { tree } = setup();
		expect(tree.tabIndex).toBe(-1);
		expect(tree.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
	});

	describe('drag and drop', () => {
		/** Lays a row out at `top` (20 px high, 200 px wide), for the drop hitbox. */
		function layOut(element: HTMLElement, top: number) {
			element.getBoundingClientRect = () => new DOMRect(0, top, 200, 20);
		}

		it('changes nothing, selection included, when a drag ends without a drop', async () => {
			const { click, row, item, onDataChange, onSelectionChange } = setup();
			await click('player');
			const drag = await startDrag(row('light'), { clientX: 5, clientY: 5 });
			await cancelDrag(row('light'), drag);
			expect(onDataChange).not.toHaveBeenCalled();
			expect(onSelectionChange).toHaveBeenCalledTimes(1);
			expect(item('player').getAttribute('aria-selected')).toBe('true');
			expect(item('light').getAttribute('aria-selected')).toBe('false');
		});

		it('moves a selected parent and child once, inside the row it is dropped on', async () => {
			const { click, row, item, lastData, onSelectionChange } = setup({
				expandedValue: ['player']
			});
			await click('player');
			await click('camera', { ctrlKey: true });

			const drag = await startDrag(row('player'), { clientX: 50, clientY: 5 });
			const image = vi.mocked(drag.setDragImage).mock.calls[0][0];
			expect(image.textContent).toBe('2 objects');

			layOut(row('ui'), 100);
			// 110 is the middle of the row: a drop inside it, drawn around the row.
			await dragOver(row('ui'), { clientX: 50, clientY: 110 }, drag);
			expect(row('ui').querySelector('.ring-2')).not.toBeNull();
			await drop(row('ui'), { clientX: 50, clientY: 110 }, drag);
			expect(lastData()).toEqual(['light', ['ui', ['hud', ['player', ['camera', 'mesh']]]]]);
			// The moved objects stay selected.
			expect(onSelectionChange).toHaveBeenCalledTimes(2);
			expect(item('player').getAttribute('aria-selected')).toBe('true');
			expect(item('camera').getAttribute('aria-selected')).toBe('true');
		});

		it('drops before and after a row on its upper and lower quarters', async () => {
			const { row, lastData } = setup();
			layOut(row('ui'), 100);
			let drag = await startDrag(row('player'), { clientX: 50, clientY: 5 });
			await drop(row('ui'), { clientX: 50, clientY: 102 }, drag);
			expect(lastData()).toEqual(['light', ['player', ['camera', 'mesh']], ['ui', ['hud']]]);

			layOut(row('light'), 0);
			drag = await startDrag(row('ui'), { clientX: 50, clientY: 110 });
			await drop(row('light'), { clientX: 50, clientY: 18 }, drag);
			expect(lastData()).toEqual(['light', ['ui', ['hud']], ['player', ['camera', 'mesh']]]);
		});

		it('drops out of a group from the left of its last row, at the level pointed at', async () => {
			const { row, lastData } = setup({ expandedValue: ['player'] });
			layOut(row('mesh'), 40);
			const drag = await startDrag(row('ui'), { clientX: 50, clientY: 85 });
			// Mesh is level 2, indented by 14 px: 5 px is over its indentation, in the lower half.
			await drop(row('mesh'), { clientX: 5, clientY: 55 }, drag);
			expect(lastData()).toEqual([['player', ['camera', 'mesh']], ['ui', ['hud']], 'light']);
		});

		it('never drops objects into themselves', async () => {
			const { row, onDataChange } = setup({ expandedValue: ['player'] });
			layOut(row('camera'), 20);
			const drag = await startDrag(row('player'), { clientX: 50, clientY: 5 });
			await drop(row('camera'), { clientX: 50, clientY: 30 }, drag);
			expect(onDataChange).not.toHaveBeenCalled();
		});

		it('moves the dragged object to the end of the root when dropped on empty space', async () => {
			const { row, tree, lastData, onSelectionChange } = setup();
			const drag = await startDrag(row('player'), { clientX: 50, clientY: 5 });
			await drop(tree, { clientX: 50, clientY: 300 }, drag);
			expect(lastData()).toEqual(['light', ['ui', ['hud']], ['player', ['camera', 'mesh']]]);
			// The dragged object wasn't selected: it becomes the selection.
			expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['player'] });
		});
	});

	describe('with custom accessors', () => {
		type Entity = { meta: { id: string }; title: string; children?: Entity[] };

		function entities(): Entity[] {
			return [
				{ meta: { id: 'player' }, title: 'Player' },
				{ meta: { id: 'ui' }, title: 'UI', children: [{ meta: { id: 'hud' }, title: 'HUD' }] }
			];
		}

		function titles(nodes: Entity[]): unknown[] {
			return nodes.map((n) => (n.children?.length ? [n.title, titles(n.children)] : n.title));
		}

		function setupEntities() {
			return setup({
				data: entities(),
				nodeToValue: (n) => (n as Entity).meta.id,
				nodeToString: (n) => (n as Entity).title,
				nodeWithName: (n, title) => ({ ...n, title })
			});
		}

		it('renames through nodeWithName', async () => {
			const { focusTree, press, getByRole, getByText, onDataChange } = setupEntities();
			await focusTree();
			await press('F2');
			const input = getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
			expect(input.value).toBe('Player');
			await fireEvent.input(input, { target: { value: 'Hero' } });
			await fireEvent.keyDown(input, { key: 'Enter' });
			expect(titles(onDataChange.mock.lastCall![0])).toEqual(['Hero', ['UI', ['HUD']]]);
			expect(getByText('Hero')).toBeTruthy();
		});

		it('drops inside a row', async () => {
			const { row, onDataChange } = setupEntities();
			row('ui').getBoundingClientRect = () => new DOMRect(0, 100, 200, 20);
			const drag = await startDrag(row('player'), { clientX: 50, clientY: 5 });
			await drop(row('ui'), { clientX: 50, clientY: 110 }, drag);
			expect(titles(onDataChange.mock.lastCall![0])).toEqual([['UI', ['HUD', 'Player']]]);
		});
	});
});
