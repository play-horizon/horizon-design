<!--
@component
Docs: CircularProgress. A playground over every prop, and rings of several sizes and values: the
fill has round ends.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { CircularProgress } from '#lib/components/circular-progress/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			value: number(72, { min: 0, max: 100 }),
			max: number(100, { min: 1, max: 1000 }),
			size: number(80, { min: 24, max: 200, step: 4 }),
			strokeWidth: number(6, { min: 1, max: 24 }),
			label: text('Upload'),
			hideLabel: boolean(),
			showValue: boolean(true)
		}}
	>
		{#snippet example(values)}
			<CircularProgress
				value={values.value}
				max={values.max}
				size={values.size}
				strokeWidth={values.strokeWidth}
				label={values.label}
				hideLabel={values.hideLabel}
				valueText={values.showValue
					? `${Math.round((Math.min(values.value, values.max) / values.max) * 100)}%`
					: undefined}
			/>
		{/snippet}
	</Playground>
	<Card title="Sizes and values">
		<div class="flex flex-wrap items-center gap-6">
			<CircularProgress value={0} valueText="0%" size={80} label="Queued" />
			<CircularProgress value={8} valueText="8%" size={80} label="Upload" />
			<CircularProgress value={72} valueText="72%" size={64} label="Build" />
			<CircularProgress value={100} valueText="100%" size={64} label="Done" />
			<CircularProgress value={90} size={48} strokeWidth={5} label="Download" hideLabel />
			<CircularProgress value={40} size={32} strokeWidth={4} label="Sync" hideLabel />
		</div>
	</Card>
</div>
