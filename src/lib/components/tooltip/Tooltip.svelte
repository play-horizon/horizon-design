<!--
@component
A short label shown on hover or keyboard focus of its trigger (Ark Tooltip). The trigger is a
button holding `children`, styled by `triggerClass`; to put the tooltip on an element of its own,
such as an icon button or another component's trigger, the app passes `trigger` instead and spreads
the props it receives onto that element. Those props carry no `data-scope`, `data-part` or
`data-state`, so another component's trigger keeps its own (a toggle's `on`, a popover trigger's
`open`). Both components also find the element by its id: give the tooltip the id the other
component gives its trigger, `triggerId`, set through that component's `ids` (Ark's `ids` prop). The tooltip describes its trigger; an icon-only trigger still needs its own
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
		triggerId,
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
		/**
		 * The id of the element `trigger` renders, when another component also gives it one (its
		 * trigger's id, set through its `ids`), so both find the same element.
		 */
		triggerId?: string;
		/** Other props of Ark's `Tooltip.Root`. */
		[key: string]: unknown;
	} = $props();

	const partAttributes = new Set(['data-scope', 'data-part', 'data-state']);

	/** The trigger's props but the attributes that would override another component's own. */
	function withoutPartAttributes(props: HTMLAttributes<HTMLElement>): HTMLAttributes<HTMLElement> {
		return Object.fromEntries(
			Object.entries(props).filter(([name]) => !partAttributes.has(name))
		) as HTMLAttributes<HTMLElement>;
	}
</script>

<Tooltip.Root
	{openDelay}
	{closeDelay}
	positioning={{ placement: 'top' }}
	ids={triggerId ? { trigger: triggerId } : undefined}
	{...rest}
>
	{#if trigger}
		<Tooltip.Trigger data-slot="tooltip-trigger">
			{#snippet asChild(getProps)}
				{@render trigger(withoutPartAttributes(getProps()))}
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
