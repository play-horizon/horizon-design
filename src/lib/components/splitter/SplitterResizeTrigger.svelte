<!--
@component
The draggable handle between two `SplitterPanel`s.
-->
<script lang="ts">
	import { Splitter } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		id,
		...rest
	}: {
		class?: string;
		id: `${string}:${string}`;
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.ResizeTrigger
	{id}
	class={cn(
		'flex touch-none items-center justify-center bg-border select-none hover:bg-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:bg-primary data-[orientation=horizontal]:w-1.5 data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-full data-[orientation=vertical]:cursor-row-resize',
		className
	)}
	data-slot="splitter-resize-trigger"
	{...rest}
/>
