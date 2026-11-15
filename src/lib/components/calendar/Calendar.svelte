<!--
@component
A month calendar to pick a date or a range, inline (Ark DatePicker without its field);
`translations`, required, name its controls and give the role the table of each view is announced
as.
-->
<script lang="ts">
	import { DatePicker, type DatePickerRootProps } from '@ark-ui/svelte';
	import type { DatePickerDateView } from '@ark-ui/svelte/date-picker';
	import { cn } from '#lib/utils.js';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		class: className = '',
		translations,
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
		/**
		 * Other props of Ark's `DatePicker.Root`: `value` and `onValueChange`, `selectionMode`
		 * (`single`, `multiple` or `range`), `locale`.
		 */
		[key: string]: unknown;
	} = $props();

	const { tableRoleDescription, ...arkTranslations } = $derived(translations);

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

	const navBtnClass = cn(
		'inline-flex items-center justify-center size-8 rounded-lg border border-border',
		'bg-transparent hover:bg-hover hover:text-fg',
		'disabled:opacity-40 transition-colors'
	);
</script>

<DatePicker.Root
	class={cn('[--cell-size:--spacing(9)]', 'w-fit', className)}
	data-slot="calendar"
	inline
	translations={arkTranslations}
	{...rest}
>
	<DatePicker.View view="day" class="flex flex-col gap-1" data-slot="calendar-view">
		<DatePicker.ViewControl
			class="relative flex h-auto w-full items-center gap-1.5"
			data-slot="calendar-view-control"
		>
			<DatePicker.PrevTrigger class={navBtnClass} data-slot="calendar-prev-trigger">
				<MingcuteLeftLine class="size-4" aria-hidden="true" />
			</DatePicker.PrevTrigger>
			<DatePicker.ViewTrigger
				class="h-8 flex-1 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-hover hover:text-fg"
				data-slot="calendar-view-trigger"
			>
				<DatePicker.RangeText data-slot="calendar-range-text" />
			</DatePicker.ViewTrigger>
			<DatePicker.NextTrigger class={navBtnClass} data-slot="calendar-next-trigger">
				<MingcuteRightLine class="size-4" aria-hidden="true" />
			</DatePicker.NextTrigger>
		</DatePicker.ViewControl>
		<DatePicker.Context>
			{#snippet render(api)}
				<DatePicker.Table
					class="group w-full min-w-60 border-collapse"
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

	<DatePicker.View view="month" class="flex flex-col gap-1" data-slot="calendar-month-view">
		<DatePicker.ViewControl class="relative flex h-auto w-full items-center gap-1.5">
			<DatePicker.PrevTrigger class={navBtnClass}>
				<MingcuteLeftLine class="size-4" aria-hidden="true" />
			</DatePicker.PrevTrigger>
			<DatePicker.ViewTrigger
				class="h-8 flex-1 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-hover hover:text-fg"
			>
				<DatePicker.RangeText />
			</DatePicker.ViewTrigger>
			<DatePicker.NextTrigger class={navBtnClass}>
				<MingcuteRightLine class="size-4" aria-hidden="true" />
			</DatePicker.NextTrigger>
		</DatePicker.ViewControl>
		<DatePicker.Context>
			{#snippet render(api)}
				<DatePicker.Table
					class="group w-full min-w-60 border-collapse"
					aria-roledescription={tableRoleDescription('month')}
				>
					<DatePicker.TableBody>
						{#each api().getMonthsGrid() as months (months[0].value)}
							<DatePicker.TableRow class="mt-1 flex w-full">
								{#each months as month (month.value)}
									<DatePicker.TableCell
										class="relative h-(--cell-size) w-full text-center"
										value={month.value}
									>
										<DatePicker.TableCellTrigger class={cn(cellClass, 'w-16')}>
											{month.label}
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

	<DatePicker.View view="year" class="flex flex-col gap-1" data-slot="calendar-year-view">
		<DatePicker.ViewControl class="relative flex h-auto w-full items-center gap-1.5">
			<DatePicker.PrevTrigger class={navBtnClass}>
				<MingcuteLeftLine class="size-4" aria-hidden="true" />
			</DatePicker.PrevTrigger>
			<DatePicker.ViewTrigger
				class="h-8 flex-1 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-hover hover:text-fg"
			>
				<DatePicker.RangeText />
			</DatePicker.ViewTrigger>
			<DatePicker.NextTrigger class={navBtnClass}>
				<MingcuteRightLine class="size-4" aria-hidden="true" />
			</DatePicker.NextTrigger>
		</DatePicker.ViewControl>
		<DatePicker.Context>
			{#snippet render(api)}
				<DatePicker.Table
					class="group w-full min-w-60 border-collapse"
					aria-roledescription={tableRoleDescription('year')}
				>
					<DatePicker.TableBody>
						{#each api().getYearsGrid() as years (years[0].value)}
							<DatePicker.TableRow class="mt-1 flex w-full">
								{#each years as year (year.value)}
									<DatePicker.TableCell
										class="relative h-(--cell-size) w-full text-center"
										value={year.value}
									>
										<DatePicker.TableCellTrigger class={cn(cellClass, 'w-16')}>
											{year.label}
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
</DatePicker.Root>
