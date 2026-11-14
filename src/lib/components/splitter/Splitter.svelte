<!--
@component
Resizable panels separated by draggable handles (Ark Splitter): `SplitterPanel`s with a
`SplitterResizeTrigger` between each two.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Splitter, type SplitterPanelData as PanelData } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

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
		/** Other props of Ark's `Splitter.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.Root {panels} class={cn('flex h-full w-full', className)} data-slot="splitter" {...rest}>
	{@render children?.()}
</Splitter.Root>
