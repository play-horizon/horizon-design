<script lang="ts">
	import { AngleSlider } from '$lib/components/angle-slider';
	import { Card } from '$lib/components/card';
</script>

<section id="angle-slider">
	<p class="section-tag">Controls</p>
	<h2 class="mb-6 text-2xl font-bold">Angle Slider</h2>
	<Card>
		<div class="flex justify-center">
			<AngleSlider defaultValue={45} />
		</div>
	</Card>
</section>
