<!--
@component
Pins its content at a corner or the bottom centre of the window, over the page, such as floating
action buttons; several children stack in a column, aligned to that side.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center';

	let {
		class: className = '',
		position = 'bottom-right',
		children,
		...rest
	}: {
		/** Classes merged onto the container. */
		class?: string;
		/** Where the content is pinned. */
		position?: Position;
		/** The floating content, such as a `Button`. */
		children?: Snippet;
		/** Other attributes of the container. */
		[key: string]: unknown;
	} = $props();

	const positions: Record<Position, string> = {
		'bottom-right': 'bottom-6 right-6 items-end',
		'bottom-left': 'bottom-6 left-6 items-start',
		'top-right': 'top-6 right-6 items-end',
		'top-left': 'top-6 left-6 items-start',
		'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 items-center'
	};
</script>

<div
	class={cn('fixed z-20 flex flex-col gap-2', positions[position], className)}
	data-slot="float"
	{...rest}
>
	{@render children?.()}
</div>
