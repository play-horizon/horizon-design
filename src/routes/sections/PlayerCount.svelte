<!--
@component
Docs: PlayerCount. A playground over every prop, then the inline and overlay variants, each live
and idle.
-->
<script lang="ts">
	import { PlayerCount } from '#lib/components/player-count/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
</script>

{#snippet overArt(count: string, label: string, live: boolean)}
	<div class="relative aspect-video w-60 overflow-hidden rounded-lg">
		<img src={art.neon} alt="" class="absolute inset-0 size-full object-cover" />
		<PlayerCount variant="overlay" {count} {live} {label} class="absolute top-2 left-2" />
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="The overlay variant is shown over game art."
		controls={{
			count: text('9,870'),
			label: text('playing now'),
			variant: choice(['inline', 'overlay'] as const),
			live: boolean(true)
		}}
	>
		{#snippet example(values)}
			{#if values.variant === 'overlay'}
				{@render overArt(values.count, values.label, values.live)}
			{:else}
				<PlayerCount count={values.count} label={values.label} live={values.live} />
			{/if}
		{/snippet}
	</Playground>
	<Card title="Inline" description="The count is formatted by the app's i18n layer.">
		<div class="flex flex-wrap gap-6">
			<PlayerCount count="988" label="playing now" />
			<PlayerCount count="0" label="playing now" live={false} />
		</div>
	</Card>
	<Card title="Over art">
		<div class="flex flex-wrap gap-4">
			{@render overArt('9,870', 'playing now', true)}
			{@render overArt('0', 'playing now', false)}
		</div>
	</Card>
</div>
