<!--
@component
The draggable handle between two `SplitterPanel`s; arrow keys move it too. `label` names it.
-->
<script lang="ts">
	import { Splitter } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		id,
		label,
		...rest
	}: {
		/** Classes added to the handle. */
		class?: string;
		/** The ids of the panels before and after it, as `before:after`. */
		id: `${string}:${string}`;
		/** The handle's accessible name, such as "Resize the sidebar". */
		label: string;
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.ResizeTrigger
	{id}
	class={cn(
		'flex touch-none items-center justify-center bg-border select-none hover:bg-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:bg-primary data-[orientation=horizontal]:w-1.5 data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-full data-[orientation=vertical]:cursor-row-resize',
		className
	)}
	aria-label={label}
	data-slot="splitter-resize-trigger"
	{...rest}
/>
