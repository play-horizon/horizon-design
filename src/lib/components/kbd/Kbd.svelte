<!--
@component
A keyboard key or shortcut, such as `Ctrl K`, drawn as a raised key.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the key. */
		class?: string;
		/** The key's name, such as `Ctrl` or `K`. */
		children?: Snippet;
		/** Other attributes of the `<kbd>`. */
		[key: string]: unknown;
	} = $props();
</script>

<kbd
	class={cn(
		'inline-flex items-center rounded-sm border border-b-2 border-border-strong bg-surface px-1.25 py-0.75 font-mono text-2xs leading-none whitespace-nowrap text-muted',
		className
	)}
	data-slot="kbd"
	{...rest}
>
	{@render children?.()}
</kbd>
