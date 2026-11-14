<!--
@component
A surface that groups related content: an optional title and description, the content, and an
optional footer.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title,
		description,
		children,
		footer,
		...rest
	}: {
		/** Classes merged onto the card. */
		class?: string;
		/** The card's title, at its top. */
		title?: string;
		/** A line under the title. */
		description?: string;
		/** The card's content. */
		children?: Snippet;
		/** A row at the bottom, such as the card's buttons. */
		footer?: Snippet;
		/** Other attributes of the card. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'flex flex-col rounded-lg border border-border bg-surface text-fg inset-shadow-highlight',
		className
	)}
	data-slot="card"
	{...rest}
>
	{#if title || description}
		<div class="flex flex-col gap-1 px-4 pt-3.5" data-slot="card-header">
			{#if title}
				<h3 class="text-md font-bold" data-slot="card-title">{title}</h3>
			{/if}
			{#if description}
				<p class="text-sm text-muted" data-slot="card-description">{description}</p>
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="min-h-0 flex-1 p-4" data-slot="card-content">
			{@render children()}
		</div>
	{/if}
	{#if footer}
		<div class="flex items-center gap-2 border-t border-border px-4 py-3" data-slot="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>
