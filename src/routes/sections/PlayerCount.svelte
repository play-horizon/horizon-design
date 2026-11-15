<!--
@component
Docs: PlayerCount. Inline on a game page, and as a pill over game art.
-->
<script lang="ts">
	import { PlayerCount } from '#lib/components/player-count/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { art } from '../examples';
</script>

<div class="grid gap-4">
	<Card title="Inline" description="The count is formatted by the app's i18n layer.">
		<div class="flex flex-wrap gap-6">
			<PlayerCount count="988" label="playing now" />
			<PlayerCount count="0" label="playing now" live={false} />
		</div>
	</Card>
	<Card title="Over art">
		<div class="relative aspect-video w-72 overflow-hidden rounded-lg">
			<img src={art.neon} alt="" class="absolute inset-0 size-full object-cover" />
			<PlayerCount
				variant="overlay"
				count="9,870"
				label="playing now"
				class="absolute top-2 left-2"
			/>
		</div>
	</Card>
</div>
