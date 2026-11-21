<!--
@component
Docs: Checkbox. A playground over every prop, and every size in every state: unchecked, checked,
indeterminate (a bar as thick as the check, for "some games selected") and disabled.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Checkbox } from '#lib/components/checkbox/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sizes = ['sm', 'md', 'lg'] as const;
	const states = [
		{ name: 'Unchecked', checked: false, disabled: false },
		{ name: 'Checked', checked: true, disabled: false },
		{ name: 'Some games selected', checked: 'indeterminate', disabled: false },
		{ name: 'Disabled', checked: true, disabled: true }
	] as const;
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Some games selected'),
			size: choice(sizes, 'md'),
			checked: choice(['indeterminate', 'checked', 'unchecked']),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			{#key values.checked}
				<Checkbox
					label={values.label}
					size={values.size}
					checked={values.checked === 'indeterminate'
						? 'indeterminate'
						: values.checked === 'checked'}
					disabled={values.disabled}
					readOnly={values.readOnly}
					invalid={values.invalid}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Sizes and states">
		<div class="grid gap-4 sm:grid-cols-3">
			{#each sizes as size (size)}
				<div class="grid content-start gap-2">
					<p class="text-xs font-medium text-muted">{size}</p>
					{#each states as state (state.name)}
						<Checkbox {size} label={state.name} checked={state.checked} disabled={state.disabled} />
					{/each}
				</div>
			{/each}
		</div>
	</Card>
</div>
