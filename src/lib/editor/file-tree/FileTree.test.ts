/**
 * Tests of `FileTree`: the tree's name, selecting files with the pointer and the keyboard, folders
 * that open and close without changing the selection, Shift+arrows across folders, and rows read
 * through the collection.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import { createTreeCollection } from '@ark-ui/svelte';
import FileTree from './FileTree.svelte';

type Node = { id: string; name: string; children?: Node[] };

/** src (app.ts, lib.ts), package.json; src open. */
function files() {
	return createTreeCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'src',
					name: 'src',
					children: [
						{ id: 'app', name: 'app.ts' },
						{ id: 'lib', name: 'lib.ts' }
					]
				},
				{ id: 'package', name: 'package.json' }
			]
		}
	});
}

function setup() {
	const onSelectionChange = vi.fn();
	const onExpandedChange = vi.fn();
	const result = render(FileTree, {
		collection: files(),
		label: 'Project files',
		expandedValue: ['src'],
		onSelectionChange,
		onExpandedChange
	});
	const row = (value: string) => {
		const element = result.container.querySelector<HTMLElement>(
			`[data-part="item"][data-value="${value}"], [data-part="branch-control"][data-value="${value}"]`
		);
		if (!element) throw new Error(`no row ${value}`);
		return element;
	};
	return { ...result, row, onSelectionChange, onExpandedChange };
}

describe('FileTree', () => {
	it('is named by its label', () => {
		const { getByRole } = setup();
		// Ark's own English name is replaced too, not only overridden by the label element.
		expect(getByRole('tree', { name: 'Project files' }).getAttribute('aria-label')).toBe(
			'Project files'
		);
	});

	it('selects one file, adds with Ctrl, and ranges with Shift', async () => {
		const { row, onSelectionChange } = setup();
		await fireEvent.click(row('app'));
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['app'] });
		expect(row('app').getAttribute('aria-selected')).toBe('true');

		await fireEvent.click(row('package'));
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['package'] });

		await fireEvent.click(row('lib'), { ctrlKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['package', 'lib'] });

		await fireEvent.click(row('package'), { ctrlKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['lib'] });

		// From lib.ts, the first selected file, to package.json.
		await fireEvent.click(row('package'), { shiftKey: true });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['lib', 'package'] });
	});

	it('opens and closes a folder on click and keeps the selection', async () => {
		const { row, onSelectionChange, onExpandedChange } = setup();
		await fireEvent.click(row('app'));
		await fireEvent.click(row('src'));
		expect(onExpandedChange).toHaveBeenLastCalledWith(
			expect.objectContaining({ expandedValue: [] })
		);
		await fireEvent.click(row('src'));
		expect(onExpandedChange).toHaveBeenLastCalledWith(
			expect.objectContaining({ expandedValue: ['src'] })
		);
		expect(onSelectionChange).toHaveBeenCalledTimes(1);
		expect(row('app').getAttribute('aria-selected')).toBe('true');
	});

	it('selects the focused file with Enter', async () => {
		const { row, onSelectionChange } = setup();
		row('lib').focus();
		await fireEvent.keyDown(row('lib'), { key: 'Enter' });
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['lib'] });
		expect(row('lib').getAttribute('aria-selected')).toBe('true');
	});

	it('extends the selection with Shift+arrows, and shrinks it back across a folder', async () => {
		const collection = createTreeCollection<Node>({
			nodeToValue: (node) => node.id,
			nodeToString: (node) => node.name,
			rootNode: {
				id: 'root',
				name: '',
				children: [
					{ id: 'readme', name: 'README.md' },
					{ id: 'src', name: 'src', children: [{ id: 'app', name: 'app.ts' }] },
					{ id: 'package', name: 'package.json' }
				]
			}
		});
		const onSelectionChange = vi.fn();
		const { container } = render(FileTree, {
			collection,
			label: 'Project files',
			expandedValue: ['src'],
			onSelectionChange
		});
		const row = (value: string) =>
			container.querySelector<HTMLElement>(
				`[data-value="${value}"]:is([data-part="item"], [data-part="branch-control"])`
			)!;
		const shift = async (from: string, key: 'ArrowUp' | 'ArrowDown', to: string) => {
			await fireEvent.keyDown(row(from), { key, shiftKey: true });
			expect(document.activeElement).toBe(row(to));
		};

		await fireEvent.click(row('readme'));
		row('readme').focus();
		await shift('readme', 'ArrowDown', 'src');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['readme'] });
		await shift('src', 'ArrowDown', 'app');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['readme', 'app'] });
		await shift('app', 'ArrowDown', 'package');
		expect(onSelectionChange).toHaveBeenLastCalledWith({
			selectedValue: ['readme', 'app', 'package']
		});
		await shift('package', 'ArrowUp', 'app');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['readme', 'app'] });
		await shift('app', 'ArrowUp', 'src');
		expect(onSelectionChange).toHaveBeenLastCalledWith({ selectedValue: ['readme'] });
		expect(row('app').getAttribute('aria-selected')).toBe('false');
	});

	it("reads names, children and lazy folders through the collection's accessors", () => {
		type Entry = { key: string; title: string; items?: Entry[]; childrenCount?: number };
		const collection = createTreeCollection<Entry>({
			nodeToValue: (node) => node.key,
			nodeToString: (node) => node.title,
			nodeToChildren: (node) => node.items ?? [],
			rootNode: {
				key: 'root',
				title: '',
				items: [
					{ key: 'docs', title: 'docs', items: [{ key: 'guide', title: 'guide.md' }] },
					{ key: 'remote', title: 'remote', childrenCount: 2 },
					{ key: 'readme', title: 'README.md' }
				]
			}
		});
		const { container, getByText } = render(FileTree, {
			collection,
			label: 'Project files',
			expandedValue: ['docs']
		});
		const parts = (part: string) =>
			[...container.querySelectorAll(`[data-part="${part}"]`)].map((element) =>
				element.getAttribute('data-value')
			);
		expect(parts('branch-control')).toEqual(['docs', 'remote']);
		expect(parts('item')).toEqual(['guide', 'readme']);
		expect(getByText('guide.md')).toBeTruthy();
		expect(getByText('README.md')).toBeTruthy();
	});
});
