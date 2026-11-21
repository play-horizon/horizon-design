<!--
@component
A scrolling region with a thin, themed vertical scrollbar (Ark ScrollArea), shown only while the
content is taller than the region. The scrollbar keeps 8 px from the region's top and bottom, so a
rounded container's corners never cover its thumb. While the content overflows, the viewport takes
the keyboard focus, so the arrow keys scroll it even when nothing inside is focusable; it is a
region named by `label`, required.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ScrollArea } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		innerClass = '',
		label,
		children,
		...rest
	}: {
		/** Classes added to the region; it needs a height, such as `h-52` or `size-full`. */
		class?: string;
		/** Classes added to the content, inside the scrolling viewport. */
		innerClass?: string;
		/**
		 * The region's name, translated, such as "Players": the viewport is a region of that name,
		 * which keyboard users reach while it scrolls.
		 */
		label: string;
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
	<ScrollArea.Context>
		{#snippet render(api)}
			<!-- In the tab order only while there is something to scroll: the keyboard can then scroll
			     it even when nothing inside takes the focus. Out of it otherwise, whatever Ark decides. -->
			<ScrollArea.Viewport
				tabindex={api().hasOverflowY ? 0 : -1}
				role="region"
				aria-label={label}
				class="size-full scrollbar-none rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset [&::-webkit-scrollbar]:hidden"
				data-slot="scroll-area-viewport"
			>
				<!-- Ark measures this element to size the thumb, so it grows with the content. -->
				<ScrollArea.Content class={cn('min-h-full', innerClass)}>
					{@render children?.()}
				</ScrollArea.Content>
			</ScrollArea.Viewport>
		{/snippet}
	</ScrollArea.Context>
	<ScrollArea.Scrollbar
		orientation="vertical"
		data-slot="scroll-area-scrollbar"
		class="group/scrollbar hidden w-2.5 touch-none border-l border-l-transparent px-px py-2 transition-colors select-none data-overflow-y:flex"
	>
		<ScrollArea.Thumb
			class="relative flex-1 rounded-full bg-border transition-colors group-data-dragging/scrollbar:bg-muted group-data-scrolling/scrollbar:bg-faint hover:bg-border-strong"
		/>
	</ScrollArea.Scrollbar>
	<ScrollArea.Corner />
</ScrollArea.Root>
