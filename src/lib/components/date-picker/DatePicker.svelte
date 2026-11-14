<!--
@component
A date field with a calendar popover (Ark DatePicker); `placeholder` and Ark `translations` are
passed in.
-->
<script lang="ts">
	import { DatePicker } from '@ark-ui/svelte';
	import type { DateValue } from '@ark-ui/svelte/date-picker';
	import { cn } from '$lib/utils';
	import MingcuteCalendarLine from '~icons/mingcute/calendar-line';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		class: className = '',
		label = '',
		placeholder = '',
		value = $bindable(undefined),
		...rest
	}: {
		class?: string;
		label?: string;
		/** The text shown while no date is chosen. */
		placeholder?: string;
		value?: DateValue[];
		[key: string]: unknown;
	} = $props();

	const cellClass =
		'flex size-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-hover data-today:font-semibold data-selected:bg-primary data-selected:text-on-primary data-outside-range:opacity-30 data-disabled:pointer-events-none data-disabled:opacity-30';

	const navBtnClass =
		'inline-flex items-center justify-center size-7 rounded-lg text-muted hover:bg-hover hover:text-fg transition-colors';
</script>

<DatePicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="date-picker"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<DatePicker.Label class="text-sm font-medium text-fg">{label}</DatePicker.Label>
	{/if}
	<DatePicker.Control class="relative flex items-center">
		<DatePicker.Input
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 pr-9 text-sm text-fg shadow-sm outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
			{placeholder}
		/>
		<DatePicker.Trigger
			class="absolute top-1/2 right-2 -translate-y-1/2 text-muted transition-colors hover:text-fg"
		>
			<MingcuteCalendarLine class="size-4" />
		</DatePicker.Trigger>
	</DatePicker.Control>
	<DatePicker.Positioner>
		<DatePicker.Content
			class="z-50 w-fit rounded-xl border border-border bg-raised p-3 shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
			data-slot="date-picker-content"
		>
			<DatePicker.View view="day">
				<div class="mb-3 flex items-center justify-between">
					<DatePicker.PrevTrigger class={navBtnClass}>
						<MingcuteLeftLine class="size-4" />
					</DatePicker.PrevTrigger>
					<DatePicker.ViewTrigger
						class="text-sm font-medium text-fg transition-colors hover:text-primary"
					>
						<DatePicker.RangeText />
					</DatePicker.ViewTrigger>
					<DatePicker.NextTrigger class={navBtnClass}>
						<MingcuteRightLine class="size-4" />
					</DatePicker.NextTrigger>
				</div>
				<DatePicker.Context>
					{#snippet render(api)}
						<DatePicker.Table class="w-full border-collapse">
							<DatePicker.TableHead>
								<DatePicker.TableRow>
									{#each api().weekDays as weekDay, i (i)}
										<DatePicker.TableHeader
											class="h-8 w-8 pb-2 text-center text-xs font-medium text-muted"
										>
											{weekDay.short}
										</DatePicker.TableHeader>
									{/each}
								</DatePicker.TableRow>
							</DatePicker.TableHead>
							<DatePicker.TableBody>
								{#each api().weeks as week, i (i)}
									<DatePicker.TableRow>
										{#each week as day (day.toString())}
											<DatePicker.TableCell value={day}>
												<DatePicker.TableCellTrigger class={cellClass}>
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

			<DatePicker.View view="month">
				<div class="mb-3 flex items-center justify-between">
					<DatePicker.PrevTrigger class={navBtnClass}>
						<MingcuteLeftLine class="size-4" />
					</DatePicker.PrevTrigger>
					<DatePicker.ViewTrigger
						class="text-sm font-medium text-fg transition-colors hover:text-primary"
					>
						<DatePicker.RangeText />
					</DatePicker.ViewTrigger>
					<DatePicker.NextTrigger class={navBtnClass}>
						<MingcuteRightLine class="size-4" />
					</DatePicker.NextTrigger>
				</div>
				<DatePicker.Context>
					{#snippet render(api)}
						<DatePicker.Table class="w-full border-collapse">
							<DatePicker.TableBody>
								{#each api().getMonthsGrid() as months, i (i)}
									<DatePicker.TableRow>
										{#each months as month (month.value)}
											<DatePicker.TableCell value={month.value}>
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

			<DatePicker.View view="year">
				<div class="mb-3 flex items-center justify-between">
					<DatePicker.PrevTrigger class={navBtnClass}>
						<MingcuteLeftLine class="size-4" />
					</DatePicker.PrevTrigger>
					<DatePicker.ViewTrigger
						class="text-sm font-medium text-fg transition-colors hover:text-primary"
					>
						<DatePicker.RangeText />
					</DatePicker.ViewTrigger>
					<DatePicker.NextTrigger class={navBtnClass}>
						<MingcuteRightLine class="size-4" />
					</DatePicker.NextTrigger>
				</div>
				<DatePicker.Context>
					{#snippet render(api)}
						<DatePicker.Table class="w-full border-collapse">
							<DatePicker.TableBody>
								{#each api().getYearsGrid() as years, i (i)}
									<DatePicker.TableRow>
										{#each years as year (year.value)}
											<DatePicker.TableCell value={year.value}>
												<DatePicker.TableCellTrigger class={cn(cellClass, 'w-12')}>
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
		</DatePicker.Content>
	</DatePicker.Positioner>
</DatePicker.Root>
