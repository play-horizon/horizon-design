<!--
@component
A date field with a calendar popover (Ark DatePicker). `label` names the field; `placeholder` and
`translations` (the names of the controls, which the icon buttons show in a tooltip too, and the
roles the popover and its tables are announced as) are passed in. The popover's calendar is
`Calendar`'s: six weeks, and month and year views of the same size. `openOnClick` opens it as soon
as the field is pressed.
-->
<script lang="ts">
	import { DatePicker, type DatePickerRootProps } from '@ark-ui/svelte';
	import type {
		DatePickerDateView,
		DatePickerValueChangeDetails,
		DateValue
	} from '@ark-ui/svelte/date-picker';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import MingcuteCalendarLine from '~icons/mingcute/calendar-line';
	import CalendarViews from '../calendar/CalendarViews.svelte';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		class: className = '',
		label,
		placeholder = '',
		value = $bindable(),
		onValueChange,
		openOnClick = false,
		translations,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The field's visible label, which names it, such as "Release date". */
		label: string;
		/** The text shown while no date is chosen. */
		placeholder?: string;
		/** The chosen dates (bindable); when unset, `defaultValue` gives the first ones. */
		value?: DateValue[];
		/** Called with the new dates when they change. */
		onValueChange?: (details: DatePickerValueChangeDetails) => void;
		/**
		 * Opens the calendar as soon as the field is pressed, not only from the calendar button or
		 * the arrow keys; the field keeps the focus, so typing a date starts at once.
		 */
		openOnClick?: boolean;
		/**
		 * The accessible names Ark gives the controls: the calendar button (`trigger(open)`), the
		 * popover (`content`), each day (`dayCell(state)`, from its formatted `valueText`), the
		 * previous and next buttons and the view switch (`viewTrigger`); and the roles the popover
		 * (`contentRoleDescription`, such as "date picker") and the table of each view
		 * (`tableRoleDescription(view)`, such as "calendar month" for `day`) are announced as.
		 */
		translations: Required<
			Pick<
				NonNullable<DatePickerRootProps['translations']>,
				'trigger' | 'content' | 'dayCell' | 'prevTrigger' | 'nextTrigger' | 'viewTrigger'
			>
		> & {
			contentRoleDescription: string;
			tableRoleDescription: (view: DatePickerDateView) => string;
		};
		/**
		 * Other props of Ark's `DatePicker.Root`: `selectionMode` (`single`, `multiple` or
		 * `range`), `locale`, `min` and `max`.
		 */
		[key: string]: unknown;
	} = $props();

	const { contentRoleDescription, tableRoleDescription, ...arkTranslations } =
		$derived(translations);
</script>

<DatePicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="date-picker"
	{value}
	{openOnClick}
	fixedWeeks
	translations={arkTranslations}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	<DatePicker.Label class="text-sm font-medium text-fg">{label}</DatePicker.Label>
	<DatePicker.Control class="relative flex items-center">
		<DatePicker.Input
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 pr-9 text-sm text-fg shadow-sm outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
			{placeholder}
		/>
		<DatePicker.Context>
			{#snippet render(api)}
				<Tooltip content={arkTranslations.trigger(api().open)}>
					{#snippet trigger(props)}
						<DatePicker.Trigger
							{...props}
							class="absolute top-1/2 right-2 -translate-y-1/2 text-muted transition-colors hover:text-fg"
						>
							<MingcuteCalendarLine class="size-4" aria-hidden="true" />
						</DatePicker.Trigger>
					{/snippet}
				</Tooltip>
			{/snippet}
		</DatePicker.Context>
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content
				aria-roledescription={contentRoleDescription}
				class="z-50 w-fit rounded-xl border border-border bg-raised p-3 shadow-lg outline-none [--cell-size:--spacing(9)] data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
				data-slot="date-picker-content"
			>
				<CalendarViews
					translations={arkTranslations}
					{tableRoleDescription}
					maxView={rest.maxView as DatePickerDateView | undefined}
				/>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker.Root>
