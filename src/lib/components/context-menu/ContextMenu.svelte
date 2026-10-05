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
		...rest
	}: {
		items?: ContextMenuItem[];
		children?: Snippet;
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
				class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover text-popover-foreground z-50 min-w-36 overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-xl outline-none"
				data-slot="context-menu-content"
			>
				{#each items as item, i (i)}
					{#if item.type === 'separator'}
						<div
							class="bg-border -mx-1 my-1 h-px"
							role="separator"
							data-slot="context-menu-separator"
						></div>
					{:else if item.type === 'label'}
						<div
							class="text-muted-foreground px-2.5 py-1 text-xs font-semibold"
							data-slot="context-menu-label"
						>
							{item.label}
						</div>
					{:else}
						<Menu.Item
							value={item.value ?? ''}
							disabled={item.disabled}
							class={cn(
								'hover:bg-accent data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors select-none',
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
