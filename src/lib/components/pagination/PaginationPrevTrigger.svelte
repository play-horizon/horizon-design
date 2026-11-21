<!--
@component
The previous-page button of a `Pagination`, named by the pagination's `prevTriggerLabel`. A button
that shows only an icon takes a `label`, the same text: its accessible name and its tooltip.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Pagination } from '@ark-ui/svelte';
	import { mergeProps } from '@ark-ui/svelte/utils';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		class: className = '',
		label,
		children,
		...rest
	}: {
		/** Classes added to the button. */
		class?: string;
		/**
		 * For a button that shows only an icon: its accessible name and its tooltip, the
		 * pagination's `prevTriggerLabel`. Unset, the button has no tooltip.
		 */
		label?: string;
		/** The button's content, such as an arrow icon (with `aria-hidden`). */
		children?: Snippet;
		/** Other props of Ark's `Pagination.PrevTrigger`. */
		[key: string]: unknown;
	} = $props();
</script>

{#snippet button(tooltipProps: HTMLAttributes<HTMLElement>)}
	<Pagination.PrevTrigger
		{...mergeProps(tooltipProps, rest)}
		aria-label={label}
		class={cn(
			'inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors hover:bg-hover hover:text-fg disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		data-slot="pagination-prev-trigger"
	>
		{@render children?.()}
	</Pagination.PrevTrigger>
{/snippet}

{#if label}
	<Tooltip content={label} trigger={button} />
{:else}
	{@render button({})}
{/if}
