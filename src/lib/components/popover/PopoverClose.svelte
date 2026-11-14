<!--
@component
A button that closes the `Popover` it is in.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Popover.CloseTrigger class={cn(className)} data-slot="popover-close" {...rest}>
	{@render children?.()}
</Popover.CloseTrigger>
