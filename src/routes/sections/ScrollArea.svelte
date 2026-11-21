<!--
@component
Docs: ScrollArea. A playground over the region's size, content and name, and an overflowing and a
fitting region side by side: the scrollbar keeps clear of the rounded corners, and only the
overflowing region is a tab stop.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ScrollArea } from '#lib/components/scroll-area/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, number, text } from '../playground/controls';

	const items = Array.from({ length: 40 }, (_, index) => ({
		id: index + 1,
		text: `Item ${index + 1}: lorem ipsum dolor sit amet consectetur`
	}));
</script>

{#snippet list(count: number)}
	<div class="space-y-3">
		{#each items.slice(0, count) as item (item.id)}
			<div class="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-hover">
				<div
					class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary"
				>
					{item.id}
				</div>
				<p class="text-sm text-fg-2">{item.text}</p>
			</div>
		{/each}
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			items: number(20, { min: 1, max: 40 }),
			label: text('Items'),
			height: choice(['h-40', 'h-52', 'h-72'], 'h-52'),
			corners: choice(['rounded-xl', 'rounded-lg', 'rounded-none'])
		}}
	>
		{#snippet example(values)}
			<ScrollArea
				class="w-full border border-border p-4 {values.height} {values.corners}"
				label={values.label || 'Items'}
			>
				{@render list(values.items)}
			</ScrollArea>
		{/snippet}
	</Playground>
	<Card title="Overflowing and fitting">
		<div class="grid gap-4 sm:grid-cols-2">
			<ScrollArea class="h-52 rounded-xl border border-border p-4" label="Many items">
				{@render list(20)}
			</ScrollArea>
			<ScrollArea class="h-52 rounded-xl border border-border p-4" label="Two items">
				{@render list(2)}
			</ScrollArea>
		</div>
	</Card>
</div>
