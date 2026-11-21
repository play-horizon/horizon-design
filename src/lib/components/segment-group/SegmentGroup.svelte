<!--
@component
A segmented control (Ark SegmentGroup), such as a view switch: with the `default` variant, a sunken
track whose chosen segment is raised; with `underline`, a row of labels with a bar under the chosen
one, for switching between the views of a page (render the view of `value` below it). The raised
segment or the bar slides to the chosen segment. `value` binds the chosen segment; without it,
Ark's `defaultValue` sets the first one. Name the group with an `aria-label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SegmentGroup, type SegmentGroupValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	/** One segment: its value, its label (text or a snippet), and whether it can't be chosen. */
	interface SegmentItem {
		value: string;
		label: string | Snippet;
		disabled?: boolean;
	}

	const sizes: Record<'sm' | 'md' | 'lg', string> = {
		sm: 'px-2 py-0.75 text-xs',
		md: 'px-3 py-1 text-sm',
		lg: 'px-4 py-1.5 text-base'
	};

	let {
		items = [],
		class: className = '',
		size = 'md',
		variant = 'default',
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
		/** A raised segment on a sunken track, or a bar under the chosen label. */
		variant?: 'default' | 'underline';
		/** The chosen segment's value; `null` when none is. */
		value?: string | null;
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: SegmentGroupValueChangeDetails) => void;
		/** Other props of Ark's `SegmentGroup.Root`. */
		[key: string]: unknown;
	} = $props();

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<SegmentGroup.Root
	class={cn(
		'relative inline-flex items-stretch',
		variant === 'default'
			? 'gap-1 rounded-lg border border-border bg-hover p-1'
			: 'gap-1 border-b border-border',
		className
	)}
	data-slot="segment-group"
	data-variant={variant}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	<!-- Ark sets the chosen segment's box as --left, --top, --width and --height, and moves the
	     indicator there as the value changes, with its own inline transition, which reads the duration
	     and the easing from the variables set here (none under reduced motion). The underline's bar
	     takes only the box's left and width, and sits on the bottom border (Ark sets `top`
	     itself, which `top: auto` undoes). -->
	<SegmentGroup.Indicator
		class={cn(
			'absolute [--transition-duration:200ms] [--transition-timing-function:var(--ease-standard)] motion-reduce:[--transition-duration:0ms]',
			variant === 'default'
				? 'rounded-md border border-border bg-background shadow-sm'
				: '-bottom-px h-0.5 rounded-full bg-primary'
		)}
		style={variant === 'default'
			? 'left: var(--left); top: var(--top); width: var(--width); height: var(--height);'
			: 'left: var(--left); width: var(--width); top: auto;'}
		data-slot="segment-group-indicator"
	/>
	{#each items as item (item.value)}
		<SegmentGroup.Item
			value={item.value}
			disabled={item.disabled}
			class={cn(
				'relative z-10 flex cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap text-muted transition-colors hover:text-fg data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-visible:ring-2 data-focus-visible:ring-primary data-[state=checked]:text-fg',
				sizes[size],
				variant === 'underline' && 'pb-2'
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
