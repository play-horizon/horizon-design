<!--
@component
Docs: Spinner. A playground over the size, how the spinner is named (a visible label, an
`aria-label` alone, or neither) and its colour, then every size, a spinner inside a button, and
spinners with their labels in each status colour.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Spinner } from '#lib/components/spinner/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, text } from '../playground/controls';

	const sizes = ['sm', 'md', 'lg', 'xl'] as const;
	const colours = {
		inherit: '',
		muted: 'text-muted',
		primary: 'text-primary',
		success: 'text-success',
		warning: 'text-warning',
		danger: 'text-danger'
	};
	const colourNames = Object.keys(colours) as (keyof typeof colours)[];
</script>

<div class="grid gap-4">
	<Playground
		description="With a label it is announced with its text; with an aria-label, without text."
		controls={{
			size: choice(sizes, 'md'),
			naming: choice(['label', 'aria-label', 'decorative'] as const),
			text: text('Saving changes…'),
			colour: choice(colourNames, 'primary')
		}}
	>
		{#snippet example(values)}
			<Spinner
				class={colours[values.colour]}
				size={values.size}
				label={values.naming === 'label' ? values.text : undefined}
				aria-label={values.naming === 'aria-label' ? values.text : undefined}
			/>
		{/snippet}
	</Playground>
	<Card title="Sizes" description="From sm (12 px) to xl (24 px).">
		<div class="flex items-center gap-4">
			{#each sizes as size (size)}
				<Spinner {size} aria-label="Loading ({size})" />
			{/each}
		</div>
	</Card>
	<Card title="In a button" description="A button's loading state shows one in place of its icon.">
		<div class="flex flex-wrap items-center gap-2">
			<Button variant="primary" loading>Publishing</Button>
			<Button disabled><Spinner size="sm" />Uploading</Button>
		</div>
	</Card>
	<Card title="With a label">
		<div class="flex flex-wrap items-center gap-5 text-sm">
			<Spinner class="text-muted" label="Loading…" />
			<Spinner class="text-primary" label="Fetching data…" />
			<Spinner class="text-success" label="Saving changes…" />
			<Spinner class="text-warning" label="Syncing…" />
			<Spinner class="text-danger" label="Retrying…" />
		</div>
	</Card>
</div>
