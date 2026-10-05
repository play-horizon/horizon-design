<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Carousel } from '$lib/components/carousel';
</script>

<section id="carousel">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Carousel</h2>
	<Card>
		<div>
			{#snippet carouselSlide1()}
				<div
					class="bg-primary-subtle-bg text-primary flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
				>
					Slide 1
				</div>
			{/snippet}
			{#snippet carouselSlide2()}
				<div
					class="bg-success-subtle-bg text-success flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
				>
					Slide 2
				</div>
			{/snippet}
			{#snippet carouselSlide3()}
				<div
					class="bg-warning-subtle-bg text-warning flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
				>
					Slide 3
				</div>
			{/snippet}
			<Carousel slides={[carouselSlide1, carouselSlide2, carouselSlide3]} />
		</div>
	</Card>
</section>
