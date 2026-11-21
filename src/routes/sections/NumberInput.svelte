<!--
@component
Docs: NumberInput. A playground over every prop (the label, the bounds and steps, formatting and
Ark's states and behaviour), then the default, disabled, read-only and invalid states, a hint
between the label and the field, and a formatted value.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { NumberInput } from '#lib/components/number-input/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	const translations = {
		incrementLabel: 'Increase',
		decrementLabel: 'Decrease',
		roleDescription: 'number field'
	};

	let value = $state('5');
</script>

<div class="grid gap-4">
	<Playground
		description="The step buttons show their names as tooltips."
		controls={{
			label: text('Players'),
			min: number(1, { step: 1 }),
			max: number(50, { step: 1 }),
			step: number(1, { min: 0.1, step: 0.1 }),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean(),
			required: boolean(),
			allowMouseWheel: boolean(),
			clampValueOnBlur: boolean(true),
			allowOverflow: boolean(),
			spinOnPress: boolean(true)
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-xs gap-2">
				<NumberInput
					label={values.label}
					bind:value
					min={values.min}
					max={values.max}
					step={values.step}
					disabled={values.disabled}
					readOnly={values.readOnly}
					invalid={values.invalid}
					required={values.required}
					allowMouseWheel={values.allowMouseWheel}
					clampValueOnBlur={values.clampValueOnBlur}
					allowOverflow={values.allowOverflow}
					spinOnPress={values.spinOnPress}
					{translations}
				/>
				<p class="text-xs text-muted">Value: {value || 'empty'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="States">
		<div class="grid gap-4 sm:grid-cols-4">
			<NumberInput label="Default" defaultValue="5" {translations} />
			<NumberInput label="Disabled" defaultValue="5" disabled {translations} />
			<NumberInput label="Read-only" defaultValue="5" readOnly {translations} />
			<NumberInput label="Invalid" defaultValue="120" max={100} invalid {translations} />
		</div>
	</Card>
	<Card title="Hint and formatting">
		<div class="grid gap-4 sm:grid-cols-2">
			<NumberInput label="Server size" defaultValue="12" min={1} max={50} {translations}>
				<p class="text-xs text-muted">From 1 to 50 players.</p>
			</NumberInput>
			<NumberInput
				label="Price"
				defaultValue="4.99"
				step={0.5}
				formatOptions={{ style: 'currency', currency: 'USD' }}
				{translations}
			/>
		</div>
	</Card>
</div>
