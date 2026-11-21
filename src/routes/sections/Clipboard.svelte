<!--
@component
Docs: Clipboard. A playground over every prop (the value, the label, the copy button's two names,
how long the copy is confirmed), then a field with a label, one without, and a long value cut
short. The copy button shows its name in a tooltip, which turns to the copied name on a copy.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Clipboard } from '#lib/components/clipboard/index.js';
	import Playground from '../playground/Playground.svelte';
	import { number, text } from '../playground/controls';

	const translations = { triggerLabel: (copied: boolean) => (copied ? 'Copied' : 'Copy') };
</script>

<div class="grid gap-4">
	<Playground
		description="timeout is how long the copy is confirmed, in milliseconds."
		controls={{
			value: text('pnpm add horizon-design'),
			label: text('Install command'),
			copyLabel: text('Copy'),
			copiedLabel: text('Copied'),
			timeout: number(3000, { min: 500, max: 10000, step: 500 })
		}}
	>
		{#snippet example(values)}
			<Clipboard
				class="w-full max-w-sm"
				value={values.value}
				label={values.label}
				timeout={values.timeout}
				translations={{
					triggerLabel: (copied) => (copied ? values.copiedLabel : values.copyLabel)
				}}
			/>
		{/snippet}
	</Playground>
	<Card title="Variants" description="With a label, without one, and a long value cut short.">
		<div class="grid max-w-sm gap-4">
			<Clipboard value="https://horizon.example/invite/7Kq2" label="Invite link" {translations} />
			<Clipboard value="7Kq2-Xr9P" {translations} />
			<Clipboard
				value="https://horizon.example/games/sky-racer/places/lobby?session=4f1c9e2a7b3d"
				label="Place link"
				{translations}
			/>
		</div>
	</Card>
</div>
