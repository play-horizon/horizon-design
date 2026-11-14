<!--
@component
A menu opened by a right click (or a long press) on its content (Ark Menu): its `groups` of items,
with a line between groups and each titled group named by its title; Ark's `onSelect` reports the
chosen item's `id`. `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	/** An item to choose. */
	interface ContextMenuItem {
		/** A stable id, unique in the menu, which is also the item's value. */
		id: string;
		/** The item's text. */
		label: string;
		/** Shows an item that can't be chosen. */
		disabled?: boolean;
	}

	/** A group of items. */
	interface ContextMenuGroup {
		/** A stable id, unique in the menu. */
		id: string;
		/**
		 * The group's title, which names it for assistive technology; an untitled group is a plain
		 * run of items.
		 */
		label?: string;
		/** The group's items, in order. */
		items: ContextMenuItem[];
	}

	let {
		groups = [],
		children,
		frosted = false,
		...rest
	}: {
		/** The menu's groups, in order, with a line between each. */
		groups?: ContextMenuGroup[];
		/** The content that opens the menu on a right click. */
		children?: Snippet;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Other props of Ark's `Menu.Root`, such as `onSelect`. */
		[key: string]: unknown;
	} = $props();
</script>

{#snippet menuItems(entries: ContextMenuItem[])}
	{#each entries as item (item.id)}
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
	{/each}
{/snippet}

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
				{#each groups as group, index (group.id)}
					{#if index > 0}
						<Menu.Separator class="-mx-1 my-1 h-px bg-border" data-slot="context-menu-separator" />
					{/if}
					{#if group.label}
						<Menu.ItemGroup data-slot="context-menu-group">
							<Menu.ItemGroupLabel
								class="px-2.5 py-1 text-xs font-semibold text-muted"
								data-slot="context-menu-label"
							>
								{group.label}
							</Menu.ItemGroupLabel>
							{@render menuItems(group.items)}
						</Menu.ItemGroup>
					{:else}
						{@render menuItems(group.items)}
					{/if}
				{/each}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
