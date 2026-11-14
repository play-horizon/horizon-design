<!--
@component
Positions an element at a corner or an edge of its parent, such as a badge on an icon.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		position = 'bottom-right',
		children,
		...rest
	}: {
		class?: string;
		position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center';
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const positions: Record<string, string> = {
		'bottom-right': 'bottom-6 right-6',
		'bottom-left': 'bottom-6 left-6',
		'top-right': 'top-6 right-6',
		'top-left': 'top-6 left-6',
		'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
	};
</script>

<div
	class={cn('fixed z-20 flex flex-col items-end gap-2', positions[position], className)}
	data-slot="float"
	{...rest}
>
	{@render children?.()}
</div>
