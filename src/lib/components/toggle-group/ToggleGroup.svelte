<!--
@component
A row of toggles of which one or several stay pressed (Ark ToggleGroup); `value` binds the
pressed items' values. With one choice (`multiple` unset), a raised highlight slides to the pressed
item; with `multiple`, each pressed item is raised in place. The group takes its accessible name through `aria-label`, and an item
whose content is only an icon through its `label`, which its tooltip shows too.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { slidingIndicator, slidingIndicatorClasses } from '#lib/motion/sliding-indicator.js';

	/** One toggle of the group. */
	interface ToggleItem {
		/** The item's stable, unique value. */
		value: string;
		/** Its content: an icon, a label, or both. */
		content: Snippet;
		/**
		 * Its accessible name, translated, also shown in a tooltip: needed when the content is only
		 * an icon, and only then.
		 */
		label?: string;
	}

	let {
		items = [],
		class: className = '',
		value = $bindable([]),
		multiple = false,
		...rest
	}: {
		/** The toggles, in order. */
		items?: ToggleItem[];
		/** Classes merged onto Ark's `ToggleGroup.Root`. */
		class?: string;
		/** The pressed items' values (bindable). */
		value?: string[];
		/** Whether several items can be pressed at once; otherwise pressing one releases the other. */
		multiple?: boolean;
		/** Other props of Ark's `ToggleGroup.Root`, such as `aria-label` or `onValueChange`. */
		[key: string]: unknown;
	} = $props();

	// The items' ids, shared by Ark's toggle group and their tooltips, which both find them by id.
	const uid = $props.id();
	const itemId = (value: string) => `${uid}-item-${value}`;

	const itemClass = $derived(
		cn(
			'relative inline-flex h-7 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium text-muted transition-colors outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary data-[state=on]:text-fg',
			multiple &&
				'data-[state=on]:border-border data-[state=on]:bg-background data-[state=on]:shadow-sm'
		)
	);
</script>

<!-- Without `multiple`, one highlight slides between the items; with it, a pressed item is raised
     in place, as several can be. -->
<ToggleGroup.Root
	class={cn(
		'group relative inline-flex items-center gap-1 rounded-lg border border-border bg-hover p-1',
		className
	)}
	data-slot="toggle-group"
	bind:value
	{multiple}
	ids={{ item: itemId }}
	{...rest}
	{@attach multiple ? undefined : slidingIndicator('[data-state="on"]')}
>
	{#if !multiple}
		<span
			class={cn(slidingIndicatorClasses, 'rounded-md border border-border bg-background shadow-sm')}
			aria-hidden="true"
			data-slot="toggle-group-indicator"
		></span>
	{/if}
	{#each items as item (item.value)}
		{#if item.label}
			<Tooltip content={item.label} triggerId={itemId(item.value)}>
				{#snippet trigger(props)}
					<ToggleGroup.Item
						{...props}
						value={item.value}
						aria-label={item.label}
						class={itemClass}
						data-slot="toggle-group-item"
					>
						{@render item.content()}
					</ToggleGroup.Item>
				{/snippet}
			</Tooltip>
		{:else}
			<ToggleGroup.Item value={item.value} class={itemClass} data-slot="toggle-group-item">
				{@render item.content()}
			</ToggleGroup.Item>
		{/if}
	{/each}
</ToggleGroup.Root>
