<!--
@component
Docs: DatePicker. Live examples of the DatePicker component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { DatePicker } from '$lib/components/date-picker';
</script>

<section id="date-picker">
	<Card>
		<div>
			<DatePicker
				label="Release date"
				placeholder="Pick a date…"
				translations={{
					dayCell: (day) => (day.selected ? `${day.valueText}, chosen` : day.valueText),
					prevTrigger: (view) => `Previous ${view}`,
					nextTrigger: (view) => `Next ${view}`,
					viewTrigger: (_view, nextView) => `Show the ${nextView ?? 'day'} view`,
					trigger: (open) => (open ? 'Close the calendar' : 'Open the calendar'),
					content: 'Calendar'
				}}
			/>
		</div>
	</Card>
</section>
