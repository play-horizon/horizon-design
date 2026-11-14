<!--
@component
Text or an icon attached to the side of an input inside an `InputGroup`.
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
		'flex h-9 shrink-0 items-center border border-r-0 border-border bg-hover px-3 text-sm text-muted first:rounded-l-lg last:rounded-r-lg last:border-r last:border-l-0',
		className
	)}
	data-slot="input-addon"
	{...rest}
>
	{@render children?.()}
</div>
