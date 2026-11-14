<!--
@component
A row of toggles of which one or several stay pressed (Ark ToggleGroup); `value` binds the
pressed items' values. The group takes its accessible name through `aria-label`, and an item
whose content is only an icon through its `label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	/** One toggle of the group. */
	interface ToggleItem {
		/** The item's stable, unique value. */
		value: string;
		/** Its content: an icon, a label, or both. */
		content: Snippet;
		/** Its accessible name, translated: needed when the content is only an icon. */
		label?: string;
	}

	let {
		items = [],
		class: className = '',
		value = $bindable([]),
		...rest
	}: {
		/** The toggles, in order. */
		items?: ToggleItem[];
		/** Classes merged onto Ark's `ToggleGroup.Root`. */
		class?: string;
		/** The pressed items' values (bindable). */
		value?: string[];
		/** Other props of Ark's `ToggleGroup.Root`, such as `aria-label`, `multiple` or `onValueChange`. */
		[key: string]: unknown;
	} = $props();
</script>

<ToggleGroup.Root
	class={cn(
		'inline-flex items-center gap-1 rounded-lg border border-border bg-hover p-1',
		className
	)}
	data-slot="toggle-group"
	bind:value
	{...rest}
>
	{#each items as item (item.value)}
		<ToggleGroup.Item
			value={item.value}
			aria-label={item.label}
			class="inline-flex h-7 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium text-muted transition-colors outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary data-[state=on]:border-border data-[state=on]:bg-background data-[state=on]:text-fg data-[state=on]:shadow-sm"
			data-slot="toggle-group-item"
		>
			{@render item.content()}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
