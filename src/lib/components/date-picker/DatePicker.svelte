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
		placeholder = 'Pick a date',
		value = $bindable(undefined),
		...rest
	}: {
		class?: string;
		label?: string;
		placeholder?: string;
		value?: DateValue[];
		[key: string]: unknown;
	} = $props();

	const cellClass =
		'flex size-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-accent data-today:font-semibold data-selected:bg-primary data-selected:text-primary-foreground data-outside-range:opacity-30 data-disabled:pointer-events-none data-disabled:opacity-30';

	const navBtnClass =
		'inline-flex items-center justify-center size-7 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors';
</script>

<DatePicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="date-picker"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<DatePicker.Label class="text-foreground text-sm font-medium">{label}</DatePicker.Label>
	{/if}
	<DatePicker.Control class="relative flex items-center">
		<DatePicker.Input
			class="border-border bg-input text-foreground focus-visible:ring-ring focus-visible:border-primary placeholder:text-muted-foreground flex h-8 w-full rounded-lg border px-3 py-1 pr-9 text-sm shadow-sm outline-none focus-visible:ring-2"
			{placeholder}
		/>
		<DatePicker.Trigger
			class="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
		>
			<MingcuteCalendarLine class="size-4" />
		</DatePicker.Trigger>
	</DatePicker.Control>
	<DatePicker.Positioner>
		<DatePicker.Content
			class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover z-50 w-fit rounded-xl border p-3 shadow-xl backdrop-blur-xl outline-none"
			data-slot="date-picker-content"
		>
			<DatePicker.View view="day">
				<div class="mb-3 flex items-center justify-between">
					<DatePicker.PrevTrigger class={navBtnClass}>
						<MingcuteLeftLine class="size-4" />
					</DatePicker.PrevTrigger>
					<DatePicker.ViewTrigger
						class="text-foreground hover:text-primary text-sm font-medium transition-colors"
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
											class="text-muted-foreground h-8 w-8 pb-2 text-center text-xs font-medium"
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
						class="text-foreground hover:text-primary text-sm font-medium transition-colors"
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
						class="text-foreground hover:text-primary text-sm font-medium transition-colors"
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
