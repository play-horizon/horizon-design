<!--
@component
A month calendar to pick a date or a range, inline (Ark DatePicker without its field);
`translations`, required, name its controls (the previous and next buttons show their name in a
tooltip too) and give the role the table of each view is announced as. The day view always shows
six weeks, and the month and year views take exactly its size, so the calendar never changes size
as the user moves between them. Its size follows `--cell-size` (36 px by default), which the app
can set through `class`, such as `[--cell-size:--spacing(8)]`.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { DatePicker, type DatePickerRootProps } from '@ark-ui/svelte';
	import type { DatePickerDateView } from '@ark-ui/svelte/date-picker';
	import { cn } from '#lib/utils.js';
	import CalendarViews from './CalendarViews.svelte';
	import { calendarTriggerIds } from './trigger-ids';

	let {
		class: className = '',
		translations,
		ids: appIds,
		...rest
	}: {
		/** Classes merged onto the calendar. */
		class?: string;
		/**
		 * The accessible names Ark gives the controls: each day (`dayCell(state)`, from its
		 * formatted `valueText`), the previous and next buttons and the view switch (`viewTrigger`);
		 * and the role the table of each view is announced as (`tableRoleDescription(view)`, such as
		 * "calendar month" for `day`).
		 */
		translations: Required<
			Pick<
				NonNullable<DatePickerRootProps['translations']>,
				'dayCell' | 'prevTrigger' | 'nextTrigger' | 'viewTrigger'
			>
		> & { tableRoleDescription: (view: DatePickerDateView) => string };
		/** Ark's `ids`, merged with the ids the kit gives the buttons it adds a tooltip to, which win. */
		ids?: ComponentProps<typeof DatePicker.Root>['ids'];
		/**
		 * Other props of Ark's `DatePicker.Root`: `value` and `onValueChange`, `selectionMode`
		 * (`single`, `multiple` or `range`), `locale`.
		 */
		[key: string]: unknown;
	} = $props();

	const { tableRoleDescription, ...arkTranslations } = $derived(translations);
	const uid = $props.id();
	const ids = calendarTriggerIds(uid);
</script>

<DatePicker.Root
	class={cn('w-fit [--cell-size:--spacing(9)]', className)}
	data-slot="calendar"
	inline
	fixedWeeks
	ids={{ ...appIds, ...ids }}
	translations={arkTranslations}
	{...rest}
>
	<CalendarViews
		{ids}
		translations={arkTranslations}
		{tableRoleDescription}
		maxView={rest.maxView as DatePickerDateView | undefined}
	/>
</DatePicker.Root>
