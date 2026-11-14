<!--
@component
A row of a list: media, a title, a description and actions.
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

<div
	class={cn(
		'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-hover',
		className
	)}
	data-slot="item"
	{...rest}
>
	{@render children?.()}
</div>
