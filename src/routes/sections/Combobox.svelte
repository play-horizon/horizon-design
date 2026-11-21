<!--
@component
Docs: Combobox. A playground over every prop (with `openOnClick`, a press on the field opens the
options and typing searches at once), and a single and a multiple choice side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Combobox } from '#lib/components/combobox/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	const frameworks = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' },
		{ label: 'Angular', value: 'angular' }
	];
	const translations = { triggerLabel: 'Show frameworks' };
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Framework'),
			placeholder: text('Search frameworks…'),
			emptyText: text('No results found.'),
			openOnClick: boolean(true),
			multiple: boolean(),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			{#key [values.openOnClick, values.multiple]}
				<Combobox
					class="w-64"
					items={frameworks}
					{translations}
					label={values.label}
					placeholder={values.placeholder}
					emptyText={values.emptyText}
					openOnClick={values.openOnClick}
					multiple={values.multiple}
					disabled={values.disabled}
					readOnly={values.readOnly}
					invalid={values.invalid}
				/>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Single and multiple">
		<div class="grid gap-6 sm:grid-cols-2">
			<Combobox
				items={frameworks}
				{translations}
				label="One framework"
				placeholder="Search…"
				emptyText="No results found."
				openOnClick
			/>
			<Combobox
				items={frameworks}
				{translations}
				label="Several frameworks"
				placeholder="Search…"
				emptyText="No results found."
				multiple
				openOnClick
			/>
		</div>
	</Card>
</div>
