<script lang="ts">
	import type { Snippet } from 'svelte';
	import { HoverCard } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		trigger,
		triggerClass = '',
		children,
		contentClass = '',
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		children?: Snippet;
		contentClass?: string;
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
					'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover text-popover-foreground z-50 w-64 rounded-xl border p-4 shadow-xl backdrop-blur-xl outline-none',
					contentClass
				)}
				data-slot="hover-card-content"
			>
				{@render children?.()}
			</HoverCard.Content>
		</HoverCard.Positioner>
	</Portal>
</HoverCard.Root>
