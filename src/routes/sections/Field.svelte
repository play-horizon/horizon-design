<!--
@component
Docs: Field. A playground over its texts, its states and the control it holds, then a field with
a help text, an invalid one with its error, a required one, a disabled one, a textarea, and
snippet texts.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Field } from '#lib/components/field/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import { Textarea } from '#lib/components/textarea/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="The error shows only while the field is invalid."
		controls={{
			label: text('Username'),
			helperText: text('3 to 20 letters and numbers.'),
			errorText: text('This username is taken.'),
			control: choice(['input', 'textarea'] as const),
			invalid: boolean(),
			required: boolean(),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			<Field
				class="w-72"
				label={values.label}
				helperText={values.helperText}
				errorText={values.errorText}
				invalid={values.invalid}
				required={values.required}
				disabled={values.disabled}
				readOnly={values.readOnly}
			>
				{#if values.control === 'input'}
					<Input placeholder="nova_7" />
				{:else}
					<Textarea placeholder="Say something about you" rows={3} />
				{/if}
			</Field>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Help text">
			<Field label="Username" helperText="3 to 20 letters and numbers.">
				<Input placeholder="nova_7" />
			</Field>
		</Card>
		<Card title="Invalid" description="The error shows under the control.">
			<Field invalid label="Email" errorText="Enter a valid email address.">
				<Input type="email" value="nova@" />
			</Field>
		</Card>
		<Card title="Required">
			<Field required label="World name" helperText="Shown in the world list.">
				<Input value="Sky Islands" />
			</Field>
		</Card>
		<Card title="Disabled">
			<Field disabled label="Region" helperText="Set when the server was created.">
				<Input value="Europe West" />
			</Field>
		</Card>
		<Card title="Textarea">
			<Field label="Message" helperText="Up to 500 characters.">
				<Textarea placeholder="Type your message" rows={3} />
			</Field>
		</Card>
		<Card title="Snippet texts" description="Each text can be a snippet instead of a string.">
			<Field>
				{#snippet label()}Shortcut{/snippet}
				{#snippet helperText()}Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to open it.{/snippet}
				<Input value="Search" />
			</Field>
		</Card>
	</div>
</div>
