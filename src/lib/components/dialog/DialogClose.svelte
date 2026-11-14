<!--
@component
A button that closes the `Dialog` it is in: the children, or an icon named by `label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	let {
		class: className = '',
		label,
		children,
		...rest
	}: {
		class?: string;
		/** The button's accessible name, such as "Close"; needed when it has no text of its own. */
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.CloseTrigger
	class={cn(
		'rounded-sm text-muted transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none',
		{ 'absolute top-4 right-4 p-1 opacity-70 hover:opacity-100': !children },
		className
	)}
	aria-label={label}
	data-slot="dialog-close"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<MingcuteCloseLine class="size-4" aria-hidden="true" />
	{/if}
</Dialog.CloseTrigger>
