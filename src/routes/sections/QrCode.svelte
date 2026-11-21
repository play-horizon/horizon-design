<!--
@component
Docs: QrCode. A playground over every prop (the value, its accessible name, the size and Ark's
error correction level), then each error correction level and three sizes side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { QrCode } from '#lib/components/qr-code/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, number, text } from '../playground/controls';

	const levels = ['L', 'M', 'Q', 'H'] as const;
	const sizes = [96, 128, 160];
</script>

<div class="grid gap-4">
	<Playground
		description="A higher error correction level survives more damage, with more modules."
		controls={{
			value: text('https://example.com/invite/neon-drift'),
			label: text('QR code of the invitation link'),
			size: number(160, { min: 64, max: 320, step: 8 }),
			ecc: choice(levels, 'M')
		}}
	>
		{#snippet example(values)}
			<QrCode
				value={values.value}
				label={values.label}
				size={values.size}
				encoding={{ ecc: values.ecc }}
			/>
		{/snippet}
	</Playground>
	<Card title="Error correction levels">
		<div class="flex flex-wrap items-end gap-6">
			{#each levels as level (level)}
				<figure class="grid justify-items-center gap-2">
					<QrCode
						value="https://example.com/invite/neon-drift"
						label="QR code of the invitation link, level {level}"
						size={112}
						encoding={{ ecc: level }}
					/>
					<figcaption class="text-xs text-muted">Level {level}</figcaption>
				</figure>
			{/each}
		</div>
	</Card>
	<Card title="Sizes">
		<div class="flex flex-wrap items-end gap-6">
			{#each sizes as size (size)}
				<QrCode value="https://example.com" label="QR code of example.com, {size} px" {size} />
			{/each}
		</div>
	</Card>
</div>
