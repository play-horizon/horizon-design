<!--
@component
An `Input` with `InputAddon`s attached to its sides: the parts join into one field, rounded only
at its two ends, and the addons take the input's height.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the group. */
		class?: string;
		/** The `Input` and its `InputAddon`s, in order. */
		children?: Snippet;
		/** Other attributes of the group. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'flex w-full items-stretch',
		'[&>[data-slot=input]]:rounded-none [&>[data-slot=input]:first-child]:rounded-l-lg [&>[data-slot=input]:last-child]:rounded-r-lg',
		className
	)}
	data-slot="input-group"
	{...rest}
>
	{@render children?.()}
</div>
