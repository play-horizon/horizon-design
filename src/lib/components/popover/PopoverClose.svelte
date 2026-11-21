<!--
@component
A button that closes the `Popover` it is in, named by its `label`. A button that shows only an
icon sets `iconOnly`, and shows its `label` as a tooltip too.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Popover } from '@ark-ui/svelte';
	import { mergeProps } from '@ark-ui/svelte/utils';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		class: className = '',
		label,
		iconOnly = false,
		children,
		...rest
	}: {
		/** Classes of the button. */
		class?: string;
		/** The button's accessible name, such as "Close"; the same as its text when it has one. */
		label: string;
		/** The button shows only an icon: `label` is its tooltip too. */
		iconOnly?: boolean;
		/** The button's content: its text or an icon. */
		children?: Snippet;
		/** Other props of Ark's `Popover.CloseTrigger`. */
		[key: string]: unknown;
	} = $props();
</script>

{#snippet button(tooltipProps: HTMLAttributes<HTMLElement>)}
	<Popover.CloseTrigger
		{...mergeProps(tooltipProps, rest)}
		class={className || undefined}
		aria-label={label}
		data-slot="popover-close"
	>
		{@render children?.()}
	</Popover.CloseTrigger>
{/snippet}

{#if iconOnly}
	<Tooltip content={label} trigger={button} />
{:else}
	{@render button({})}
{/if}
