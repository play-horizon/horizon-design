<script lang="ts">
	import { Card } from '$lib/components/card';
	import { AspectRatio } from '$lib/components/aspect-ratio';
</script>

<section id="aspect-ratio">
	<p class="section-tag">Layout</p>
	<h2 class="mb-6 text-2xl font-bold">Aspect Ratio</h2>
	<Card>
		<div>
			<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg">
				<img
					src="https://images.unsplash.com/photo-1618609377864-68609b857e90?w=400"
					alt="Colourful abstract"
					class="h-full w-full object-cover"
				/>
			</AspectRatio>
		</div>
	</Card>
</section>
