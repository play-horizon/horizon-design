<!--
@component
Docs: InputGroup. A playground over its addons (start, end), the input's size and states, then
an addon at the start, at the end, on both sides, and an icon addon.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { InputGroup, InputAddon } from '#lib/components/input-group/index.js';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="An empty addon text leaves that side bare."
		controls={{
			start: text('https://'),
			end: text('.horizon.gg'),
			size: choice(['sm', 'md', 'lg'] as const, 'md'),
			disabled: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			<InputGroup class="max-w-md">
				{#if values.start}<InputAddon>{values.start}</InputAddon>{/if}
				<Input
					aria-label="Studio address"
					value="nova"
					size={values.size}
					disabled={values.disabled}
					invalid={values.invalid}
				/>
				{#if values.end}<InputAddon>{values.end}</InputAddon>{/if}
			</InputGroup>
		{/snippet}
	</Playground>
	<Card title="Addons">
		<div class="grid max-w-md gap-4">
			<InputGroup>
				<InputAddon>https://</InputAddon>
				<Input placeholder="yoursite.com" aria-label="Website" />
			</InputGroup>
			<InputGroup>
				<Input placeholder="100" aria-label="Max players" />
				<InputAddon>players</InputAddon>
			</InputGroup>
			<InputGroup>
				<InputAddon>@</InputAddon>
				<Input placeholder="nova" aria-label="Handle" />
				<InputAddon>.horizon.gg</InputAddon>
			</InputGroup>
			<InputGroup>
				<Input placeholder="Search games" aria-label="Search" />
				<InputAddon><MingcuteSearchLine class="size-4" aria-hidden="true" /></InputAddon>
			</InputGroup>
		</div>
	</Card>
</div>
