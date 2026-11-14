<!--
@component
Keeps its content at a fixed width-to-height ratio.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		ratio = 1,
		class: className = '',
		children,
		...rest
	}: {
		ratio?: number;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	style="aspect-ratio: {ratio}"
	class={cn('relative', className)}
	data-slot="aspect-ratio"
	{...rest}
>
	<div class="h-full w-full">
		{@render children?.()}
	</div>
</div>
