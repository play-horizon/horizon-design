<!--
@component
A group of items in a `Menu`, named by the `MenuGroupLabel` inside it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the group. */
		class?: string;
		/** The group's `MenuGroupLabel` and items. */
		children?: Snippet;
		/** Other props of Ark's `Menu.ItemGroup`, such as an `id` (generated when unset). */
		[key: string]: unknown;
	} = $props();
</script>

<Menu.ItemGroup class={cn(className)} data-slot="menu-group" {...rest}>
	{@render children?.()}
</Menu.ItemGroup>
