<!--
@component
A bar of navigation items fixed to the bottom of a narrow screen.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface NavItem {
		label: string;
		href: string;
		icon?: Snippet;
		active?: boolean;
	}

	let {
		items = [],
		class: className = '',
		...rest
	}: {
		items?: NavItem[];
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<nav
	class={cn(
		'pb-safe fixed right-0 bottom-0 left-0 z-20 flex items-center justify-around border-t border-border bg-raised px-2 pt-2',
		className
	)}
	data-slot="bottom-navigation"
	{...rest}
>
	{#each items as item (item.label)}
		<a
			href={item.href}
			class={cn(
				'flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs font-medium transition-colors',
				item.active ? 'text-primary' : 'text-muted hover:text-fg'
			)}
			aria-current={item.active ? 'page' : undefined}
			data-slot="bottom-navigation-item"
		>
			{#if item.icon}
				{@render item.icon()}
			{/if}
			{#if item.label}
				<span>{item.label}</span>
			{/if}
		</a>
	{/each}
</nav>
