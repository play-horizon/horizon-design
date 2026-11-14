<!--
@component
The ellipsis between page links of a `Pagination`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		index,
		...rest
	}: {
		/** Classes added to the ellipsis. */
		class?: string;
		/** What shows instead of the default `…`. */
		children?: Snippet;
		/** The ellipsis's position in the context's `pages`. */
		index: number;
		/** Other props of Ark's `Pagination.Ellipsis`. */
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.Ellipsis
	{index}
	class={cn('flex size-8 items-center justify-center text-sm text-muted', className)}
	data-slot="pagination-ellipsis"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		&#8230;
	{/if}
</Pagination.Ellipsis>
