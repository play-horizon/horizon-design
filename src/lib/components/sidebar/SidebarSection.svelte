<!--
@component
A group of `SidebarItem`s, with an optional overline label.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		children,
		...rest
	}: {
		class?: string;
		/** The group's overline label; none when empty. */
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div class={cn('flex flex-col gap-0.5', className)} data-slot="sidebar-section" {...rest}>
	{#if label}
		<p class="px-2.5 pt-3 pb-1 text-2xs font-bold tracking-overline text-faint uppercase">
			{label}
		</p>
	{/if}
	{@render children?.()}
</div>
