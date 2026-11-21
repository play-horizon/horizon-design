<!--
@component
The calendar's three views (days, months, years) and their controls, shared by `Calendar` and the
popover of `DatePicker`; rendered inside Ark's `DatePicker.Root`, whose state it shows. The day view
always shows six weeks (the root sets `fixedWeeks`), and the month and year views take exactly its
size, so the calendar never changes size as the user moves between them. The previous and next
buttons show their accessible name in a tooltip too, and the view switch is named by the visible
month, year or decade first, then by what it does, so its name holds its label (WCAG 2.5.3).
-->
<script lang="ts">
	import { DatePicker, type DatePickerRootProps } from '@ark-ui/svelte';
	import type { DatePickerDateView } from '@ark-ui/svelte/date-picker';
	import { cn } from '#lib/utils.js';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import type { CalendarTriggerIds } from './trigger-ids';

	let {
		ids,
		translations,
		tableRoleDescription,
		maxView = 'year'
	}: {
		/** The ids of the previous and next buttons, the root's own (`calendarTriggerIds`). */
		ids: CalendarTriggerIds;
		/** The names of the previous and next buttons and of the view switch, as the root has them. */
		translations: Required<
			Pick<
				NonNullable<DatePickerRootProps['translations']>,
				'prevTrigger' | 'nextTrigger' | 'viewTrigger'
			>
		>;
		/** The role the table of each view is announced as, such as "calendar month" for `day`. */
		tableRoleDescription: (view: DatePickerDateView) => string;
		/** The root's widest view, which has no view to switch to. */
		maxView?: DatePickerDateView;
	} = $props();

	const views: DatePickerDateView[] = ['day', 'month', 'year'];

	/** The view the view switch opens from `view`, as Ark picks it; none from the widest view. */
	function nextView(view: DatePickerDateView): DatePickerDateView | undefined {
		const next = views.indexOf(view) + 1;
		return next <= views.indexOf(maxView) ? views[next] : undefined;
	}

	/** The text Ark's `RangeText` shows: the visible month, year or decade, or a range of them. */
	function rangeText({ start, end }: { start: string; end: string }): string {
		return [...new Set([start, end])].filter(Boolean).join(' - ');
	}

	const cellClass = cn(
		'inline-flex items-center justify-center',
		'h-9 w-full min-w-9',
		'whitespace-nowrap font-normal text-sm text-fg leading-none',
		'rounded-lg border border-transparent',
		'hover:bg-hover hover:text-fg',
		'data-today:after:absolute data-today:after:bottom-1 data-today:after:left-1/2 data-today:after:size-1 data-today:after:-translate-x-1/2 data-today:after:rounded-full data-today:after:bg-primary data-today:data-selected:after:bg-background',
		'outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30',
		'data-disabled:pointer-events-none data-disabled:opacity-64',
		'data-unavailable:pointer-events-none data-unavailable:line-through data-unavailable:opacity-64',
		'data-selected:bg-primary! data-selected:text-on-primary!'
	);

	const navButtonClass = cn(
		'inline-flex items-center justify-center size-8 rounded-lg border border-border',
		'bg-transparent hover:bg-hover hover:text-fg',
		'disabled:opacity-40 transition-colors'
	);

	// Every view has the day view's size (cells of --cell-size, which the root sets): seven cells wide; the view control (h-8), the gap under
	// it and seven rows (the weekday names and six weeks) of a cell and its top margin (mt-1) high.
	const viewClass =
		'flex h-[calc(var(--spacing)*16+var(--cell-size)*7)] w-[calc(var(--cell-size)*7)] flex-col gap-1';

	// The month and year grids stretch their rows and cells over that size, four to a row (the
	// columns Ark's arrow keys move by in those views, and the grid-cols-4 of their rows).
	const gridColumns = 4;
</script>

