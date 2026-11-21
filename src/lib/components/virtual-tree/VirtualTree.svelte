<!--
@component
A virtualised tree (WAI-ARIA tree view, on Ark UI's TreeView): only the rows in view are
rendered, so a hierarchy of any size stays fast. Every row has the same height. The nodes come
from a `collection` (`createTreeCollection`); the open branches, the selection and the focused
node are bound by value.

Keyboard (Ark's, but type-to-find, which is the tree's own): the focused row is the tree's one
tab stop; Up and Down move, Home and End jump, Right opens a branch or enters it, Left closes it or
goes to the parent, `*` opens the siblings, typing a name moves to the next row that starts with
it (Space included, while typing), Enter or Space selects the focused node, and F2 renames it when
`rename` allows. Enter also calls `onActivate`, as a double click does. With `multiple`, Ctrl or
Cmd+click adds or removes a node, Shift+click selects the range from the first selected node, and
Shift with the arrows, Home or End extends the selection. Moving the focus scrolls its row into
view, and the focused row stays rendered while scrolled out, so the focus is never lost; when a
branch closes over it, the tab stop moves to that branch.

`row` renders a row's content (icon, name, badges) from the node and its state; the tree draws
the indentation, the disclosure caret, the selection (a tinted background, nothing more), and the
rename field, after `row`, while the node is renamed (`row` leaves the name out then:
`state.renaming`).
-->
<script lang="ts" generics="T extends TreeNode">
	import { flushSync, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		useTreeView,
		type TreeCollection,
		type TreeNode,
		type TreeViewExpandedChangeDetails,
		type TreeViewFocusChangeDetails,
		type TreeViewNodeState,
		type TreeViewRenameCompleteDetails,
		type TreeViewSelectionChangeDetails
	} from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteRightFill from '~icons/mingcute/right-fill';
	import VirtualList from '../virtual-list/VirtualList.svelte';

	/** A row of the tree: a node on screen and its place in the collection. */
	type Entry = { node: T; indexPath: number[] };

	let {
		collection,
		label,
		row,
		expandedValue = $bindable([]),
		selectedValue = $bindable([]),
		focusedValue = $bindable(null),
		multiple = false,
		expandOnClick = false,
		itemHeight = 26,
		indent = 14,
		rename,
		onActivate,
		onKeyDown,
		attachRow,
		onExpandedChange,
		onSelectionChange,
		onFocusChange,
		class: className = ''
	}: {
		/** The nodes, from `createTreeCollection`: its root's children are the top-level rows. */
		collection: TreeCollection<T>;
		/** The tree's accessible name. */
		label: string;
		/** A row's content, from its node and its state (depth, expanded, selected, renaming…). */
		row: Snippet<[T, TreeViewNodeState]>;
		/** The values of the open branches. */
		expandedValue?: string[];
		/** The values of the selected nodes. */
		selectedValue?: string[];
		/** The value of the focused node; null before the tree is first focused. */
		focusedValue?: string | null;
		/** Allows selecting several nodes. */
		multiple?: boolean;
		/** Whether a click on a branch also opens or closes it (its caret always does). */
		expandOnClick?: boolean;
		/** The height of every row, in pixels. */
		itemHeight?: number;
		/** The indentation of each level, in pixels. */
		indent?: number;
		/**
		 * Renaming, with F2 and `startRenaming`: which nodes can be renamed, the rename field's
		 * accessible name, and what to do with a new name (trimmed, never empty).
		 */
		rename?: {
			canRename: (node: T) => boolean;
			label: string;
			onRename: (details: TreeViewRenameCompleteDetails) => void;
		};
		/** Called when a node is activated: Enter, or a double click. */
		onActivate?: (node: T) => void;
		/**
		 * Called on a key press on a row, before the tree handles it: `event.preventDefault()`
		 * keeps the tree from handling it, so a caller can give a key its own meaning. The characters
		 * type-to-find takes never reach it.
		 */
		onKeyDown?: (event: KeyboardEvent, node: T) => void;
		/** An attachment for each row's element (the focusable one), such as drag and drop. */
		attachRow?: (node: T) => Attachment<HTMLElement>;
		/** Called when a branch opens or closes. */
		onExpandedChange?: (details: TreeViewExpandedChangeDetails<T>) => void;
		/** Called when the user changes the selection. */
		onSelectionChange?: (details: TreeViewSelectionChangeDetails<T>) => void;
		/** Called when the focus moves to another row. */
		onFocusChange?: (details: TreeViewFocusChangeDetails<T>) => void;
		/** Classes merged onto the tree's scrolling element. */
		class?: string;
	} = $props();

	const uid = $props.id();
	let list = $state<VirtualList<Entry>>();

	/**
	 * The focused node, or the nearest branch above it when a closed branch hides it, so a row on
	 * screen always holds the tab stop; null when the node is gone (the first row holds it then).
	 */
	const shownFocus = $derived.by(() => {
		if (focusedValue === null) return null;
		const path = collection.getValuePath(collection.getIndexPath(focusedValue));
		return path.find((value, i) => i === path.length - 1 || !expandedValue.includes(value)) ?? null;
	});

	const api = useTreeView<T>(() => ({
		id: uid,
		collection,
		selectionMode: multiple ? 'multiple' : 'single',
		expandOnClick,
		expandedValue,
		selectedValue,
		focusedValue: shownFocus,
		translations: { treeLabel: label, renameInputLabel: rename?.label },
		canRename: rename?.canRename,
		onRenameComplete: rename?.onRename,
		scrollToIndexFn: ({ index }) => list?.scrollToIndex(index),
		onExpandedChange: (details) => {
			expandedValue = details.expandedValue;
			onExpandedChange?.(details);
		},
		onSelectionChange: (details) => {
			selectedValue = details.selectedValue;
			onSelectionChange?.(details);
		},
		onFocusChange: (details) => {
			focusedValue = details.focusedValue;
			onFocusChange?.(details);
		}
	}));

	const visible = $derived(api().getVisibleNodes());
	const focusIndex = $derived(
		shownFocus === null
			? 0
			: visible.findIndex((entry) => collection.getNodeValue(entry.node) === shownFocus)
	);

	/** The values of the rows on screen (every branch above them open), top to bottom. */
	export function visibleValues(): string[] {
		return visible.map((entry) => collection.getNodeValue(entry.node));
	}

	/** Scrolls the row of `value` into view and focuses it; nothing when the row isn't on screen. */
	export function focus(value: string): void {
		const index = visibleValues().indexOf(value);
		if (index === -1) return;
		list?.scrollToIndex(index);
		// Renders the row now, so it exists to take the focus.
		flushSync();
		api().focus(value);
	}

	/** Opens the rename field of the node `value`, when `rename` is set. */
	export function startRenaming(value: string): void {
		if (rename) api().startRenaming(value);
	}

	/** How long type-to-find waits for the next character before starting over (zag's own value). */
	const TYPEAHEAD_TIMEOUT_MS = 350;
	let typed = { text: '', at: Number.NEGATIVE_INFINITY };

	/**
	 * Type-to-find, kept here rather than in zag, whose tree reads whether a search is under way
	 * from a snapshot that isn't refreshed while the focus stays put: a Space typed in a name could
	 * then select the row as Enter does. The WAI-ARIA rule: characters typed in quick succession
	 * (Space included) find the next row whose name starts with them, from the focused one; the same
	 * character repeated cycles through the rows that start with it. Returns whether the key was
	 * taken. Its `preventDefault` is what keeps zag's own type-to-find (which can't be turned off)
	 * from running, so it takes every character zag would, but `*` and a Space that starts no search.
	 */
	function typeAhead(event: KeyboardEvent, node: T): boolean {
		const isCharacter = event.key.length === 1 && !event.ctrlKey && !event.metaKey;
		// `*` opens the siblings, and a Space starts no search: both stay keys of the tree.
		const isSearching = event.timeStamp - typed.at < TYPEAHEAD_TIMEOUT_MS;
		if (!isCharacter || event.key === '*' || (event.key === ' ' && !isSearching)) return false;
		event.preventDefault();
		typed = { text: (isSearching ? typed.text : '') + event.key, at: event.timeStamp };
		const query = typed.text.toLocaleLowerCase();
		const isRepeat = [...query].every((character) => character === query[0]);
		const search = isRepeat ? query[0] : query;
		const values = visibleValues();
		const from = values.indexOf(collection.getNodeValue(node)) + (isRepeat ? 1 : 0);
		const match = [...visible.slice(from), ...visible.slice(0, from)].find((entry) =>
			collection.stringifyNode(entry.node).toLocaleLowerCase().startsWith(search)
		);
		if (match) focus(collection.getNodeValue(match.node));
		return true;
	}

	function onRowKeyDown(event: KeyboardEvent, node: T) {
		if (event.target !== event.currentTarget) return;
		if (typeAhead(event, node)) return;
		onKeyDown?.(event, node);
		if (!event.defaultPrevented && event.key === 'Enter') onActivate?.(node);
	}

	/** Blank keeps the old name. */
	function onRenameBlur(event: FocusEvent & { currentTarget: HTMLInputElement }, entry: Entry) {
		if (event.currentTarget.value.trim() === '') api().cancelRenaming();
		else api().getNodeRenameInputProps(entry).onfocusout?.(event);
		// Ark gives the focus back to the row on the way out, which would take it from wherever the
		// user moved it (another panel, a field): give it to that element again.
		if (event.relatedTarget instanceof HTMLElement) event.relatedTarget.focus();
	}
</script>

<VirtualList
	bind:this={list}
	{...api().getTreeProps()}
	aria-labelledby={undefined}
	items={visible}
	{itemHeight}
	key={(entry) => collection.getNodeValue(entry.node)}
	keepIndex={focusIndex >= 0 && visible.length > 0 ? focusIndex : undefined}
	tabindex={visible.length === 0 ? 0 : -1}
	class={cn('rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
	data-slot="virtual-tree"
>
	{#snippet row(entry)}
		{@const state = api().getNodeState(entry)}
		{@const position = {
			'aria-posinset': entry.indexPath[entry.indexPath.length - 1] + 1,
			'aria-setsize': collection.getSiblingNodes(entry.indexPath).length
		}}
		{#if state.isBranch}
			<!-- A flat virtual list has no nested groups, so a branch is one element: the treeitem that
			     takes the focus, with its states, and the control zag's keyboard handling looks for. -->
			{@render rowElement(entry, state, {
				...api().getBranchProps(entry),
				...api().getBranchControlProps(entry),
				role: 'treeitem',
				...position
			})}
		{:else}
			{@render rowElement(entry, state, { ...api().getItemProps(entry), ...position })}
		{/if}
	{/snippet}
</VirtualList>

{#snippet rowElement(entry: Entry, state: TreeViewNodeState, props: HTMLAttributes<HTMLElement>)}
	<div
		{...props}
		{@attach attachRow?.(entry.node)}
		class="relative flex h-full cursor-default items-center gap-1.5 rounded-md pr-2 text-sm whitespace-nowrap text-fg-2 outline-none hover:bg-hover focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset data-selected:bg-primary-subtle data-selected:text-fg"
		style:padding-left="{(state.depth - 1) * indent + 4}px"
		onkeydown={(event) => onRowKeyDown(event, entry.node)}
		ondblclick={() => onActivate?.(entry.node)}
	>
		{#if state.isBranch}
			<!-- Pointer only: the arrows open and close branches, and the row says whether it is open. -->
			<span
				{...api().getBranchIndicatorProps(entry)}
				onclick={(event) => {
					// The click opens or closes the branch only, without selecting its row.
					event.stopPropagation();
					if (state.expanded) api().collapse([state.value]);
					else api().expand([state.value]);
				}}
				class="grid size-4 shrink-0 place-items-center text-faint transition-transform data-[state=open]:rotate-90"
			>
				<MingcuteRightFill class="size-3" />
			</span>
		{:else}
			<span class="size-4 shrink-0" aria-hidden="true"></span>
		{/if}
		{@render row(entry.node, state)}
		{#if rename && state.renaming}
			<input
				{...api().getNodeRenameInputProps(entry)}
				onfocusout={(event) => onRenameBlur(event, entry)}
				onclick={(event) => {
					// A click that places the caret must not reach the row, which would select only it.
					event.stopPropagation();
				}}
				ondblclick={(event) => {
					// A double click that selects a word must not activate the row being renamed.
					event.stopPropagation();
				}}
				class="min-w-0 flex-1 rounded-sm bg-transparent px-0.5 text-fg outline outline-primary"
			/>
		{/if}
	</div>
{/snippet}
