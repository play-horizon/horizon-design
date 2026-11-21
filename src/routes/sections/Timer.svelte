<!--
@component
Docs: Timer. A playground over every prop (it starts paused unless `autoStart` is on), and a
stopwatch and a countdown side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Timer } from '#lib/components/timer/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number } from '../playground/controls';

	const labels = { start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset' };
</script>

<div class="grid gap-4">
	<Playground
		description="The timer reads these props when it starts: changing one starts it over."
		controls={{
			countdown: boolean(),
			startSeconds: number(90, { min: 0, max: 200_000, step: 10 }),
			autoStart: boolean()
		}}
	>
		{#snippet example(values)}
			{#key values}
				<Timer
					{labels}
					countdown={values.countdown}
					startMs={values.startSeconds * 1000}
					autoStart={values.autoStart}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Stopwatch and countdown" description="Both start paused.">
		<div class="flex flex-wrap justify-center gap-10">
			<Timer {labels} />
			<Timer {labels} countdown startMs={25 * 3_600_000} />
		</div>
	</Card>
</div>
