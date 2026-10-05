<script lang="ts">
	import { Card } from '$lib/components/card';
	import { NumberInput } from '$lib/components/number-input';
</script>

<section id="number-input">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Number Input</h2>
	<Card>
		<div>
			<div class="max-w-xs">
				<NumberInput min={0} max={100} defaultValue={5} label="Quantity" />
			</div>
		</div>
	</Card>
</section>
