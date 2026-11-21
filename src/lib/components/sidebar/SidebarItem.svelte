<!--
@component
One entry of a `Sidebar`: a link when `href` is set, otherwise a button. The current entry
(`active`) is tinted with the primary colour, its icon primary, and marked with `aria-current`. `end` renders at the
far end, such as an unread count. While the sidebar is collapsed to its icons, a tooltip beside
the entry shows its text (`children` without the icon), the same text as its accessible name.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeProps } from '@ark-ui/svelte/utils';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { sidebarContext } from './context';

	let {
		class: className = '',
		active = false,
		href,
		end,
		children,
		...rest
	}: {
		/** Classes added to the link or button. */
		class?: string;
		/** Marks the entry as the current page. */
		active?: boolean;
		/** Where the entry leads; without it, the entry is a button (pass its `onclick`). */
		href?: string;
		/** Content at the far end of the entry, such as a count. */
		end?: Snippet;
		/**
		 * The entry's icon (with `aria-hidden`) and text; the text is also its tooltip while the
		 * sidebar is collapsed.
		 */
		children?: Snippet;
		/** Other attributes, passed on to the `<a>` or `<button>`. */
		[key: string]: unknown;
	} = $props();

	const sidebar = sidebarContext();

	const itemClass = $derived(
		cn(
			'flex h-8.5 w-full shrink-0 items-center gap-2.5 overflow-hidden rounded-lg px-2.5 whitespace-nowrap text-left text-base transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary [&_svg]:size-4 [&_svg]:shrink-0',
			active
				? 'bg-primary-subtle text-fg font-semibold [&_svg]:text-primary'
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

{#snippet text()}
	{@render children?.()}
{/snippet}

<!-- The tooltip stays mounted and is only disabled while the text shows, so collapsing the sidebar
     never remounts the entry (and never takes its focus away). -->
<Tooltip
	content={text}
	contentClass="[&_svg]:hidden"
	disabled={!sidebar?.collapsed}
	positioning={{ placement: 'right' }}
	lazyMount
	unmountOnExit
>
	{#snippet trigger(props: HTMLAttributes<HTMLElement>)}
		{#if href}
			<a
				{...mergeProps(props, rest)}
				{href}
				class={itemClass}
				aria-current={active ? 'page' : undefined}
				data-slot="sidebar-item"
			>
				{@render content()}
			</a>
		{:else}
			<button
				{...mergeProps(props, rest)}
				type="button"
				class={itemClass}
				aria-current={active ? 'true' : undefined}
				data-slot="sidebar-item"
			>
				{@render content()}
			</button>
		{/if}
	{/snippet}
</Tooltip>
