<script lang="ts">
	import { Card } from '$lib/components/card';
	import { DatePicker } from '$lib/components/date-picker';
</script>

<section id="date-picker">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Date Picker</h2>
	<Card>
		<div>
			<DatePicker label="Select date" placeholder="Pick a date…" />
		</div>
	</Card>
</section>
