<!--
@component
The inside of the `CommandPalette`: the search field and the matching commands, an Ark combobox
(`useCombobox`) whose list is a `VirtualList`. Ark gives the field its combobox role and ARIA, and
drives the highlighted command from the keyboard (Up, Down, Home, End; Enter runs it) and the
pointer, skipping disabled commands; its `scrollToIndexFn` scrolls the virtual window, which keeps
the highlighted row rendered so `aria-activedescendant` always names an element. Escape is left to
the dialog (the combobox registers no dismissable layer of its own), so it closes the palette at
once. A press on the list is cancelled, so a click runs a command without taking the focus from
the field. A command is highlighted whenever one can be: the first enabled one when the search
changes, or when the one chosen is filtered out. The component is mounted each time the palette
opens (the dialog unmounts its content on close), so every opening starts with an empty search.
-->
<script lang="ts">
	import { createListCollection, useCombobox } from '@ark-ui/svelte/combobox';
	import { useFilter } from '@ark-ui/svelte/locale';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import VirtualList from '../virtual-list/VirtualList.svelte';
	import Kbd from '../kbd/Kbd.svelte';
	import { createCommandSearch, type Command } from './filter';

	let {
		commands,
		onRun,
		label,
		placeholder,
		emptyText
	}: {
		/** Every command the palette offers, filtered by the search. */
		commands: readonly Command[];
		/** Runs the chosen command, which closes the palette. */
		onRun: (command: Command) => void;
		/** The accessible name of the search field and of the list of results. */
		label: string;
		/** The search field's placeholder. */
		placeholder: string;
		/** The text shown, and announced, when no command matches. */
		emptyText: string;
	} = $props();

	const ROW_HEIGHT = 34;
	const uid = $props.id();
	const filter = useFilter({ sensitivity: 'base' });
	let query = $state('');
	// The command the keyboard or the pointer moved to; null once Ark clears it (the search
	// changed), and then the first enabled command stands in for it.
	let chosen = $state<string | null>(null);
	let list = $state<VirtualList<Command>>();

	const search = $derived(createCommandSearch(commands));
	const results = $derived(search(query, filter()));
	const collection = $derived(
		createListCollection({
			items: results,
			itemToValue: (command) => command.id,
			itemToString: (command) => command.label,
			isItemDisabled: (command) => command.disabled === true
		})
	);
	const highlighted = $derived(
		chosen !== null && collection.has(chosen) ? chosen : collection.firstValue
	);

	const combobox = useCombobox(() => ({
		id: uid,
		collection,
		open: results.length > 0,
		inputValue: query,
		// Ark scrolls the list back to its top as the search changes.
		onInputValueChange: (details) => (query = details.inputValue),
		highlightedValue: highlighted,
		onHighlightChange: (details) => (chosen = details.highlightedValue),
		// Choosing a command runs it; it never becomes a selected value (nor fills the field).
		value: [],
		onSelect: (details) => {
			const command = collection.find(details.itemValue);
			if (command) onRun(command);
		},
		closeOnSelect: false,
		selectionBehavior: 'preserve',
		loopFocus: false,
		// The dialog is the only dismissable layer: Escape closes it at once, and the list
		// collapsing when nothing matches must not dismiss it.
		disableLayer: true,
		scrollToIndexFn: ({ index }) => list?.scrollToIndex(index),
		// The palette announces its empty text itself, below; Ark's own announcements would be in
		// English. A command is never a selected value, so the one the keyboard moves to is
		// announced, on Apple devices, by its label.
		translations: {
			resultsCount: () => '',
			noResults: '',
			loading: '',
			highlightedItem: ({ label }) => label
		}
	}));
</script>

<div class="flex h-9 items-center gap-2 px-2.5 text-muted [&_svg]:size-4">
	<MingcuteSearchLine aria-hidden="true" />
	<input
		{...combobox().getInputProps()}
		{placeholder}
		aria-label={label}
		class="min-w-0 flex-1 bg-transparent text-md text-fg outline-none placeholder:text-muted"
	/>
</div>
<div class="-mx-1.5 mt-0.5 mb-1.5 h-px bg-border"></div>
<!-- Always in the page, so screen readers announce the text when it appears. -->
<div role="status">
	{#if results.length === 0}
		<p class="px-3 py-2 text-sm text-muted">{emptyText}</p>
	{/if}
</div>
<VirtualList
	bind:this={list}
	{...combobox().getContentProps()}
	items={results}
	itemHeight={ROW_HEIGHT}
	key={(command) => command.id}
	keepIndex={collection.indexOf(highlighted)}
	aria-labelledby={undefined}
	aria-label={label}
	onmousedown={(event) => event.preventDefault()}
	class="max-h-105 outline-none"
	style="height: {Math.min(results.length * ROW_HEIGHT, 420)}px"
>
	{#snippet row(command, index)}
		<div
			{...combobox().getItemProps({ item: command, persistFocus: true })}
			aria-posinset={index + 1}
			aria-setsize={results.length}
			class="flex h-full cursor-default items-center gap-2.5 rounded-md px-3 text-sm text-fg-2 data-disabled:opacity-45 data-highlighted:bg-primary-subtle data-highlighted:text-fg"
		>
			<span class="min-w-0 truncate">{command.label}</span>
			{#if command.group}
				<span class="shrink-0 text-xs text-muted">{command.group}</span>
			{/if}
			{#if command.shortcut}
				<Kbd class="ml-auto">{command.shortcut}</Kbd>
			{/if}
		</div>
	{/snippet}
</VirtualList>
