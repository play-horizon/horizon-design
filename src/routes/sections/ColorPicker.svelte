<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ColorPicker, parseColor } from '$lib/components/color-picker';
</script>

<section id="color-picker">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Color Picker</h2>
	<Card>
		<div>
			<ColorPicker label="Brand color" value={parseColor('#737efa')} />
		</div>
	</Card>
</section>
