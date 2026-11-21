<!--
@component
A card showing a preview (its content) with a label under it. It is interactive only when given
something to do: with `href`, the label is a link; with `onclick`, a button; either covers the
whole card (pointer cursor, hover border and shadow, focus ring, Enter, and Space for a button).
With neither, it is a plain display. An interactive card needs its `label`, which names it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label = '',
		href = '',
		onclick,
		children,
		...rest
	}: {
		/** Classes merged onto the `<div>`. */
		class?: string;
		/** The text under the preview, translated; no label row when empty. */
		label?: string;
		/** Where the card leads, already resolved: its label is a link. */
		href?: string;
		/** Called when the card is pressed, when it has no `href`: its label is a button. */
		onclick?: () => void;
		/** The preview. */
		children?: Snippet;
		/** Other attributes of the card's `<div>`. */
		[key: string]: unknown;
	} = $props();

	const interactive = $derived(Boolean(label && (href || onclick)));
	// The label's link or button stretches over the card, so the whole card is the target.
	const stretched =
		'cursor-pointer text-left text-sm font-medium text-fg outline-none transition-colors group-hover:text-primary after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-primary';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<div
	class={cn(
		'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all',
		interactive && 'hover:border-primary/40 hover:shadow-lg',
		className
	)}
	data-slot="thumb-card"
	data-interactive={interactive || undefined}
	{...rest}
>
	<div class="flex min-h-40 items-center justify-center bg-surface p-6">
		{@render children?.()}
	</div>
	{#if label}
		<div class="border-t border-border px-4 py-3">
			{#if href}
				<a {href} class={stretched}>{label}</a>
			{:else if onclick}
				<button type="button" class={stretched} {onclick}>{label}</button>
			{:else}
				<span class="text-sm font-medium text-fg">{label}</span>
			{/if}
		</div>
	{/if}
</div>
