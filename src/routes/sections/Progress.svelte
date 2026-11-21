<!--
@component
Docs: Progress. A playground over every prop (the label, the value and its bounds, the value
text), then a bar with a label and its value, one with only a label, one with neither, a bar with
content under its label, and a grid of metrics.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Progress } from '#lib/components/progress/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	const metrics = [
		{ label: 'CPU', value: 45 },
		{ label: 'RAM', value: 68 },
		{ label: 'Disk', value: 23 }
	];
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Upload'),
			showValue: boolean(true),
			value: number(72, { step: 1 }),
			min: number(0, { step: 1 }),
			max: number(100, { step: 1 })
		}}
	>
		{#snippet example(values)}
			<div class="w-full max-w-md">
				<Progress
					label={values.label || undefined}
					showValue={values.showValue}
					value={values.value}
					min={values.min}
					max={values.max}
				/>
			</div>
		{/snippet}
	</Playground>
	<Card title="Labels and values">
		<div class="grid gap-5">
			<Progress label="Upload" showValue value={72} />
			<Progress label="Publishing" value={30} />
			<Progress value={90} />
			<Progress label="Release 18" showValue value={3} max={5}>
				<p class="text-xs text-muted">3 of 5 steps done.</p>
			</Progress>
		</div>
	</Card>
	<Card title="Metrics">
		<div class="grid gap-2 sm:grid-cols-3">
			{#each metrics as metric (metric.label)}
				<div class="rounded-lg bg-active p-3">
					<Progress label={metric.label} showValue value={metric.value} />
				</div>
			{/each}
		</div>
	</Card>
</div>
