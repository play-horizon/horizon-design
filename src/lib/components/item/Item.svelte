<!--
@component
A row of a list, laying out what it is given (media, a title, a description, actions) in a line.
It is interactive only when given something to do: with `href`, the row is a link; with `onclick`,
a button (pointer cursor, hover fill, focus ring, Enter, and Space for a button). Its content must
then hold no other link or button. With neither, it is a plain display.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		href,
		onclick,
		children,
		...rest
	}: {
		/** Classes merged onto the row. */
		class?: string;
		/** Where the row leads, already resolved: the row is a link. */
		href?: string;
		/** Called when the row is pressed, when it has no `href`: the row is a button. */
		onclick?: (event: MouseEvent) => void;
		/** The row's content, such as an icon and a label. */
		children?: Snippet;
		/** Other attributes of the row, such as `role="listitem"` on a plain row. */
		[key: string]: unknown;
	} = $props();

	const layout = 'flex items-center gap-3 rounded-lg px-3 py-2';
	const interactive =
		'w-full cursor-pointer text-left transition-colors outline-none hover:bg-hover focus-visible:ring-2 focus-visible:ring-primary';
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- the app passes an href it has already resolved -->
	<a {href} class={cn(layout, interactive, className)} data-slot="item" {...rest}>
		{@render children?.()}
	</a>
{:else if onclick}
	<button
		type="button"
		class={cn(layout, interactive, className)}
		data-slot="item"
		{onclick}
		{...rest}
	>
		{@render children?.()}
	</button>
{:else}
	<div class={cn(layout, className)} data-slot="item" {...rest}>
		{@render children?.()}
	</div>
{/if}
