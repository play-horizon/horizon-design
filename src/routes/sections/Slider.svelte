<!--
@component
Docs: Slider. Live examples of the Slider component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Slider } from '$lib/components/slider';
</script>

<section id="slider">
	<Card>
		<Slider defaultValue={[40]} min={0} max={100} label="Volume" showValue />
	</Card>
</section>
