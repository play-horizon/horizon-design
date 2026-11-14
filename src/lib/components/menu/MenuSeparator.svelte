<!--
@component
A divider between groups of a `Menu`.
-->
<script lang="ts">
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Separator
	class={cn('-mx-1 my-1 h-px bg-border', className)}
	data-slot="menu-separator"
	{...rest}
/>
