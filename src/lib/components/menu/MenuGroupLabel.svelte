<!--
@component
The label of a `MenuGroup`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the label. */
		class?: string;
		/** The label's text. */
		children?: Snippet;
		/** Other props of Ark's `Menu.ItemGroupLabel`. */
		[key: string]: unknown;
	} = $props();
</script>

<Menu.ItemGroupLabel
	class={cn('px-2 py-1.5 text-xs font-medium text-muted', className)}
	data-slot="menu-group-label"
	{...rest}
>
	{@render children?.()}
</Menu.ItemGroupLabel>
