<!--
@component
Docs: Calendar. Live examples of the Calendar component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Calendar } from '#lib/components/calendar/index.js';

	/** What the previous and next buttons move by in each view. */
	const periods = { day: 'month', month: 'year', year: 'decade' } as const;

	/** The role each view's table is announced as. */
	const tables = {
		day: 'calendar month',
		month: 'calendar year',
		year: 'calendar decade'
	} as const;
</script>

<section id="calendar">
	<Card>
		<div>
			<Calendar
				translations={{
					dayCell: (day) => (day.selected ? `${day.valueText}, chosen` : day.valueText),
					prevTrigger: (view) => `Previous ${periods[view]}`,
					nextTrigger: (view) => `Next ${periods[view]}`,
					viewTrigger: (_view, nextView) => `Show the ${nextView ?? 'day'} view`,
					tableRoleDescription: (view) => tables[view]
				}}
			/>
		</div>
	</Card>
</section>
