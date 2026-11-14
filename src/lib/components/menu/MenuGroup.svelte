<!--
@component
A group of items in a `Menu`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		id,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		id?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.ItemGroup {id} class={cn(className)} data-slot="menu-group" {...rest}>
	{@render children?.()}
</Menu.ItemGroup>
