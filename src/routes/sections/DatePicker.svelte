<!--
@component
Docs: DatePicker. A playground over every prop (with `openOnClick`, a press on the field opens the
calendar), and the three selection modes side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { DatePicker } from '#lib/components/date-picker/index.js';
	import { parseDate } from '@ark-ui/svelte/date-picker';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

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
		trigger: (open: boolean) => (open ? 'Close the calendar' : 'Open the calendar'),
		content: 'Calendar',
		contentRoleDescription: 'date picker',
		tableRoleDescription: (view: keyof typeof tables) => tables[view]
	};

	const modes = ['single', 'multiple', 'range'] as const;
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Release date'),
			placeholder: text('Pick a date…'),
			openOnClick: boolean(true),
			selectionMode: choice(modes),
			locale: choice(['en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP']),
			closeOnSelect: boolean(true),
			limitToThisYear: boolean(),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			{#key [values.openOnClick, values.selectionMode, values.locale, values.closeOnSelect]}
				<DatePicker
					class="w-64"
					{translations}
					label={values.label}
					placeholder={values.placeholder}
					openOnClick={values.openOnClick}
					selectionMode={values.selectionMode}
					locale={values.locale}
					closeOnSelect={values.closeOnSelect}
					min={values.limitToThisYear ? parseDate('2026-01-01') : undefined}
					max={values.limitToThisYear ? parseDate('2026-12-31') : undefined}
					disabled={values.disabled}
					readOnly={values.readOnly}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Selection modes">
		<div class="grid gap-6 sm:grid-cols-3">
			{#each modes as mode (mode)}
				<DatePicker
					{translations}
					label="{mode[0].toUpperCase()}{mode.slice(1)} date"
					placeholder="Pick a date…"
					selectionMode={mode}
					openOnClick
				/>
			{/each}
		</div>
	</Card>
</div>
