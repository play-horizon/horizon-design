<!--
@component
A menu opened by a right click on its content: items, separators and labels (Ark Menu); `frosted`
for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	interface ContextMenuItem {
		type?: 'item' | 'separator' | 'label';
		value?: string;
		label?: string;
		disabled?: boolean;
	}

	let {
		items = [],
		children,
		frosted = false,
		...rest
	}: {
		items?: ContextMenuItem[];
		children?: Snippet;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
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
				{#each items as item, i (i)}
					{#if item.type === 'separator'}
						<div
							class="-mx-1 my-1 h-px bg-border"
							role="separator"
							data-slot="context-menu-separator"
						></div>
					{:else if item.type === 'label'}
						<div
							class="px-2.5 py-1 text-xs font-semibold text-muted"
							data-slot="context-menu-label"
						>
							{item.label}
						</div>
					{:else}
						<Menu.Item
							value={item.value ?? ''}
							disabled={item.disabled}
							class={cn(
								'relative flex h-7.5 items-center gap-2 rounded-md px-2 text-sm transition-colors select-none hover:bg-hover data-highlighted:bg-hover data-highlighted:text-fg',
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
