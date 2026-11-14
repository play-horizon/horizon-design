<!--
@component
A dropdown menu opened by its trigger (Ark Menu); `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu, type MenuOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		trigger,
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
</script>

<Menu.Root
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<Menu.Trigger class={triggerClass || undefined} data-slot="menu-trigger">
			{@render trigger()}
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
