<!--
@component
A bordered frame around content, with an optional header and footer.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title = '',
		children,
		...rest
	}: {
		class?: string;
		title?: string;
		children?: Snippet;
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
			<div class="flex items-center gap-1.5">
				<span class="size-3 rounded-full bg-danger/60"></span>
				<span class="size-3 rounded-full bg-warning/60"></span>
				<span class="size-3 rounded-full bg-success/60"></span>
			</div>
			{#if title}
				<span class="flex-1 text-center text-xs text-muted">{title}</span>
			{/if}
		</div>
	{/if}
	<div class="flex-1 overflow-auto">
		{@render children?.()}
	</div>
</div>
