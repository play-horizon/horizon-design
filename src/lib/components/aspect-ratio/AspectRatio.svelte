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
		/** The width divided by the height, such as `16 / 9`. */
		ratio?: number;
		/** Classes merged onto the frame. */
		class?: string;
		/** The content, which fills the frame. */
		children?: Snippet;
		/** Other attributes of the frame. */
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
