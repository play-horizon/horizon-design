<!--
@component
Docs: AngleSlider. Live examples of the AngleSlider component.
-->
<script lang="ts">
	import { AngleSlider } from '#lib/components/angle-slider/index.js';
	import { Card } from '#lib/components/card/index.js';
</script>

<section id="angle-slider">
	<Card>
		<div class="flex justify-center">
			<AngleSlider label="Rotation" valueText={(angle) => `${angle}°`} defaultValue={45} />
		</div>
	</Card>
</section>
