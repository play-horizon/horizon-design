<!--
@component
An app's navigation sidebar: a sunken column with an optional header (the brand), the
navigation itself (`SidebarSection` and `SidebarItem`) and an optional footer (the account).
`collapsed` narrows it to icons.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		collapsed = false,
		header,
		footer,
		children,
		...rest
	}: {
		class?: string;
		/** Narrows the sidebar to its icons. */
		collapsed?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<aside
	class={cn(
		'flex h-full flex-col border-r border-border bg-sunken transition-[width] duration-300',
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
	<nav class="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2.5 pb-3" data-slot="sidebar-content">
		{@render children?.()}
	</nav>
	{#if footer}
		<div class="mx-2.5 border-t border-border px-1 py-3" data-slot="sidebar-footer">
			{@render footer()}
		</div>
	{/if}
</aside>
