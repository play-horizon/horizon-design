<!--
@component
Docs: Carousel. Live examples of the Carousel component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Carousel } from '#lib/components/carousel/index.js';
</script>

<section id="carousel">
	<Card>
		<div>
			{#snippet carouselSlide1()}
				<div
					class="flex h-40 items-center justify-center rounded-lg bg-primary-subtle text-lg font-semibold text-primary"
				>
					Slide 1
				</div>
			{/snippet}
			{#snippet carouselSlide2()}
				<div
					class="flex h-40 items-center justify-center rounded-lg bg-success-subtle text-lg font-semibold text-success"
				>
					Slide 2
				</div>
			{/snippet}
			{#snippet carouselSlide3()}
				<div
					class="flex h-40 items-center justify-center rounded-lg bg-warning-subtle text-lg font-semibold text-warning"
				>
					Slide 3
				</div>
			{/snippet}
			<Carousel
				slides={[carouselSlide1, carouselSlide2, carouselSlide3]}
				label="Featured games"
				translations={{
					prevTrigger: 'Previous slide',
					nextTrigger: 'Next slide',
					indicator: (index) => `Go to slide ${index + 1}`,
					item: (index, count) => `${index + 1} of ${count}`,
					roleDescription: 'carousel',
					slideRoleDescription: 'slide'
				}}
			/>
		</div>
	</Card>
</section>
