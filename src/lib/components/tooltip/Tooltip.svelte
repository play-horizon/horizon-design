<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

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
		children?: Snippet;
		trigger?: Snippet;
		triggerClass?: string;
		content?: string | Snippet;
		contentClass?: string;
		openDelay?: number;
		closeDelay?: number;
		[key: string]: unknown;
	} = $props();
</script>

<Tooltip.Root {openDelay} {closeDelay} positioning={{ placement: 'top' }} {...rest}>
	<Tooltip.Trigger data-slot="tooltip-trigger">
		{#snippet asChild(getProps)}
			<div {...getProps()} class={triggerClass || 'contents'}>
				{@render (trigger ?? children)?.()}
			</div>
		{/snippet}
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content
				class={cn(
					'animate-fade-in border-border bg-popover text-popover-foreground z-50 rounded-lg border px-3 py-1.5 text-xs shadow-xl backdrop-blur-xl',
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
