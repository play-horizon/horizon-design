<!--
@component
Makes a whole card clickable through the `LinkOverlay` inside it, while other links and buttons in
it stay usable.
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

<div class={cn('relative', className)} data-slot="link-box" {...rest}>
	{@render children?.()}
</div>
