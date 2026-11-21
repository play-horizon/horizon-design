<!--
@component
Docs: AspectRatio. A playground over the ratio and the frame's width, then the common ratios side
by side, each holding the same image.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { AspectRatio } from '#lib/components/aspect-ratio/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, number } from '../playground/controls';
	import { art } from '../examples';

	const ratios = {
		'16 / 9': 16 / 9,
		'4 / 3': 4 / 3,
		'1 / 1': 1,
		'21 / 9': 21 / 9,
		'3 / 4': 3 / 4,
		'9 / 16': 9 / 16
	};
	const ratioNames = Object.keys(ratios) as (keyof typeof ratios)[];
</script>

<div class="grid gap-4">
	<Playground
		description="width is only the example frame's, in pixels."
		controls={{
			ratio: choice(ratioNames),
			width: number(320, { min: 80, max: 480, step: 20 })
		}}
	>
		{#snippet example(values)}
			<div class="max-w-full" style:width="{values.width}px">
				<AspectRatio ratio={ratios[values.ratio]} class="overflow-hidden rounded-lg">
					<img
						src={art.skyline}
						alt="A city skyline at sunset"
						class="h-full w-full object-cover"
					/>
				</AspectRatio>
			</div>
		{/snippet}
	</Playground>
	<Card title="Ratios" description="The image is cropped to fill each frame.">
		<div class="grid grid-cols-2 items-start gap-4 sm:grid-cols-3">
			{#each ratioNames as name (name)}
				<figure class="grid gap-1.5">
					<AspectRatio ratio={ratios[name]} class="overflow-hidden rounded-lg">
						<img src={art.frost} alt="" class="h-full w-full object-cover" />
					</AspectRatio>
					<figcaption class="text-xs text-muted">{name}</figcaption>
				</figure>
			{/each}
		</div>
	</Card>
</div>
