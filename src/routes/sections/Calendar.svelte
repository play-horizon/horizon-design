<!--
@component
Docs: Calendar. A playground over every prop, and the three selection modes side by side. The day
view always shows six weeks, and the month and year views (open them with the title) keep its size.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Calendar } from '#lib/components/calendar/index.js';
	import { parseDate } from '@ark-ui/svelte/date-picker';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';

	/** What the previous and next buttons move by in each view. */
	const periods = { day: 'month', month: 'year', year: 'decade' } as const;

	/** The role each view's table is announced as. */
	const tables = {
		day: 'calendar month',
		month: 'calendar year',
		year: 'calendar decade'
	} as const;

	const translations = {
		dayCell: (day: { selected: boolean; valueText: string }) =>
			day.selected ? `${day.valueText}, chosen` : day.valueText,
		prevTrigger: (view: keyof typeof periods) => `Previous ${periods[view]}`,
		nextTrigger: (view: keyof typeof periods) => `Next ${periods[view]}`,
		viewTrigger: (_view: string, nextView: string | undefined) =>
			`show the ${nextView ?? 'day'} view`,
		tableRoleDescription: (view: keyof typeof tables) => tables[view]
	};

	const modes = ['single', 'multiple', 'range'] as const;
</script>

<div class="grid gap-4">
	<Playground
		description="Changing the selection mode, the locale or the first day of the week starts it over."
		controls={{
			selectionMode: choice(modes),
			locale: choice(['en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP']),
			startOfWeek: number(0, { min: 0, max: 6 }),
			outsideDaySelectable: boolean(),
			limitToThisYear: boolean(),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			{#key [values.selectionMode, values.locale, values.startOfWeek]}
				<Calendar
					{translations}
					selectionMode={values.selectionMode}
					locale={values.locale}
					startOfWeek={values.startOfWeek}
					outsideDaySelectable={values.outsideDaySelectable}
					min={values.limitToThisYear ? parseDate('2026-01-01') : undefined}
					max={values.limitToThisYear ? parseDate('2026-12-31') : undefined}
					disabled={values.disabled}
					readOnly={values.readOnly}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Selection modes" description="One day, several days, and a range.">
		<div class="flex flex-wrap gap-8">
			{#each modes as mode (mode)}
				<div class="grid gap-2">
					<p class="text-xs font-medium text-muted">{mode}</p>
					<Calendar {translations} selectionMode={mode} />
				</div>
			{/each}
		</div>
	</Card>
</div>
