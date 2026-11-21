<!--
@component
Docs: Editable. A playground over its texts, how it starts and ends editing, and its states, then
labelled and unlabelled fields, an empty one with its placeholder, a bound value, and the disabled
and read-only states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Editable } from '#lib/components/editable/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const translations = { input: 'Display name', edit: 'Edit display name' };

	let worldName = $state('Sky Islands');
</script>

<div class="grid gap-4">
	<Playground
		description="Click or focus the text to edit it."
		controls={{
			label: text('Display name'),
			defaultValue: text('Nova'),
			placeholder: text('Choose a name'),
			activationMode: choice(['focus', 'click', 'dblclick', 'none'] as const),
			submitMode: choice(['both', 'enter', 'blur', 'none'] as const),
			selectOnFocus: boolean(true),
			maxLength: number(24, { min: 1, max: 64 }),
			disabled: boolean(),
			readOnly: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			<!-- defaultValue is read once, when the field mounts. -->
			{#key values.defaultValue}
				<Editable
					class="w-64"
					label={values.label || undefined}
					{translations}
					defaultValue={values.defaultValue}
					placeholder={values.placeholder}
					activationMode={values.activationMode}
					submitMode={values.submitMode}
					selectOnFocus={values.selectOnFocus}
					maxLength={values.maxLength}
					disabled={values.disabled}
					readOnly={values.readOnly}
					required={values.required}
				/>
			{/key}
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="With a label" description="The label names the field.">
			<Editable label="Display name" defaultValue="Nova" {translations} />
		</Card>
		<Card title="Without a label" description="The translations name the text and the field.">
			<Editable defaultValue="Nova" {translations} />
		</Card>
		<Card title="Empty" description="The placeholder shows until a value is typed.">
			<Editable label="Bio" placeholder="Say something about you" {translations} />
		</Card>
		<Card title="Bound value" description="bind:value follows the typing.">
			<Editable
				label="World name"
				bind:value={worldName}
				translations={{ input: 'World name', edit: 'Edit the world name' }}
			/>
			<p class="mt-2 text-xs text-muted">Value: {worldName}</p>
		</Card>
		<Card title="Disabled">
			<Editable label="Display name" defaultValue="Nova" {translations} disabled />
		</Card>
		<Card title="Read-only">
			<Editable label="Display name" defaultValue="Nova" {translations} readOnly />
		</Card>
	</div>
</div>
