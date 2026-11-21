<!--
@component
Docs: Skeleton. A playground that shapes a skeleton (a line, a circle or a block, its width and
height, the number of lines) through the classes it takes, then the usual placeholders side by
side: a profile row, a paragraph and a row of cards.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Skeleton } from '#lib/components/skeleton/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, number } from '../playground/controls';

	const shapes = {
		line: 'h-3.5 rounded-md',
		circle: 'aspect-square rounded-full',
		block: 'h-24 rounded-xl'
	};
	const widths = { full: 'w-full', 'two-thirds': 'w-2/3', half: 'w-1/2', small: 'w-12' };
</script>

<div class="grid gap-4">
	<Playground
		description="A skeleton has no props of its own: its classes give its size and shape."
		controls={{
			shape: choice(['line', 'circle', 'block'] as const),
			width: choice(['full', 'two-thirds', 'half', 'small'] as const),
			count: number(3, { min: 1, max: 8 })
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-md gap-2.5">
				{#each Array.from({ length: values.count }, (_, index) => index) as index (index)}
					<Skeleton class="{shapes[values.shape]} {widths[values.width]}" />
				{/each}
			</div>
		{/snippet}
	</Playground>
	<Card title="Placeholders" description="Pages show skeletons in the shape of what loads.">
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="flex items-start gap-4">
				<Skeleton class="size-12 shrink-0 rounded-full" />
				<div class="flex-1 space-y-2.5 pt-1">
					<Skeleton class="h-3.5 w-2/5" />
					<Skeleton class="h-3 w-3/4" />
					<Skeleton class="h-3 w-1/2" />
				</div>
			</div>
			<div class="space-y-2.5">
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-4/5" />
				<Skeleton class="h-4 w-2/3" />
			</div>
		</div>
		<div class="mt-6 grid gap-3 sm:grid-cols-3">
			<Skeleton class="h-24 rounded-xl" />
			<Skeleton class="h-24 rounded-xl" />
			<Skeleton class="h-24 rounded-xl" />
		</div>
	</Card>
</div>
