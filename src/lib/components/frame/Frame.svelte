<!--
@component
A window-like frame around content, such as a code sample or a screenshot: a bordered surface
with, when `title` is set, a title bar showing the title between three window dots.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		title = '',
		children,
		...rest
	}: {
		/** Classes merged onto the frame. */
		class?: string;
		/** The title bar's text, such as a file name; no title bar when empty. */
		title?: string;
		/** The framed content, which scrolls when the frame is smaller than it. */
		children?: Snippet;
		/** Other attributes of the frame. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm',
		className
	)}
	data-slot="frame"
	{...rest}
>
	{#if title}
		<div class="flex items-center gap-2 border-b border-border bg-hover px-4 py-2.5">
			<div class="flex items-center gap-1.5" aria-hidden="true">
				<span class="size-3 rounded-full bg-danger/60"></span>
				<span class="size-3 rounded-full bg-warning/60"></span>
				<span class="size-3 rounded-full bg-success/60"></span>
			</div>
			<span class="flex-1 text-center text-xs text-muted">{title}</span>
		</div>
	{/if}
	<div class="flex-1 overflow-auto">
		{@render children?.()}
	</div>
</div>
