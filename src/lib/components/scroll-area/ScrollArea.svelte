<!--
@component
A scrolling region with thin, themed scrollbars (Ark ScrollArea).
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
		class?: string;
		innerClass?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	let hasOverflow = $state(false);

	/** Shows the scrollbar only while the content is taller than the viewport. */
	function observeOverflow(content: HTMLElement) {
		const viewport = content.parentElement;
		if (!viewport) return;
		const check = () => (hasOverflow = content.offsetHeight > viewport.clientHeight);
		const observer = new ResizeObserver(check);
		observer.observe(content);
		observer.observe(viewport);
		check();
		return () => observer.disconnect();
	}
</script>

<ScrollArea.Root
	class={cn('relative overflow-hidden', className)}
	data-slot="scroll-area"
	{...rest}
>
	<ScrollArea.Viewport
		class="size-full scrollbar-none rounded-[inherit] [&::-webkit-scrollbar]:hidden"
	>
		<div class={cn('size-full', innerClass)} {@attach observeOverflow}>
			{@render children?.()}
		</div>
	</ScrollArea.Viewport>
	<ScrollArea.Scrollbar
		orientation="vertical"
		class={cn(
			'group/scrollbar w-2.5 touch-none border-l border-l-transparent p-px transition-colors select-none',
			hasOverflow ? 'flex' : 'hidden'
		)}
	>
		<ScrollArea.Thumb
			class="relative flex-1 rounded-full bg-border transition-colors group-data-dragging/scrollbar:bg-muted group-data-scrolling/scrollbar:bg-faint hover:bg-border-strong"
		/>
	</ScrollArea.Scrollbar>
	<ScrollArea.Corner />
</ScrollArea.Root>
