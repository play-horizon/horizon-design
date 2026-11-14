<!--
@component
The previous-page button of a `Pagination`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes added to the button. */
		class?: string;
		/** The button's content, such as an arrow icon (with `aria-hidden`). */
		children?: Snippet;
		/** Other props of Ark's `Pagination.PrevTrigger`. */
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.PrevTrigger
	class={cn(
		'inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors hover:bg-hover hover:text-fg disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	data-slot="pagination-prev-trigger"
	{...rest}
>
	{@render children?.()}
</Pagination.PrevTrigger>
