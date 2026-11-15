<!--
@component
A tree of files and folders, with expandable folders and custom icons: a `VirtualTree`, so only
the rows in view are rendered. The rows are read through the collection: its branches (nodes with
children or a `childrenCount`) are the folders, and its `nodeToString` names each row.

Only files are selected: a click selects one, Ctrl/Cmd+click adds or removes one, Shift+click
selects the range from the first selected file; on the keyboard, the arrows move between rows and
open and close folders, typing a name moves to it, Enter or Space selects the file, and
Shift+arrows extend the selection. A click, Enter or Space on a folder opens or closes it and
leaves the selection as it is.
-->
<script lang="ts">
	import type { TreeCollection, TreeNode } from '@ark-ui/svelte';
	import type { Snippet } from 'svelte';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteFolderOpenLine from '~icons/mingcute/folder-open-line';
	import MingcuteFileLine from '~icons/mingcute/file-line';
	import VirtualTree from '../../components/virtual-tree/VirtualTree.svelte';

	let {
		class: className = '',
		collection,
		label,
		icon,
		selectedValue = $bindable<string[]>([]),
		expandedValue = $bindable<string[]>([]),
		focusedValue = $bindable<string | null>(null),
		onSelectionChange,
		onExpandedChange,
		onFocusChange
	}: {
		/** Classes added to the tree's element. */
		class?: string;
		/** The files and folders, from `createTreeCollection` or `createFileTreeCollection`. */
		collection: TreeCollection<TreeNode>;
		/** The tree's accessible name, such as "Project files". */
		label: string;
		/** Replaces a node's icon (a folder or a file icon by default). */
		icon?: Snippet<[TreeNode]>;
		/** The values of the selected files. */
		selectedValue?: string[];
		/** The values of the open folders. */
		expandedValue?: string[];
		/** The value of the row that has the keyboard focus. */
		focusedValue?: string | null;
		/** Called when the selection changes. */
		onSelectionChange?: (details: { selectedValue: string[] }) => void;
		/** Called when a folder opens or closes. */
		onExpandedChange?: (details: { expandedValue: string[] }) => void;
		/** Called when the keyboard focus moves to another row. */
		onFocusChange?: (details: { focusedValue: string | null }) => void;
	} = $props();

	let tree = $state<VirtualTree<TreeNode>>();

	function isFile(value: string): boolean {
		const node = collection.findNode(value);
		return node !== undefined && !collection.isBranchNode(node);
	}

	/** Takes the selection the tree computes, without its folders. */
	function selectFiles(next: string[]) {
		const files = next.filter(isFile);
		// A selection of folders only is a click on a folder: it opens or closes, nothing more.
		if (files.length === 0 && next.length > 0) return;
		selectedValue = files;
		onSelectionChange?.({ selectedValue: files });
	}

	/**
	 * Shift+up and Shift+down, handled here rather than by the tree, which adds or removes one row
	 * at a time and so, with the folders left out, can't shrink the selection back across one. The
	 * focus moves to the row above or below, and the selection becomes the files from the anchor
	 * (the first selected file, or the row the move starts from) to that row.
	 */
	function onKeyDown(event: KeyboardEvent, node: TreeNode) {
		if (!event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
		event.preventDefault();
		const from = collection.getNodeValue(node);
		const visible = (tree?.visibleValues() ?? []).filter(
			(v) => v === from || !collection.getNodeDisabled(collection.findNode(v))
		);
		const index = visible.indexOf(from);
		const to = visible[event.key === 'ArrowUp' ? index - 1 : index + 1];
		if (to === undefined) return;
		const anchor = visible.includes(selectedValue[0]) ? selectedValue[0] : from;
		const [start, end] = [visible.indexOf(anchor), visible.indexOf(to)].sort((a, b) => a - b);
		const range = visible.slice(start, end + 1);
		selectFiles([anchor, ...range.filter((v) => v !== anchor)]);
		tree?.focus(to);
	}
</script>

<VirtualTree
	bind:this={tree}
	{collection}
	{label}
	bind:selectedValue={() => selectedValue, selectFiles}
	bind:expandedValue
	bind:focusedValue
	multiple
	expandOnClick
	{onKeyDown}
	{onExpandedChange}
	{onFocusChange}
	class={className}
>
	{#snippet row(node, state)}
		{#if icon}
			{@render icon(node)}
		{:else if !state.isBranch}
			<MingcuteFileLine class="size-4 shrink-0 text-muted" aria-hidden="true" />
		{:else if state.expanded}
			<MingcuteFolderOpenLine class="size-4 shrink-0 text-primary" aria-hidden="true" />
		{:else}
			<MingcuteFolder2Line class="size-4 shrink-0 text-primary" aria-hidden="true" />
		{/if}
		<span class="truncate">{collection.stringifyNode(node)}</span>
	{/snippet}
</VirtualTree>
