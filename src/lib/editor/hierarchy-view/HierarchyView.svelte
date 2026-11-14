<!--
@component
The Editor's hierarchy of a scene's objects: a `VirtualTree` (only the rows in view are rendered)
with multiple selection, renaming, deletion, and drag and drop to reparent and reorder.

The tree works on its own copy of `data`, which follows the prop: every change the user makes
(a move, a rename, a deletion) replaces that copy and is reported through `onDataChange`, and a
new `data` from the parent replaces the copy again. Every node's value (`nodeToValue`) must be
unique in the tree. A rename writes the new name with `nodeWithName`, the inverse of
`nodeToString`: an app that reads names from another field passes both.

Mouse: a click selects one object, Ctrl/Cmd+click adds or removes one, Shift+click selects the
range from the first selected object, a double click renames, and a click on empty space clears
the selection. Dragging an object drags the selection (or the object alone, when it isn't
selected): dropped on the upper or lower quarter of a row, the objects go before or after it; on
the rest of the row, inside it as its last children; left of the last row of a group (over its
indentation), after the ancestor at the level pointed at; on the tree's empty space, at the end of
the root. The moved objects end up selected; a drag dropped anywhere else changes nothing, and
objects are never dropped into themselves.

Keyboard: the keys of `VirtualTree` (the arrows, typeahead, F2 renames), and Space or Enter adds
or removes the focused object from the selection (a Space typed inside a name goes to type-to-find),
Delete or Backspace deletes the selection when the focused object is in it and the focused object
otherwise, Escape clears the selection, and Shift+arrows move the focused object up, down, out of
its parent, or into the sibling above it as its last child. When a branch closes over the focused
object, the focus moves to the branch.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { createTreeCollection, type TreeCollection } from '@ark-ui/svelte';
	import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
	import {
		draggable,
		dropTargetForElements,
		monitorForElements
	} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import type { Instruction, ItemMode } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';
	import { attachInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item/attach-instruction';
	import { extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item/extract-instruction';
	import { cn } from '#lib/utils.js';
	import MingcuteFileLine from '~icons/mingcute/file-line';
	import VirtualTree from '../../components/virtual-tree/VirtualTree.svelte';
	import { setTextDragPreview } from '../drag-preview';
	import type { AnyNode } from '.';

	/** The indentation of each level, in pixels: the tree draws it, the drop hitbox reads it. */
	const INDENT = 14;
	const BLOCK_ALL: Instruction['type'][] = [
		'reorder-above',
		'reorder-below',
		'make-child',
		'reparent'
	];

	let {
		class: className = '',
		data,
		nodeToValue = (n: AnyNode) => (n.id ?? n.name ?? '') as string,
		nodeToString = (n: AnyNode) => (n.name ?? n.label ?? '') as string,
		nodeWithName = (n: AnyNode, name: string) => ({ ...n, name }),
		icon,
		label,
		renameLabel,
		dragLabel,
		selectedValue = $bindable<string[]>([]),
		expandedValue = $bindable<string[]>([]),
		onSelectionChange,
		onExpandedChange,
		onDataChange
	}: {
		/** Classes added to the hierarchy's element. */
		class?: string;
		/** The root's children: the objects at the top of the hierarchy. */
		data: AnyNode[];
		/** A node's value, unique in the tree. Defaults to its `id`, then its `name`. */
		nodeToValue?: (node: AnyNode) => string;
		/** A node's displayed name. Defaults to its `name`, then its `label`. */
		nodeToString?: (node: AnyNode) => string;
		/**
		 * A copy of a node with a new displayed name, after a rename: the inverse of `nodeToString`.
		 * Defaults to setting its `name`.
		 */
		nodeWithName?: (node: AnyNode, name: string) => AnyNode;
		/** Replaces a node's icon (a file icon by default). */
		icon?: Snippet<[AnyNode]>;
		/** The tree's accessible name, such as "Scene hierarchy". */
		label: string;
		/** The rename field's accessible name, such as "Name". */
		renameLabel: string;
		/** The drag image's text while several objects are dragged, such as `${count} objects`. */
		dragLabel: (count: number) => string;
		/** The values of the selected objects. */
		selectedValue?: string[];
		/** The values of the open branches. */
		expandedValue?: string[];
		/** Called when the selection changes. */
		onSelectionChange?: (details: { selectedValue: string[] }) => void;
		/** Called when a branch opens or closes. */
		onExpandedChange?: (details: { expandedValue: string[] }) => void;
		/** Called with the root's new children after the user moves, renames or deletes objects. */
		onDataChange?: (data: AnyNode[]) => void;
	} = $props();

	const uid = $props.id();
	/** Tags this hierarchy's drags: its drop targets take nothing else, and other views ignore them. */
	const dragType = `${uid}-objects`;

	let tree = $state<VirtualTree<AnyNode>>();
	// Writable: the user's changes override it until the parent passes a new `data`.
	let treeData = $derived(data);
	/** The objects dragged, dimmed while the drag lasts. */
	let dragging = $state.raw<string[]>([]);
	/** Where the dragged objects would land, drawn on the row under the pointer. */
	let dropTarget = $state.raw<{ value: string; instruction: Instruction } | null>(null);

	const collection = $derived.by(() => {
		const root: AnyNode = { children: treeData };
		return createTreeCollection<AnyNode>({
			rootNode: root,
			nodeToValue: (node) => (node === root ? `${uid}-root` : nodeToValue(node)),
			nodeToString,
			nodeToChildren: (node) => node.children ?? [],
			// A scene object may have a `disabled` field of its own: no row of the hierarchy is disabled.
			isNodeDisabled: () => false
		});
	});

	function setSelection(next: string[]) {
		selectedValue = next;
		onSelectionChange?.({ selectedValue: next });
	}

	function expand(value: string) {
		if (expandedValue.includes(value)) return;
		expandedValue = [...expandedValue, value];
		onExpandedChange?.({ expandedValue });
	}

	/** Replaces the tree with `next` and reports it. */
	function commit(next: TreeCollection<AnyNode>) {
		treeData = next.rootNode.children ?? [];
		onDataChange?.(treeData);
	}

	/** The values among `values` that aren't inside another of them, in tree order. */
	function topmost(values: string[]): string[] {
		const set = new Set(values);
		return collection
			.sort(values)
			.filter((v) => !collection.getParentNodes(v).some((p) => set.has(nodeToValue(p))));
	}

	/** Whether the node `value` is one of `values` or inside one of them. */
	function isWithin(value: string, values: string[]): boolean {
		const path = collection.getValuePath(collection.getIndexPath(value));
		return path.some((v) => values.includes(v));
	}

	/** The index paths of the objects `values` that aren't inside another of them. */
	function topmostPaths(values: string[]): number[][] {
		return topmost(values).flatMap((v) => {
			const path = collection.getIndexPath(v);
			return path ? [path] : [];
		});
	}

	/** Moves the objects `values` (with their children) to `to`, an index path of the tree as it is. */
	function moveTo(values: string[], to: number[]) {
		commit(collection.move(topmostPaths(values), to));
	}

	/**
	 * Shift+arrows: moves the object `value` up or down among its siblings, out of its parent (just
	 * after it), or into the sibling above it (as its last child).
	 */
	function moveWithKey(value: string, key: string) {
		const path = collection.getIndexPath(value);
		if (!path) return;
		const parent = path.slice(0, -1);
		const index = path[path.length - 1];
		const above = index > 0 ? collection.at([...parent, index - 1]) : undefined;
		if (key === 'ArrowUp' && index > 0) moveTo([value], [...parent, index - 1]);
		else if (key === 'ArrowDown' && index < collection.getSiblingNodes(path).length - 1)
			moveTo([value], [...parent, index + 2]);
		else if (key === 'ArrowLeft' && parent.length > 0)
			moveTo([value], [...parent.slice(0, -1), parent[parent.length - 1] + 1]);
		else if (key === 'ArrowRight' && above) {
			moveTo([value], [...parent, index - 1, collection.getNodeChildren(above).length]);
			expand(nodeToValue(above));
		} else return;
		// The moved row's element moves in the page, which loses the focus in some browsers.
		tree?.focus(value);
	}

	/**
	 * Deletes the selection when it holds `focused`, otherwise `focused`, with their children,
	 * and moves the focus to the next row left (or the one before).
	 */
	function deleteFrom(focused: string) {
		const targets = selectedValue.includes(focused) ? selectedValue : [focused];
		const rows = tree?.visibleValues() ?? [];
		const index = rows.indexOf(focused);
		const isLeft = (v: string) => !isWithin(v, targets);
		const next = rows.slice(index + 1).find(isLeft) ?? rows.slice(0, index).findLast(isLeft);
		const kept = selectedValue.filter(isLeft);
		commit(collection.remove(topmostPaths(targets)));
		if (kept.length < selectedValue.length) setSelection(kept);
		if (next !== undefined) tree?.focus(next);
	}

	function toggleSelected(value: string) {
		setSelection(
			selectedValue.includes(value)
				? selectedValue.filter((v) => v !== value)
				: [...selectedValue, value]
		);
	}

	function onKeyDown(event: KeyboardEvent, node: AnyNode) {
		const value = nodeToValue(node);
		if (event.shiftKey && event.key.startsWith('Arrow')) {
			event.preventDefault();
			moveWithKey(value, event.key);
			return;
		}
		switch (event.key) {
			case ' ':
			case 'Enter':
				event.preventDefault();
				toggleSelected(value);
				return;
			case 'Delete':
			case 'Backspace':
				event.preventDefault();
				deleteFrom(value);
				return;
			case 'Escape':
				setSelection([]);
				return;
		}
	}

	function onRename({ indexPath, label: name }: { indexPath: number[]; label: string }) {
		const node = collection.at(indexPath);
		if (node) commit(collection.replace(indexPath, nodeWithName(node, name)));
	}

	/** The objects a drag carries, or null for a drag that isn't this hierarchy's. */
	function draggedValues(data: Record<string | symbol, unknown>): string[] | null {
		return data.type === dragType && Array.isArray(data.values) ? data.values : null;
	}

	/** How a row's hitbox reads the pointer: an open branch takes children, the last of a group lets objects out. */
	function modeOf(path: number[]): ItemMode {
		const node = collection.at(path);
		if (
			node &&
			expandedValue.includes(nodeToValue(node)) &&
			collection.getNodeChildren(node).length > 0
		)
			return 'expanded';
		return path[path.length - 1] === collection.getSiblingNodes(path).length - 1
			? 'last-in-group'
			: 'standard';
	}

	/** Each row drags the selection (or its own object) and takes drops before, after or inside it. */
	function rowDragAndDrop(node: AnyNode): Attachment<HTMLElement> {
		return (element) => {
			const value = nodeToValue(node);
			return combine(
				draggable({
					element,
					canDrag: () => element.dataset.renaming === undefined,
					getInitialData: () => ({
						type: dragType,
						values: selectedValue.includes(value) ? collection.sort(selectedValue) : [value]
					}),
					onGenerateDragPreview: ({ nativeSetDragImage, source }) => {
						const values = draggedValues(source.data) ?? [];
						setTextDragPreview(
							nativeSetDragImage,
							values.length === 1 ? nodeToString(node) : dragLabel(values.length)
						);
					},
					onDragStart: ({ source }) => (dragging = draggedValues(source.data) ?? [])
				}),
				dropTargetForElements({
					element,
					canDrop: ({ source }) => draggedValues(source.data) !== null,
					getData: ({ input, element, source }) => {
						const path = collection.getIndexPath(value) ?? [];
						return attachInstruction(
							{ value },
							{
								input,
								element,
								currentLevel: path.length - 1,
								indentPerLevel: INDENT,
								mode: modeOf(path),
								// Never into a dragged object: it would become its own descendant.
								block: isWithin(value, draggedValues(source.data) ?? []) ? BLOCK_ALL : []
							}
						);
					},
					onDrag: ({ self }) => {
						const instruction = extractInstruction(self.data);
						if (dropTarget?.value === value && dropTarget.instruction === instruction) return;
						dropTarget = instruction ? { value, instruction } : null;
					},
					onDragLeave: () => {
						if (dropTarget?.value === value) dropTarget = null;
					}
				})
			);
		};
	}

	/** Where a drop on the row of `value` puts the objects, as an index path of the tree as it is. */
	function destination(value: string, instruction: Instruction): number[] | null {
		const path = collection.getIndexPath(value);
		if (!path) return null;
		const after = (p: number[]) => [...p.slice(0, -1), p[p.length - 1] + 1];
		switch (instruction.type) {
			case 'reorder-above':
				return path;
			case 'reorder-below':
				return after(path);
			case 'make-child':
				return [...path, collection.at(path)?.children?.length ?? 0];
			case 'reparent':
				return after(path.slice(0, instruction.desiredLevel + 1));
			case 'instruction-blocked':
				return null;
		}
	}

	/** Moves the dropped objects where the innermost target says, and selects them. */
	function onDrop(values: string[], target: Record<string | symbol, unknown> | undefined) {
		if (!target) return;
		const instruction = extractInstruction(target);
		const value = typeof target.value === 'string' ? target.value : null;
		let to: number[] | null = [treeData.length];
		if (instruction && value !== null) {
			to = destination(value, instruction);
			if (to && instruction.type === 'make-child') expand(value);
		}
		if (!to) return;
		moveTo(values, to);
		if (values.some((v) => !selectedValue.includes(v))) setSelection(values);
	}

	/** The tree's empty space takes drops at the end of the root; the monitor ends every drag. */
	function treeDragAndDrop(element: HTMLElement) {
		return combine(
			dropTargetForElements({
				element,
				canDrop: ({ source }) => draggedValues(source.data) !== null
			}),
			monitorForElements({
				canMonitor: ({ source }) => draggedValues(source.data) !== null,
				onDrop: ({ source, location }) => {
					dragging = [];
					dropTarget = null;
					const values = draggedValues(source.data);
					if (values) onDrop(values, location.current.dropTargets[0]?.data);
				}
			})
		);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (a click here lands on the empty space, the rows take theirs: Escape is its keyboard equivalent) -->
<div
	{@attach treeDragAndDrop}
	data-slot="hierarchy-view"
	class={cn('size-full', className)}
	onclick={() => setSelection([])}
>
	<VirtualTree
		bind:this={tree}
		{collection}
		{label}
		bind:selectedValue
		bind:expandedValue
		multiple
		indent={INDENT}
		rename={{ canRename: () => true, label: renameLabel, onRename }}
		onSelectionChange={(details) => onSelectionChange?.({ selectedValue: details.selectedValue })}
		onExpandedChange={(details) => onExpandedChange?.({ expandedValue: details.expandedValue })}
		onActivate={(node) => tree?.startRenaming(nodeToValue(node))}
		{onKeyDown}
		attachRow={rowDragAndDrop}
		class="size-full"
	>
		{#snippet row(node, state)}
			<span
				class={[
					'flex min-w-0 items-center gap-1.5',
					!state.renaming && 'flex-1',
					dragging.includes(state.value) && 'opacity-50'
				]}
			>
				{#if icon}
					{@render icon(node)}
				{:else}
					<MingcuteFileLine class="size-4 shrink-0 text-muted" aria-hidden="true" />
				{/if}
				{#if !state.renaming}
					<span class="truncate">{nodeToString(node)}</span>
				{/if}
			</span>
			{#if dropTarget?.value === state.value}
				{@render dropIndicator(dropTarget.instruction, state.depth)}
			{/if}
		{/snippet}
	</VirtualTree>
</div>

{#snippet dropIndicator(instruction: Instruction, depth: number)}
	{#if instruction.type === 'make-child'}
		<span
			class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-primary ring-inset"
			aria-hidden="true"
		></span>
	{:else if instruction.type !== 'instruction-blocked'}
		<span
			class={[
				'pointer-events-none absolute right-0 h-0.5 rounded-full bg-primary',
				instruction.type === 'reorder-above' ? 'top-0' : 'bottom-0'
			]}
			style:left="{(instruction.type === 'reparent' ? instruction.desiredLevel : depth - 1) *
				INDENT}px"
			aria-hidden="true"
		></span>
	{/if}
{/snippet}
