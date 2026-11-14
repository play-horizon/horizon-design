<!--
@component
A row of a list, laying out what it is given (media, a title, a description, actions) in a line.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the row. */
		class?: string;
		/** The row's content, such as an icon and a label. */
		children?: Snippet;
		/** Other attributes of the row, such as `role="listitem"`. */
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
