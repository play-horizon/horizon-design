<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		side = 'top',
		children,
		...rest
	}: {
		class?: string;
		label?: string;
		side?: 'top' | 'bottom' | 'left' | 'right';
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Tooltip.Root openDelay={0} closeDelay={0} positioning={{ placement: side }} {...rest}>
	<Tooltip.Trigger
		class={cn(
			'text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent p-2 transition-all',
			className
		)}
		data-slot="toggle-tooltip"
	>
		{@render children?.()}
	</Tooltip.Trigger>
	{#if label}
		<Tooltip.Positioner>
			<Tooltip.Content
				class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover text-popover-foreground z-50 rounded-md border px-2.5 py-1 text-xs font-medium shadow-md backdrop-blur-xl"
			>
				{label}
			</Tooltip.Content>
		</Tooltip.Positioner>
	{/if}
</Tooltip.Root>
