<!--
@component
A short label shown on hover or keyboard focus of its trigger (Ark Tooltip). The trigger is a
button holding `children`, styled by `triggerClass`; to put the tooltip on an element of its own,
such as an icon button, the app passes `trigger` instead and spreads the props it receives onto
that element. The tooltip describes its trigger; an icon-only trigger still needs its own
`aria-label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Tooltip } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';

	let {
		children,
		trigger,
		triggerClass = '',
		content,
		contentClass = '',
		openDelay = 200,
		closeDelay = 100,
		...rest
	}: {
		/** The content of the trigger button. */
		children?: Snippet;
		/**
		 * The app's own trigger, in place of the button: a focusable element that spreads the
		 * props it receives (its events, id and `aria-describedby`).
		 */
		trigger?: Snippet<[props: HTMLAttributes<HTMLElement>]>;
		/** Classes of the trigger button, such as `buttonVariants(…)`. */
		triggerClass?: string;
		/** The tooltip's text, translated, or a snippet. */
		content?: string | Snippet;
		/** Classes merged onto the tooltip. */
		contentClass?: string;
		/** How long the pointer rests on the trigger before it shows, in milliseconds. */
		openDelay?: number;
		/** How long it stays after the pointer leaves, in milliseconds. */
		closeDelay?: number;
		/** Other props of Ark's `Tooltip.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Tooltip.Root {openDelay} {closeDelay} positioning={{ placement: 'top' }} {...rest}>
	{#if trigger}
		<Tooltip.Trigger data-slot="tooltip-trigger">
			{#snippet asChild(getProps)}
				{@render trigger(getProps())}
			{/snippet}
		</Tooltip.Trigger>
	{:else}
		<Tooltip.Trigger type="button" class={triggerClass} data-slot="tooltip-trigger">
			{@render children?.()}
		</Tooltip.Trigger>
	{/if}
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content
				class={cn(
					'z-50 animate-fade-in rounded-lg border border-border bg-raised px-3 py-1.5 text-xs text-fg shadow-lg',
					contentClass
				)}
				data-slot="tooltip-content"
			>
				{#if typeof content === 'string'}
					{content}
				{:else if content}
					{@render content()}
				{/if}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Root>
