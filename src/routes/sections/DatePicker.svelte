<!--
@component
Docs: DatePicker. Live examples of the DatePicker component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { DatePicker } from '#lib/components/date-picker/index.js';

	/** What the previous and next buttons move by in each view. */
	const periods = { day: 'month', month: 'year', year: 'decade' } as const;

	/** The role each view's table is announced as. */
	const tables = {
		day: 'calendar month',
		month: 'calendar year',
		year: 'calendar decade'
	} as const;
</script>

<section id="date-picker">
	<Card>
		<div>
			<DatePicker
				label="Release date"
				placeholder="Pick a date…"
				translations={{
					dayCell: (day) => (day.selected ? `${day.valueText}, chosen` : day.valueText),
					prevTrigger: (view) => `Previous ${periods[view]}`,
					nextTrigger: (view) => `Next ${periods[view]}`,
					viewTrigger: (_view, nextView) => `Show the ${nextView ?? 'day'} view`,
					trigger: (open) => (open ? 'Close the calendar' : 'Open the calendar'),
					content: 'Calendar',
					contentRoleDescription: 'date picker',
					tableRoleDescription: (view) => tables[view]
				}}
			/>
		</div>
	</Card>
</section>
