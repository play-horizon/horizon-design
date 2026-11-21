<!--
@component
Docs: NativeSelect. A playground over every prop (the bound value, the disabled, required and
invalid states), then option groups, a disabled option, and the disabled and invalid states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { NativeSelect } from '#lib/components/native-select/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';

	let genre = $state('');
</script>

{#snippet genres()}
	<option value="">Choose a genre…</option>
	<option value="obby">Obby</option>
	<option value="racing">Racing</option>
	<option value="roleplay">Roleplay</option>
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			disabled: boolean(),
			required: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-xs gap-2">
				<label for="native-select-playground" class="text-sm font-medium">Genre</label>
				<NativeSelect
					id="native-select-playground"
					bind:value={genre}
					disabled={values.disabled}
					required={values.required}
					aria-invalid={values.invalid || undefined}
				>
					{@render genres()}
				</NativeSelect>
				<p class="text-xs text-muted">Value: {genre || 'empty'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Options and states" description="Horror is a disabled option.">
		<div class="grid gap-4 sm:grid-cols-3">
			<NativeSelect aria-label="Genre, in groups" value="racing">
				<optgroup label="Action">
					<option value="racing">Racing</option>
					<option value="shooter">Shooter</option>
				</optgroup>
				<optgroup label="Calm">
					<option value="tycoon">Tycoon</option>
					<option value="horror" disabled>Horror</option>
				</optgroup>
			</NativeSelect>
			<NativeSelect aria-label="Genre, disabled" disabled>
				{@render genres()}
			</NativeSelect>
			<NativeSelect aria-label="Genre, invalid" aria-invalid="true">
				{@render genres()}
			</NativeSelect>
		</div>
	</Card>
</div>
