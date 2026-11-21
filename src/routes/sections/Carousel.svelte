<!--
@component
Docs: Carousel. A playground over every prop (the name, the number of slides, the arrows and dots,
looping, autoplay, mouse drag, the space between slides), then carousels of game art: with every
control, without arrows, without dots, and looping. Each arrow and dot shows its name in a tooltip.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '#lib/components/card/index.js';
	import { Carousel } from '#lib/components/carousel/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';
	import { art } from '../examples';

	const pictures = [
		{ src: art.skyline, alt: 'A city skyline at sunset' },
		{ src: art.frost, alt: 'A frozen lake under the stars' },
		{ src: art.neon, alt: 'A street lit by neon signs' },
		{ src: art.woods, alt: 'A path through the woods' }
	];

	const translations = {
		prevTrigger: 'Previous slide',
		nextTrigger: 'Next slide',
		indicator: (index: number) => `Go to slide ${index + 1}`,
		item: (index: number, count: number) => `${index + 1} of ${count}`,
		roleDescription: 'carousel',
		slideRoleDescription: 'slide'
	};

	const allSlides: Snippet[] = [first, second, third, fourth, fifth, sixth];
</script>

{#snippet picture(index: number)}
	{@const { src, alt } = pictures[index % pictures.length]}
	<img {src} {alt} class="aspect-video w-full rounded-lg object-cover" />
{/snippet}
{#snippet first()}{@render picture(0)}{/snippet}
{#snippet second()}{@render picture(1)}{/snippet}
{#snippet third()}{@render picture(2)}{/snippet}
{#snippet fourth()}{@render picture(3)}{/snippet}
{#snippet fifth()}{@render picture(4)}{/snippet}
{#snippet sixth()}{@render picture(5)}{/snippet}

<div class="grid gap-4">
	<Playground
		description="spacing is the gap between slides, seen while they move."
		controls={{
			label: text('Featured games'),
			slides: number(4, { min: 1, max: 6 }),
			showArrows: boolean(true),
			showIndicators: boolean(true),
			loop: boolean(),
			autoplay: boolean(),
			allowMouseDrag: boolean(),
			spacing: choice(['0px', '8px', '16px'])
		}}
	>
		{#snippet example(values)}
			<Carousel
				class="max-w-md"
				label={values.label}
				slides={allSlides.slice(0, values.slides)}
				showArrows={values.showArrows}
				showIndicators={values.showIndicators}
				loop={values.loop}
				autoplay={values.autoplay}
				allowMouseDrag={values.allowMouseDrag}
				spacing={values.spacing}
				{translations}
			/>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Arrows and dots">
			<Carousel label="Top games" slides={[first, second, third]} {translations} />
		</Card>
		<Card title="Without arrows" description="Swipe, or pick a dot.">
			<Carousel
				label="New games"
				slides={[second, third, fourth]}
				showArrows={false}
				{translations}
			/>
		</Card>
		<Card title="Without dots">
			<Carousel
				label="Popular games"
				slides={[third, fourth, first]}
				showIndicators={false}
				{translations}
			/>
		</Card>
		<Card title="Looping" description="The last slide leads back to the first.">
			<Carousel label="Every game" slides={[fourth, first, second]} loop {translations} />
		</Card>
	</div>
</div>
