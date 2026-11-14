<!--
@component
A scrolling region with a thin, themed vertical scrollbar (Ark ScrollArea), shown only while the
content is taller than the region.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ScrollArea } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		innerClass = '',
		children,
		...rest
	}: {
		/** Classes added to the region; it needs a height, such as `h-52` or `size-full`. */
		class?: string;
		/** Classes added to the content, inside the scrolling viewport. */
		innerClass?: string;
		/** The content that scrolls. */
		children?: Snippet;
		/** Other props of Ark's `ScrollArea.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<ScrollArea.Root
	class={cn('relative overflow-hidden', className)}
	data-slot="scroll-area"
	{...rest}
>
	<ScrollArea.Viewport
		class="size-full scrollbar-none rounded-[inherit] [&::-webkit-scrollbar]:hidden"
	>
		<!-- Ark measures this element to size the thumb, so it grows with the content. -->
		<ScrollArea.Content class={cn('min-h-full', innerClass)}>
			{@render children?.()}
		</ScrollArea.Content>
	</ScrollArea.Viewport>
	<ScrollArea.Scrollbar
		orientation="vertical"
		class="group/scrollbar hidden w-2.5 touch-none border-l border-l-transparent p-px transition-colors select-none data-overflow-y:flex"
	>
		<ScrollArea.Thumb
			class="relative flex-1 rounded-full bg-border transition-colors group-data-dragging/scrollbar:bg-muted group-data-scrolling/scrollbar:bg-faint hover:bg-border-strong"
		/>
	</ScrollArea.Scrollbar>
	<ScrollArea.Corner />
</ScrollArea.Root>
