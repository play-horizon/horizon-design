<!--
@component
One entry of a `Sidebar`: a link when `href` is set, otherwise a button. The current entry
(`active`) is tinted with the primary colour and marked with `aria-current`. `end` renders at the
far end, such as an unread count.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		active = false,
		href,
		end,
		children,
		...rest
	}: {
		class?: string;
		/** Marks the entry as the current page. */
		active?: boolean;
		href?: string;
		/** Content at the far end of the entry, such as a count. */
		end?: Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const itemClass = $derived(
		cn(
			'flex h-8.5 w-full shrink-0 items-center gap-2.5 rounded-lg px-2.5 text-left text-base transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary [&_svg]:size-4 [&_svg]:shrink-0',
			active
				? 'bg-primary-subtle text-primary font-semibold'
				: 'text-fg-2 hover:bg-hover hover:text-fg',
			className
		)
	);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

{#snippet content()}
	{@render children?.()}
	{#if end}
		<span class="ml-auto flex items-center">{@render end()}</span>
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class={itemClass}
		aria-current={active ? 'page' : undefined}
		data-slot="sidebar-item"
		{...rest}
	>
		{@render content()}
	</a>
{:else}
	<button
		type="button"
		class={itemClass}
		aria-current={active ? 'true' : undefined}
		data-slot="sidebar-item"
		{...rest}
	>
		{@render content()}
	</button>
{/if}
