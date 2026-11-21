<!--
@component
Docs: Select. A playground over every prop (the label, the placeholder, several choices and Ark's
states and behaviour), then a placeholder, a chosen value, several values, a disabled option and
the disabled, read-only and invalid states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Select } from '#lib/components/select/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const genres = [
		{ label: 'Obby', value: 'obby' },
		{ label: 'Racing', value: 'racing' },
		{ label: 'Roleplay', value: 'roleplay' },
		{ label: 'Simulator', value: 'simulator' },
		{ label: 'Horror', value: 'horror', disabled: true }
	];
	const placements = ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top'] as const;

	let chosen = $state<string[]>([]);
</script>

<div class="grid gap-4">
	<Playground
		description="Horror is a disabled option."
		controls={{
			label: text('Genre'),
			placeholder: text('Choose a genre…'),
			multiple: boolean(),
			deselectable: boolean(),
			closeOnSelect: boolean(true),
			loopFocus: boolean(),
			placement: choice(placements),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-xs gap-2">
				<Select
					items={genres}
					bind:value={chosen}
					label={values.label}
					placeholder={values.placeholder}
					multiple={values.multiple}
					deselectable={values.deselectable}
					closeOnSelect={values.closeOnSelect}
					loopFocus={values.loopFocus}
					positioning={{ placement: values.placement }}
					disabled={values.disabled}
					readOnly={values.readOnly}
					invalid={values.invalid}
					required={values.required}
				/>
				<p class="text-xs text-muted">Value: {chosen.join(', ') || 'empty'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Values">
		<div class="grid gap-4 sm:grid-cols-3">
			<Select items={genres} label="Placeholder" placeholder="Choose a genre…" />
			<Select items={genres} label="Chosen" defaultValue={['racing']} />
			<Select
				items={genres}
				label="Several"
				multiple
				defaultValue={['obby', 'roleplay']}
				placeholder="Choose genres…"
			/>
		</div>
	</Card>
	<Card title="States">
		<div class="grid gap-4 sm:grid-cols-3">
			<Select items={genres} label="Disabled" disabled defaultValue={['racing']} />
			<Select items={genres} label="Read-only" readOnly defaultValue={['racing']} />
			<Select items={genres} label="Invalid" invalid placeholder="Choose a genre…" />
		</div>
	</Card>
</div>
