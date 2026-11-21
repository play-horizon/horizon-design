<!--
@component
Docs: SignaturePad. A playground over the pad's texts, its disabled and read-only states and the
stroke (size, simulated pressure), then a disabled pad.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { SignaturePad } from '#lib/components/signature-pad/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Draw your signature'),
			roleDescription: text('signature pad'),
			clearLabel: text('Clear'),
			disabled: boolean(),
			readOnly: boolean(),
			size: number(2, { min: 1, max: 12 }),
			simulatePressure: boolean()
		}}
	>
		{#snippet example(values)}
			<SignaturePad
				class="w-full"
				label={values.label}
				roleDescription={values.roleDescription}
				clearLabel={values.clearLabel}
				disabled={values.disabled}
				readOnly={values.readOnly}
				drawing={{ size: values.size, simulatePressure: values.simulatePressure }}
			/>
		{/snippet}
	</Playground>
	<Card title="Disabled" description="Disabled, the pad is dimmed and takes no drawing.">
		<SignaturePad label="Signature" roleDescription="signature pad" clearLabel="Clear" disabled />
	</Card>
</div>
