<script lang="ts">
	import { Card } from '$lib/components/card';
	import { CircularSlider } from '$lib/components/circular-slider';
</script>

<section id="circular-slider">
	<p class="section-tag">Controls</p>
	<h2 class="mb-6 text-2xl font-bold">Circular Slider</h2>
	<Card>
		<div class="flex items-center justify-center">
			<CircularSlider size={120} thickness={8} defaultValue={120} suffix="°" />
		</div>
	</Card>
</section>
