<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		trigger,
		triggerClass = '',
		children,
		contentClass = '',
		open = $bindable(false),
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		children?: Snippet;
		contentClass?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Menu.Trigger class={triggerClass || undefined} data-slot="menu-trigger">
			{@render trigger()}
		</Menu.Trigger>
	{/if}
	<Portal>
		<Menu.Positioner>
			<Menu.Content
				class={cn(
					'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-xl outline-none',
					contentClass
				)}
				data-slot="menu-content"
			>
				{@render children?.()}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
