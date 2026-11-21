<!--
@component
Docs: CircularSlider. A playground over every prop, and sliders of several sizes: the ring's fill
starts with a round end.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { CircularSlider } from '#lib/components/circular-slider/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Hue'),
			size: number(120, { min: 60, max: 240, step: 4 }),
			thickness: number(8, { min: 2, max: 24 }),
			step: number(1, { min: 1, max: 90 }),
			showValue: boolean(true),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			<CircularSlider
				label={values.label}
				valueText={(hue) => `${hue}°`}
				size={values.size}
				thickness={values.thickness}
				step={values.step}
				showValue={values.showValue}
				disabled={values.disabled}
				readOnly={values.readOnly}
				defaultValue={120}
			/>
		{/snippet}
	</Playground>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-8">
			<CircularSlider
				label="Hue"
				valueText={(hue) => `${hue}°`}
				size={160}
				thickness={10}
				defaultValue={40}
			/>
			<CircularSlider label="Angle" valueText={(angle) => `${angle}°`} defaultValue={250} />
			<CircularSlider
				label="Turn"
				valueText={(angle) => `${angle}°`}
				size={64}
				thickness={4}
				showValue={false}
				defaultValue={90}
			/>
		</div>
	</Card>
</div>
