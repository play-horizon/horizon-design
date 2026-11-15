<!--
@component
A small pill that announces something new, with an optional icon and a tag.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the pill. */
		class?: string;
		/** The announcement: its text, with an optional icon and tag. */
		children?: Snippet;
		/** Other attributes of the pill. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-subtle px-3 py-1 text-sm text-primary',
		className
	)}
	data-slot="announcement"
	{...rest}
>
	{@render children?.()}
</div>
