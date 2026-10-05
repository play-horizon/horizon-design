<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Slider } from '$lib/components/slider';
</script>

<section id="slider">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Slider</h2>
	<Card>
		<Slider defaultValue={[40]} min={0} max={100} label="Volume" showValue />
	</Card>
</section>
