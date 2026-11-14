<!--
@component
A toggle with a tooltip that names it.
-->
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
			'relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent p-2 text-muted transition-all hover:bg-hover hover:text-fg data-[state=on]:bg-hover data-[state=on]:text-fg',
			className
		)}
		data-slot="toggle-tooltip"
	>
		{@render children?.()}
	</Tooltip.Trigger>
	{#if label}
		<Tooltip.Positioner>
			<Tooltip.Content
				class="z-50 rounded-md border border-border bg-raised px-2.5 py-1 text-xs font-medium text-fg shadow-md data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
			>
				{label}
			</Tooltip.Content>
		</Tooltip.Positioner>
	{/if}
</Tooltip.Root>
