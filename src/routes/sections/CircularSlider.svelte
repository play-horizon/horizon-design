<!--
@component
Docs: CircularSlider. Live examples of the CircularSlider component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { CircularSlider } from '$lib/components/circular-slider';
</script>

<section id="circular-slider">
	<Card>
		<div class="flex items-center justify-center">
			<CircularSlider size={120} thickness={8} defaultValue={120} suffix="°" />
		</div>
	</Card>
</section>
