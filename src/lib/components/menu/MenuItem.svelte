<!--
@component
One item of a `Menu`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		value,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		value: string;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Item
	{value}
	class={cn(
		'relative flex h-7.5 cursor-default items-center gap-2 rounded-md px-2 text-sm transition-colors outline-none select-none hover:bg-hover hover:text-fg data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-hover data-highlighted:text-fg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	data-slot="menu-item"
	{...rest}
>
	{@render children?.()}
</Menu.Item>
