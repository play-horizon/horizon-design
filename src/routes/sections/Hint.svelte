<!--
@component
Docs: Hint. A playground over its text, then a hint wired to a password field through
`aria-describedby`, and a hint holding rich content.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Hint } from '#lib/components/hint/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import Playground from '../playground/Playground.svelte';
	import { text } from '../playground/controls';

	const id = $props.id();
</script>

<div class="grid gap-4">
	<Playground
		description="The field's aria-describedby points at the hint's id."
		controls={{ hint: text('Shown on your profile and in chat.') }}
	>
		{#snippet example(values)}
			<div class="w-72">
				<Input aria-label="Display name" aria-describedby="{id}-playground" value="Nova" />
				<Hint id="{id}-playground">{values.hint}</Hint>
			</div>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Under a field">
			<form class="space-y-2">
				<!-- A username field for password managers, which pair it with the password. -->
				<input
					type="text"
					autocomplete="username"
					aria-hidden="true"
					class="sr-only"
					tabindex="-1"
				/>
				<Input
					type="password"
					autocomplete="new-password"
					aria-label="Password"
					aria-describedby="{id}-password"
				/>
				<Hint id="{id}-password">At least 8 characters, with a number.</Hint>
			</form>
		</Card>
		<Card title="Rich content">
			<Input aria-label="Search" aria-describedby="{id}-search" placeholder="Search games" />
			<Hint id="{id}-search">Press <Kbd>/</Kbd> anywhere to jump here.</Hint>
		</Card>
	</div>
</div>
