<!--
@component
A list of options to choose one or several from (Ark Listbox), named by its `label`; `value`
binds the chosen options.
-->
<script lang="ts" module>
	/** One option of a `Listbox`. */
	export interface ListboxOption {
		/** Its text, translated. */
		label: string;
		/** Its stable id, what `value` holds. */
		value: string;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Listbox, createListCollection, type ListboxValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		deselectable,
		class: className = '',
		label,
		items = [],
		renderItem,
		value = $bindable([]),
		onValueChange,
		...rest
	}: {
		/** Whether choosing the chosen option again unchooses it. */
		deselectable?: boolean;
		/** Classes merged onto the root. */
		class?: string;
		/** The visible label, which names the list. */
		label: string;
		/** The options, in the order shown. */
		items?: readonly ListboxOption[];
		/** Draws an option, instead of its `label`. */
		renderItem?: Snippet<[ListboxOption]>;
		/** The chosen options' values (bindable). */
		value?: string[];
		/** Called with the new choice when it changes. */
		onValueChange?: (details: ListboxValueChangeDetails<ListboxOption>) => void;
		/** Other props of Ark's `Listbox.Root`, such as `selectionMode="multiple"` or `disabled`. */
		[key: string]: unknown;
	} = $props();

	const collection = $derived(createListCollection({ items }));
</script>

<Listbox.Root
	{collection}
	{deselectable}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="listbox"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	<Listbox.Label class="text-sm font-medium text-fg">{label}</Listbox.Label>
	<Listbox.Content
		class="max-h-60 overflow-auto rounded-xl border border-border bg-raised p-1 shadow-lg"
	>
		{#each items as item (item.value)}
			<Listbox.Item
				{item}
				class="relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-hover data-highlighted:bg-hover data-[state=checked]:bg-primary-subtle data-[state=checked]:text-primary"
				data-slot="listbox-item"
			>
				<Listbox.ItemText>
					{#if renderItem}
						{@render renderItem(item)}
					{:else}
						{item.label}
					{/if}
				</Listbox.ItemText>
				<Listbox.ItemIndicator class="ml-auto">
					<MingcuteCheckLine class="size-4 text-primary" aria-hidden="true" />
				</Listbox.ItemIndicator>
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox.Root>
