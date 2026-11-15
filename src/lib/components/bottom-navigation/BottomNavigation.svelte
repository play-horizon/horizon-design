<!--
@component
A bar of navigation items fixed to the bottom of a narrow screen, above the device's safe area;
`label` names it among the page's navigation landmarks.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	interface NavItem {
		/** The item's text, unique in the bar. */
		label: string;
		/** Where the item leads, already resolved by the app. */
		href: string;
		/** The item's icon, decorative (`aria-hidden`), drawn above its text. */
		icon?: Snippet;
		/** Marks the item of the current page. */
		active?: boolean;
	}

	let {
		items = [],
		label,
		class: className = '',
		...rest
	}: {
		/** The items, in order. */
		items?: NavItem[];
		/** The bar's accessible name, such as "Main". */
		label: string;
		/** Classes merged onto the bar. */
		class?: string;
		/** Other attributes of the bar. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<nav
	class={cn(
		'fixed right-0 bottom-0 left-0 z-20 flex items-center justify-around border-t border-border bg-raised px-2 pt-2 pb-[max(--spacing(2),env(safe-area-inset-bottom))]',
		className
	)}
	aria-label={label}
	data-slot="bottom-navigation"
	{...rest}
>
	{#each items as item (item.label)}
		<a
			href={item.href}
			class={cn(
				'flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1 text-xs font-medium transition-colors',
				item.active ? 'text-primary' : 'text-muted hover:text-fg'
			)}
			aria-current={item.active ? 'page' : undefined}
			data-slot="bottom-navigation-item"
		>
			{@render item.icon?.()}
			<span>{item.label}</span>
		</a>
	{/each}
</nav>
