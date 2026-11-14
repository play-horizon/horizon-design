<!--
@component
One item of a `Marquee`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
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

<div class={cn('flex shrink-0 items-center', className)} data-slot="marquee-item" {...rest}>
	{@render children?.()}
</div>
