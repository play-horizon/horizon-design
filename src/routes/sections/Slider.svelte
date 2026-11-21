<!--
@component
Docs: Slider. A playground over every prop (one value or a range, bounds and step, the label and
the shown values, orientation, origin, thumb alignment, the gap between thumbs, disabled and
read-only), then one value and a range, a vertical pair, a centred origin, and the disabled and
read-only states side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Slider } from '#lib/components/slider/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	let volume = $state([40]);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			thumbs: choice(['one value', 'range'] as const),
			label: text('Volume'),
			showValue: boolean(true),
			min: number(0),
			max: number(100),
			step: number(1, { min: 1 }),
			minStepsBetweenThumbs: number(0, { min: 0 }),
			orientation: choice(['horizontal', 'vertical'] as const),
			origin: choice(['start', 'center', 'end'] as const),
			thumbAlignment: choice(['contain', 'center'] as const),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			<!-- defaultValue is read once: a new thumb count mounts a new slider. -->
			{#key values.thumbs}
				<Slider
					class={values.orientation === 'horizontal' ? 'max-w-sm' : 'h-48'}
					defaultValue={values.thumbs === 'range' ? [20, 80] : [40]}
					label={values.label}
					showValue={values.showValue}
					min={values.min}
					max={values.max}
					step={values.step}
					minStepsBetweenThumbs={values.minStepsBetweenThumbs}
					orientation={values.orientation}
					origin={values.origin}
					thumbAlignment={values.thumbAlignment}
					disabled={values.disabled}
					readOnly={values.readOnly}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="One value and a range" description="A range has one thumb per value.">
		<div class="grid gap-6">
			<Slider bind:value={volume} label="Volume" showValue />
			<Slider defaultValue={[20, 80]} label="Price range" showValue />
		</div>
	</Card>
	<Card title="Vertical">
		<div class="flex h-48 gap-8">
			<Slider defaultValue={[60]} orientation="vertical" label="Bass" showValue />
			<Slider defaultValue={[30, 70]} orientation="vertical" label="Band" showValue />
		</div>
	</Card>
	<Card title="Centred origin" description="The range fills from the middle, for a balance.">
		<Slider defaultValue={[30]} min={-50} max={50} origin="center" label="Balance" showValue />
	</Card>
	<Card title="States">
		<div class="grid gap-6">
			<Slider defaultValue={[40]} label="Disabled" showValue disabled />
			<Slider defaultValue={[70]} label="Read-only" showValue readOnly />
		</div>
	</Card>
</div>
