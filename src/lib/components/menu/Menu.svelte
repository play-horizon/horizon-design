<!--
@component
A dropdown menu opened by its trigger (Ark Menu); `frosted` for a translucent surface. A trigger
that shows only an icon takes a `triggerLabel`: its accessible name and its tooltip.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu, type MenuOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		trigger: triggerContent,
		triggerLabel,
		triggerClass = '',
		children,
		contentClass = '',
		frosted = false,
		open = $bindable(),
		onOpenChange,
		...rest
	}: {
		/** The content of the button that opens the menu; no trigger when unset. */
		trigger?: Snippet;
		/**
		 * The trigger's action, translated, such as "More actions", for a trigger that shows only an
		 * icon: its accessible name and its tooltip. Unset, the trigger's content names it.
		 */
		triggerLabel?: string;
		/** Classes of the trigger button, such as `buttonVariants(…)`. */
		triggerClass?: string;
		/** The menu's items: `MenuItem`, `MenuGroup` and `MenuSeparator`. */
		children?: Snippet;
		/** Classes merged onto the menu's surface. */
		contentClass?: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Whether the menu is open (bindable); unset, Ark's `defaultOpen` gives the first state. */
		open?: boolean;
		/** Called with the new state when the menu opens or closes. */
		onOpenChange?: (details: MenuOpenChangeDetails) => void;
		/** Other props of Ark's `Menu.Root`, such as `onSelect` or `positioning`. */
		[key: string]: unknown;
	} = $props();

	// The tooltip and the menu share the trigger, so both must know it by the same id.
	const triggerId = $props.id();
</script>

<Menu.Root
	ids={{ trigger: triggerId }}
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if triggerContent && triggerLabel}
		<Tooltip content={triggerLabel} ids={{ trigger: triggerId }}>
			{#snippet trigger(props)}
				<Menu.Trigger
					{...props}
					aria-label={triggerLabel}
					class={triggerClass || undefined}
					data-slot="menu-trigger"
				>
					{@render triggerContent()}
				</Menu.Trigger>
			{/snippet}
		</Tooltip>
	{:else if triggerContent}
		<Menu.Trigger class={triggerClass || undefined} data-slot="menu-trigger">
			{@render triggerContent()}
		</Menu.Trigger>
	{/if}
	<Portal>
		<Menu.Positioner>
			<Menu.Content
				class={cn(
					'z-50 min-w-36 overflow-hidden rounded-lg border border-border-strong p-1 text-fg shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					contentClass
				)}
				data-slot="menu-content"
			>
				{@render children?.()}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
