<!--
@component
An app's navigation sidebar: a sunken column with an optional header (the brand), then the
navigation landmark (named by `label`), which holds both the navigation itself (`SidebarSection`
and `SidebarItem`), scrolling when it overflows, and the optional footer pinned beneath it (the
account's entries). `collapsed` narrows it to the items' icons: their text and the sections' labels
are clipped or visually hidden, and still read by assistive technology, and each item shows its
text as a tooltip.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';
	import { setSidebarContext } from './context';

	let {
		class: className = '',
		collapsed = false,
		label,
		header,
		footer,
		children,
		...rest
	}: {
		/** Classes added to the `<aside>`. */
		class?: string;
		/** Narrows the sidebar to its icons. */
		collapsed?: boolean;
		/**
		 * The navigation's accessible name, translated, such as "Main"; needed when the page has
		 * more than one navigation.
		 */
		label?: string;
		/** The top of the sidebar, such as the brand. */
		header?: Snippet;
		/** The bottom of the sidebar, inside the navigation landmark, such as the account's entries. */
		footer?: Snippet;
		/** The navigation: `SidebarSection`s and `SidebarItem`s. */
		children?: Snippet;
		/** Other attributes, passed on to the `<aside>`. */
		[key: string]: unknown;
	} = $props();

	setSidebarContext({
		get collapsed() {
			return collapsed;
		}
	});
</script>

<aside
	class={cn(
		'group/sidebar flex h-full flex-col overflow-hidden border-r border-border bg-sunken transition-[width] duration-300',
		collapsed ? 'w-14' : 'w-56',
		className
	)}
	data-slot="sidebar"
	data-collapsed={collapsed}
	{...rest}
>
	{#if header}
		<div class="flex items-center gap-2.5 px-4.5 pt-4 pb-3.5" data-slot="sidebar-header">
			{@render header()}
		</div>
	{/if}
	<nav aria-label={label} class="flex min-h-0 flex-1 flex-col">
		<div
			class="flex flex-1 flex-col gap-0.5 overflow-x-hidden overflow-y-auto px-2.5 pb-3"
			data-slot="sidebar-content"
		>
			{@render children?.()}
		</div>
		{#if footer}
			<div
				class="mx-2.5 flex flex-col gap-0.5 border-t border-border py-3"
				data-slot="sidebar-footer"
			>
				{@render footer()}
			</div>
		{/if}
	</nav>
</aside>
