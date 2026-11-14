<!--
@component
A menu opened by a right click (or a long press) on its content: items, separators and labels
(Ark Menu); Ark's `onSelect` reports the chosen item's `id`. `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	interface ContextMenuItem {
		/** A stable, unique id, which is also an item's value in the menu. */
		id: string;
		/** An item to choose (the default), a line between groups, or a group's title. */
		type?: 'item' | 'separator' | 'label';
		/** The text of an item or a title. */
		label?: string;
		/** Shows an item that can't be chosen. */
		disabled?: boolean;
	}

	let {
		items = [],
		children,
		frosted = false,
		...rest
	}: {
		/** The menu's entries, in order. */
		items?: ContextMenuItem[];
		/** The content that opens the menu on a right click. */
		children?: Snippet;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Other props of Ark's `Menu.Root`, such as `onSelect`. */
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Root {...rest}>
	<Menu.ContextTrigger data-slot="context-menu-trigger">
		{#snippet asChild(getProps)}
			<div {...getProps()} class="contents">
				{@render children?.()}
			</div>
		{/snippet}
	</Menu.ContextTrigger>
	<Portal>
		<Menu.Positioner>
			<Menu.Content
				class={cn(
					'z-50 min-w-36 overflow-hidden rounded-lg border border-border-strong p-1 text-fg shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised'
				)}
				data-slot="context-menu-content"
			>
				{#each items as item (item.id)}
					{#if item.type === 'separator'}
						<Menu.Separator class="-mx-1 my-1 h-px bg-border" data-slot="context-menu-separator" />
					{:else if item.type === 'label'}
						<div
							class="px-2.5 py-1 text-xs font-semibold text-muted"
							data-slot="context-menu-label"
						>
							{item.label}
						</div>
					{:else}
						<Menu.Item
							value={item.id}
							disabled={item.disabled}
							class={cn(
								'relative flex h-7.5 items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-hover data-highlighted:bg-hover data-highlighted:text-fg',
								{ 'pointer-events-none opacity-50': item.disabled }
							)}
							data-slot="context-menu-item"
						>
							{item.label}
						</Menu.Item>
					{/if}
				{/each}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
