<!--
@component
Docs: Calendar. Live examples of the Calendar component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Calendar } from '$lib/components/calendar';
</script>

<section id="calendar">
	<Card>
		<div>
			<Calendar
				translations={{
					dayCell: (day) => (day.selected ? `${day.valueText}, chosen` : day.valueText),
					prevTrigger: (view) => `Previous ${view}`,
					nextTrigger: (view) => `Next ${view}`,
					viewTrigger: (_view, nextView) => `Show the ${nextView ?? 'day'} view`
				}}
			/>
		</div>
	</Card>
</section>