{#snippet viewControl(view: DatePickerDateView)}
	<DatePicker.ViewControl
		class="relative flex h-auto w-full items-center gap-1.5"
		data-slot="calendar-view-control"
	>
		<Tooltip content={translations.prevTrigger(view)} triggerId={ids.prevTrigger(view)}>
			{#snippet trigger(props)}
				<DatePicker.PrevTrigger {...props} class={navButtonClass} data-slot="calendar-prev-trigger">
					<MingcuteLeftLine class="size-4" aria-hidden="true" />
				</DatePicker.PrevTrigger>
			{/snippet}
		</Tooltip>
		<DatePicker.Context>
			{#snippet render(api)}
				<!-- Named by the visible month, year or decade first, then by what it does, so its
				     name holds its label (WCAG 2.5.3). -->
				<DatePicker.ViewTrigger
					class="h-8 flex-1 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-hover hover:text-fg"
					aria-label="{rangeText(api().visibleRangeText)}, {translations.viewTrigger(
						view,
						nextView(view)
					)}"
					data-slot="calendar-view-trigger"
				>
					<DatePicker.RangeText data-slot="calendar-range-text" />
				</DatePicker.ViewTrigger>
			{/snippet}
		</DatePicker.Context>
		<Tooltip content={translations.nextTrigger(view)} triggerId={ids.nextTrigger(view)}>
			{#snippet trigger(props)}
				<DatePicker.NextTrigger {...props} class={navButtonClass} data-slot="calendar-next-trigger">
					<MingcuteRightLine class="size-4" aria-hidden="true" />
				</DatePicker.NextTrigger>
			{/snippet}
		</Tooltip>
	</DatePicker.ViewControl>
{/snippet}

{#snippet grid(view: 'month' | 'year', cells: { label: string; value: number }[][])}
	<DatePicker.Table
		class="flex w-full flex-1 border-collapse flex-col"
		aria-roledescription={tableRoleDescription(view)}
		data-slot="calendar-table"
	>
		<DatePicker.TableBody class="flex flex-1 flex-col gap-1 pt-1">
			{#each cells as row (row[0].value)}
				<DatePicker.TableRow class="grid w-full flex-1 grid-cols-4 gap-1">
					{#each row as cell (cell.value)}
						<DatePicker.TableCell class="relative text-center" value={cell.value}>
							<DatePicker.TableCellTrigger class={cn(cellClass, 'h-full')}>
								{cell.label}
							</DatePicker.TableCellTrigger>
						</DatePicker.TableCell>
					{/each}
				</DatePicker.TableRow>
			{/each}
		</DatePicker.TableBody>
	</DatePicker.Table>
{/snippet}

<DatePicker.View view="day" class={viewClass} data-slot="calendar-view">
	{@render viewControl('day')}
	<DatePicker.Context>
		{#snippet render(api)}
			<DatePicker.Table
				class="group w-full border-collapse"
				aria-roledescription={tableRoleDescription('day')}
				data-slot="calendar-table"
			>
				<DatePicker.TableHead data-slot="calendar-table-head">
					<DatePicker.TableRow class="mt-1 flex w-full" data-slot="calendar-table-row">
						{#each api().weekDays as weekDay (weekDay.long)}
							<DatePicker.TableHeader
								class="flex h-(--cell-size) w-full items-center justify-center rounded-lg text-xs font-medium text-faint"
								data-slot="calendar-table-header"
							>
								{weekDay.narrow}
							</DatePicker.TableHeader>
						{/each}
					</DatePicker.TableRow>
				</DatePicker.TableHead>
				<DatePicker.TableBody data-slot="calendar-table-body">
					{#each api().weeks as week (week[0].toString())}
						<DatePicker.TableRow class="mt-1 flex w-full" data-slot="calendar-table-row">
							{#each week as day (day.toString())}
								<DatePicker.TableCell
									class="relative h-(--cell-size) w-full text-center [&:first-child[aria-selected=true]_div]:rounded-l-lg [&:last-child[aria-selected=true]_div]:rounded-r-lg"
									data-slot="calendar-table-cell"
									value={day}
								>
									<DatePicker.TableCellTrigger
										class={cellClass}
										data-slot="calendar-table-cell-trigger"
									>
										{day.day}
									</DatePicker.TableCellTrigger>
								</DatePicker.TableCell>
							{/each}
						</DatePicker.TableRow>
					{/each}
				</DatePicker.TableBody>
			</DatePicker.Table>
		{/snippet}
	</DatePicker.Context>
</DatePicker.View>

<DatePicker.View view="month" class={viewClass} data-slot="calendar-month-view">
	{@render viewControl('month')}
	<DatePicker.Context>
		{#snippet render(api)}
			{@render grid('month', api().getMonthsGrid({ columns: gridColumns, format: 'short' }))}
		{/snippet}
	</DatePicker.Context>
</DatePicker.View>

<DatePicker.View view="year" class={viewClass} data-slot="calendar-year-view">
	{@render viewControl('year')}
	<DatePicker.Context>
		{#snippet render(api)}
			{@render grid('year', api().getYearsGrid({ columns: gridColumns }))}
		{/snippet}
	</DatePicker.Context>
</DatePicker.View>
