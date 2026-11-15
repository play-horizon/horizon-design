<!--
@component
A card showing a preview (its content) with a label under it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label = '',
		href = '',
		children,
		...rest
	}: {
		/** Classes merged onto the `<div>`. */
		class?: string;
		/** The text under the preview, translated; no label row when empty. */
		label?: string;
		/** Where the label links to, already resolved; plain text when empty. */
		href?: string;
		/** The preview. */
		children?: Snippet;
		/** Other attributes of the card's `<div>`. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<div
	class={cn(
		'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/40 hover:shadow-lg',
		className
	)}
	data-slot="thumb-card"
	{...rest}
>
	<div class="flex min-h-40 items-center justify-center bg-surface p-6">
		{@render children?.()}
	</div>
	{#if label}
		<div class="border-t border-border px-4 py-3">
			{#if href}
				<a {href} class="text-sm font-medium text-fg transition-colors hover:text-primary">
					{label}
				</a>
			{:else}
				<span class="text-sm font-medium text-fg">{label}</span>
			{/if}
		</div>
	{/if}
</div>
