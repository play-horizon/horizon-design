<!--
@component
Resizable panels separated by draggable handles (Ark Splitter): `SplitterPanel`s with a
`SplitterResizeTrigger` between each two. It renders in the browser only.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Splitter, type SplitterPanelData as PanelData } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { BROWSER as browser } from 'esm-env';

	let {
		class: className = '',
		panels,
		children,
		...rest
	}: {
		/** Classes added to the row (or column) of panels. */
		class?: string;
		/** Each panel's id and size limits, in order. */
		panels: PanelData[];
		/** The `SplitterPanel`s and `SplitterResizeTrigger`s. */
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

{#if browser}
	<Splitter.Root
		{panels}
		class={cn('flex h-full w-full', className)}
		data-slot="splitter"
		{...rest}
	>
		{@render children?.()}
	</Splitter.Root>
{/if}
