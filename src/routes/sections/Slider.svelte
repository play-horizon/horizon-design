<!--
@component
Docs: Slider. One value, and a range with two thumbs.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Slider } from '$lib/components/slider';
</script>

<section id="slider">
	<Card>
		<div class="space-y-6">
			<Slider defaultValue={[40]} min={0} max={100} label="Volume" showValue />
			<Slider defaultValue={[20, 80]} min={0} max={100} label="Price range" showValue />
		</div>
	</Card>
</section>
