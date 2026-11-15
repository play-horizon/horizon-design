<!--
@component
A card that shows on hover or focus of its trigger (Ark HoverCard), such as the docs card of a
function; `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { HoverCard } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';

	let {
		trigger,
		triggerClass = '',
		children,
		contentClass = '',
		frosted = false,
		...rest
	}: {
		/** The content of the button that shows the card on hover or focus; no trigger when unset. */
		trigger?: Snippet;
		/** Classes of the trigger button. */
		triggerClass?: string;
		/** The card's content. */
		children?: Snippet;
		/** Classes merged onto the card. */
		contentClass?: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Other props of Ark's `HoverCard.Root`, such as `openDelay` or `positioning`. */
		[key: string]: unknown;
	} = $props();
</script>

<HoverCard.Root {...rest}>
	{#if trigger}
		<HoverCard.Trigger class={triggerClass || undefined} data-slot="hover-card-trigger">
			{@render trigger()}
		</HoverCard.Trigger>
	{/if}
	<Portal>
		<HoverCard.Positioner>
			<HoverCard.Content
				class={cn(
					'z-50 w-72 rounded-lg border border-border-strong px-3 py-2.5 text-fg shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					contentClass
				)}
				data-slot="hover-card-content"
			>
				{@render children?.()}
			</HoverCard.Content>
		</HoverCard.Positioner>
	</Portal>
</HoverCard.Root>
