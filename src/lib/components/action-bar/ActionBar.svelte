<!--
@component
A floating bar of actions at the bottom of the window, for the current selection.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the bar. */
		class?: string;
		/** The actions: buttons, with `ActionBarSeparator`s between groups. */
		children?: Snippet;
		/** Other attributes of the bar. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-border bg-raised p-1.5 shadow-lg',
		className
	)}
	data-slot="action-bar"
	{...rest}
>
	{@render children?.()}
</div>
