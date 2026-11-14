<!--
@component
A segmented control: a sunken track whose chosen segment is raised (Ark SegmentGroup), such as the
theme or a view switch. `value` binds the chosen segment; without it, Ark's `defaultValue` sets the
first one. Name the group with an `aria-label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SegmentGroup, type SegmentGroupValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	/** One segment: its value and its label (text or a snippet). */
	interface SegmentItem {
		value: string;
		label: string | Snippet;
	}

	type SizeConfig = { item: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: { item: 'px-2 py-0.75 text-xs rounded-md' },
		md: { item: 'px-3 py-1 text-sm rounded-md' },
		lg: { item: 'px-4 py-1.5 text-base rounded-md' }
	};

	let {
		items = [],
		class: className = '',
		size = 'md',
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** The segments, in order. */
		items?: SegmentItem[];
		/** Classes added to the track. */
		class?: string;
		/** The size of the segments and of their text. */
		size?: 'sm' | 'md' | 'lg';
		/** The chosen segment's value; `null` when none is. */
		value?: string | null;
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: SegmentGroupValueChangeDetails) => void;
		/** Other props of Ark's `SegmentGroup.Root`. */
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<SegmentGroup.Root
	class={cn(
		'inline-flex items-stretch gap-1 rounded-lg border border-border bg-hover p-1',
		className
	)}
	data-slot="segment-group"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	<SegmentGroup.Indicator
		class="absolute rounded-md border border-border bg-background shadow-sm transition-all"
		style="left: var(--left); top: var(--top); width: var(--width); height: var(--height);"
	/>
	{#each items as item (item.value)}
		<SegmentGroup.Item
			value={item.value}
			class={cn(
				'relative z-10 flex items-center justify-center font-medium text-muted transition-colors data-focus-visible:ring-2 data-focus-visible:ring-primary data-[state=checked]:text-fg',
				sz.item
			)}
			data-slot="segment-group-item"
		>
			<SegmentGroup.ItemText>
				{#if isSnippet(item.label)}
					{@render item.label()}
				{:else}
					{item.label}
				{/if}
			</SegmentGroup.ItemText>
			<SegmentGroup.ItemControl class="sr-only" />
			<SegmentGroup.ItemHiddenInput />
		</SegmentGroup.Item>
	{/each}
</SegmentGroup.Root>
