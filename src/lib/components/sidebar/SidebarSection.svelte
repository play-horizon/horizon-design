<!--
@component
A group of `SidebarItem`s, with an optional overline label that names the group. A collapsed
`Sidebar` hides the label visually.
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
		/** Classes added to the group. */
		class?: string;
		/** The group's overline label; none when empty. */
		label?: string;
		/** The group's `SidebarItem`s. */
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const labelId = $props.id();
</script>

<div
	class={cn('flex flex-col gap-0.5', className)}
	role={label ? 'group' : undefined}
	aria-labelledby={label ? labelId : undefined}
	data-slot="sidebar-section"
	{...rest}
>
	{#if label}
		<p
			id={labelId}
			class="px-2.5 pt-3 pb-1 text-2xs font-bold tracking-overline text-faint uppercase group-data-[collapsed=true]/sidebar:sr-only"
		>
			{label}
		</p>
	{/if}
	{@render children?.()}
</div>
