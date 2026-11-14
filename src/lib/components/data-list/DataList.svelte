<!--
@component
A list of label and value pairs, such as the details of a game.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	interface DataListItem {
		/** The label, unique in the list. */
		label: string;
		/** The value: text, or a snippet such as a badge. */
		value: string | Snippet;
	}

	let {
		items = [],
		class: className = '',
		...rest
	}: {
		/** The pairs, in order. */
		items?: DataListItem[];
		/** Classes merged onto the list. */
		class?: string;
		/** Other attributes of the list. */
		[key: string]: unknown;
	} = $props();

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<dl class={cn('flex flex-col gap-3', className)} data-slot="data-list" {...rest}>
	{#each items as item (item.label)}
		<div class="flex flex-row gap-4" data-slot="data-list-item">
			<dt class="min-w-28 text-sm font-medium text-muted" data-slot="data-list-label">
				{item.label}
			</dt>
			<dd class="text-sm font-medium text-fg" data-slot="data-list-value">
				{#if isSnippet(item.value)}
					{@render item.value()}
				{:else}
					{item.value}
				{/if}
			</dd>
		</div>
	{/each}
</dl>
