<!--
@component
Docs: CircularSlider. Live examples of the CircularSlider component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { CircularSlider } from '#lib/components/circular-slider/index.js';
</script>

<section id="circular-slider">
	<Card>
		<div class="flex items-center justify-center">
			<CircularSlider
				label="Hue"
				valueText={(hue) => `${hue}°`}
				size={120}
				thickness={8}
				defaultValue={120}
			/>
		</div>
	</Card>
</section>
