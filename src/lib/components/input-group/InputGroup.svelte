<!--
@component
An input with addons attached to its sides.
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
		'flex w-full items-center [&>input]:rounded-none [&>input:first-child]:rounded-l-lg [&>input:last-child]:rounded-r-lg',
		className
	)}
	data-slot="input-group"
	{...rest}
>
	{@render children?.()}
</div>
