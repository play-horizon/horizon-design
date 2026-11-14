<!--
@component
A countdown or a stopwatch (Ark Timer): the time as hours, minutes and seconds, led by the days
from one day on (`01:02:00:00`: digits and colons only, so nothing needs translating), and icon
buttons to start, pause, resume and reset it, named by `labels`. Only the buttons that apply show.
-->
<script lang="ts" module>
	/** The accessible names of the timer's buttons. */
	export interface TimerLabels {
		/** The start button's name, such as "Start". */
		start: string;
		/** The pause button's name, such as "Pause". */
		pause: string;
		/** The resume button's name, such as "Resume". */
		resume: string;
		/** The reset button's name, such as "Reset". */
		reset: string;
	}
</script>

<script lang="ts">
	import { Timer } from '@ark-ui/svelte';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import MingcutePauseFill from '~icons/mingcute/pause-fill';
	import MingcuteRefresh2Line from '~icons/mingcute/refresh-2-line';
	import { cn } from '#lib/utils.js';

	const btnClass =
		'border-border hover:bg-hover inline-flex size-8 items-center justify-center rounded-lg border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary';

	let {
		class: className = '',
		countdown = false,
		startMs = 0,
		autoStart = false,
		labels,
		...rest
	}: {
		/** Classes merged onto Ark's `Timer.Root`. */
		class?: string;
		/** Counts down from `startMs` instead of up. */
		countdown?: boolean;
		/** The time it starts from, in milliseconds. */
		startMs?: number;
		/** Starts it as soon as it shows. */
		autoStart?: boolean;
		/** The buttons' names, translated. */
		labels: TimerLabels;
		/** Other props of Ark's `Timer.Root`, such as `targetMs` or `onComplete`. */
		[key: string]: unknown;
	} = $props();
</script>

<Timer.Root
	{countdown}
	{startMs}
	{autoStart}
	class={cn('flex flex-col items-center gap-4', className)}
	data-slot="timer"
	{...rest}
>
	<Timer.Context>
		{#snippet api(timer)}
			<div
				class="flex items-center gap-1 font-mono text-3xl font-bold text-fg tabular-nums"
				data-slot="timer-time"
			>
				{#if timer().time.days > 0}
					<span class="rounded-lg bg-hover px-3 py-2">{timer().formattedTime.days}</span>
					<span class="text-muted">:</span>
				{/if}
				<span class="rounded-lg bg-hover px-3 py-2">{timer().formattedTime.hours}</span>
				<span class="text-muted">:</span>
				<span class="rounded-lg bg-hover px-3 py-2">{timer().formattedTime.minutes}</span>
				<span class="text-muted">:</span>
				<span class="rounded-lg bg-hover px-3 py-2">{timer().formattedTime.seconds}</span>
			</div>
			<div class="flex items-center gap-2">
				<Timer.ActionTrigger action="start" class={btnClass} aria-label={labels.start}>
					<MingcutePlayFill class="size-4" aria-hidden="true" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="resume" class={btnClass} aria-label={labels.resume}>
					<MingcutePlayFill class="size-4" aria-hidden="true" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="pause" class={btnClass} aria-label={labels.pause}>
					<MingcutePauseFill class="size-4" aria-hidden="true" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="reset" class={btnClass} aria-label={labels.reset}>
					<MingcuteRefresh2Line class="size-4" aria-hidden="true" />
				</Timer.ActionTrigger>
			</div>
		{/snippet}
	</Timer.Context>
</Timer.Root>
