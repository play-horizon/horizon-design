<!--
@component
Docs: Textarea. A playground over the textarea and the `Field` around it (label, help and error
texts, placeholder, rows, autoresize, disabled, read-only, invalid, required), then a bound
message with its length, and the disabled, read-only and invalid states side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Field } from '#lib/components/field/index.js';
	import { Textarea } from '#lib/components/textarea/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	let message = $state('');
</script>

<div class="grid gap-4">
	<Playground
		description="Autoresize grows the textarea with its text."
		controls={{
			label: text('Message'),
			helperText: text('Players see it on your profile.'),
			errorText: text('Write at most 200 characters.'),
			placeholder: text('Type your message here…'),
			rows: number(3, { min: 1, max: 12 }),
			autoresize: boolean(),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			<Field
				class="w-full"
				label={values.label}
				helperText={values.helperText}
				errorText={values.errorText}
				disabled={values.disabled}
				readOnly={values.readOnly}
				invalid={values.invalid}
				required={values.required}
			>
				<Textarea
					placeholder={values.placeholder}
					rows={values.rows}
					autoresize={values.autoresize}
				/>
			</Field>
		{/snippet}
	</Playground>
	<Card title="Bound value" description="value binds the text.">
		<Field label="Bio" helperText="{message.length} characters">
			<Textarea bind:value={message} placeholder="Tell players about yourself" />
		</Field>
	</Card>
	<Card title="States">
		<div class="grid gap-4 sm:grid-cols-3">
			<Field label="Disabled" disabled>
				<Textarea value="Nothing to edit here." />
			</Field>
			<Field label="Read-only" readOnly>
				<Textarea value="Read it, don't change it." />
			</Field>
			<Field label="Invalid" invalid errorText="This message is too long.">
				<Textarea value="A message that breaks the rules." />
			</Field>
		</div>
	</Card>
</div>
