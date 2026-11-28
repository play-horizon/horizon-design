<!--
@component
Docs: Combobox. A playground over every prop (with `openOnClick`, a press on the field opens the
options and typing searches at once), a single and a multiple choice side by side, and one whose
`translations` give every announcement: the options found and, on Apple devices, the option the
keyboard moves to.
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
	const announced = {
		...translations,
		resultsCount: (count: number) => (count === 1 ? '1 framework' : `${count} frameworks`),
		noResults: 'No framework found',
		loading: 'Looking for frameworks',
		highlightedItem: ({ label, selected }: { label: string; selected: boolean }) =>
			selected ? `${label}, selected` : label
	};
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
	<Card title="Announcements">
		<div class="grid gap-2">
			<Combobox
				class="w-64"
				items={frameworks}
				translations={announced}
				label="Announced framework"
				placeholder="Search…"
				emptyText="No results found."
				defaultValue={['svelte']}
				openOnClick
			/>
			<p class="text-xs text-muted">
				Screen readers hear the options found as the search settles (<code>resultsCount</code>,
				<code>noResults</code>, <code>loading</code>) and, on Apple devices, the option the keyboard
				moves to (<code>highlightedItem</code>): “Svelte, selected” for the one already chosen.
				Without <code>highlightedItem</code> they hear its label alone.
			</p>
		</div>
	</Card>
</div>
