<!--
@component
Docs: PinInput. A playground over every prop (the label, the number of fields, the accepted
characters, masking, one-time code and Ark's states and behaviour), then a hint under the label,
a masked code, and the disabled, read-only and invalid states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { PinInput } from '#lib/components/pin-input/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const translations = {
		inputLabel: (index: number, length: number) => `Digit ${index + 1} of ${length}`
	};

	let code = $state<string[]>([]);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Verification code'),
			count: number(6, { min: 1, max: 8, step: 1 }),
			type: choice(['numeric', 'alphanumeric', 'alphabetic'] as const),
			placeholder: text('○'),
			mask: boolean(),
			otp: boolean(true),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean(),
			required: boolean(),
			selectOnFocus: boolean(),
			blurOnComplete: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid gap-2">
				<!-- Ark sizes the value to the count when it mounts. -->
				{#key values.count}
					<PinInput
						label={values.label}
						count={values.count}
						bind:value={code}
						type={values.type}
						placeholder={values.placeholder}
						mask={values.mask}
						otp={values.otp}
						disabled={values.disabled}
						readOnly={values.readOnly}
						invalid={values.invalid}
						required={values.required}
						selectOnFocus={values.selectOnFocus}
						blurOnComplete={values.blurOnComplete}
						{translations}
					/>
				{/key}
				<p class="text-xs text-muted">Value: {code.join('') || 'empty'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Hint and masking">
		<div class="grid gap-6 sm:grid-cols-2">
			<PinInput count={5} label="Verification code" {translations}>
				<p class="text-xs text-muted">Enter the 5-digit code sent to your email.</p>
			</PinInput>
			<PinInput count={4} label="PIN" mask defaultValue={['1', '2', '3', '4']} {translations} />
		</div>
	</Card>
	<Card title="States">
		<div class="grid gap-6 sm:grid-cols-3">
			<PinInput label="Disabled" disabled defaultValue={['4', '2']} {translations} />
			<PinInput label="Read-only" readOnly defaultValue={['4', '2', '0', '7']} {translations} />
			<PinInput label="Invalid" invalid defaultValue={['1', '1', '1', '1']} {translations} />
		</div>
	</Card>
</div>
