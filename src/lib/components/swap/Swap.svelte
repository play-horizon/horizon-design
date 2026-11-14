<!--
@component
Swaps between two contents with an animation, such as a play and a pause icon (Ark Swap).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Swap } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		on,
		off,
		class: className = '',
		swap = false,
		lazyMount = true,
		unmountOnExit = true,
		...rest
	}: {
		on?: Snippet;
		off?: Snippet;
		class?: string;
		swap?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		[key: string]: unknown;
	} = $props();

	const indicatorClass = 'data-[state=open]:animate-swap-in data-[state=closed]:animate-swap-out';
</script>

<Swap.Root class={cn(className)} data-slot="swap" {swap} {lazyMount} {unmountOnExit} {...rest}>
	<Swap.Indicator type="on" class={indicatorClass} data-slot="swap-indicator">
		{@render on?.()}
	</Swap.Indicator>
	<Swap.Indicator type="off" class={indicatorClass} data-slot="swap-indicator">
		{@render off?.()}
	</Swap.Indicator>
</Swap.Root>
