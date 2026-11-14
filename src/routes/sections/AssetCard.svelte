<!--
@component
Docs: AssetCard. Store listings with Add to my assets, and a card without a thumbnail.
-->
<script lang="ts">
	import { AssetCard } from '#lib/components/asset-card/index.js';
	import { Button } from '#lib/components/button/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteMusic2Line from '~icons/mingcute/music-2-line';
	import MingcuteThumbUp2Line from '~icons/mingcute/thumb-up-2-line';
	import { art } from '../examples';

	let chosen = $state('');
	let added = $state<string[]>([]);
	const listings = [
		{ id: 'sky', name: 'Sunset sky', kind: 'Sky', art: art.skyline, votes: '128' },
		{ id: 'ice', name: 'Ice floor', kind: 'Texture', art: art.frost, votes: '64' },
		{ id: 'pine', name: 'Pine forest', kind: 'Prefab', art: art.woods, votes: '301' }
	];
</script>

<div class="grid grid-cols-4 gap-3">
	{#each listings as listing (listing.id)}
		<AssetCard
			name={listing.name}
			kind={listing.kind}
			thumbnail={listing.art}
			selected={chosen === listing.id}
			onclick={() => (chosen = listing.id)}
		>
			{#snippet meta()}
				<span class="inline-flex items-center gap-1"
					><MingcuteThumbUp2Line class="size-3" aria-hidden="true" />{listing.votes}</span
				>
			{/snippet}
			{#snippet actions()}
				<Button
					size="xs"
					variant="tint"
					disabled={added.includes(listing.id)}
					onclick={() => (added = [...added, listing.id])}
				>
					<MingcuteAddLine aria-hidden="true" />Add to my assets
				</Button>
			{/snippet}
		</AssetCard>
	{/each}
	<AssetCard
		name="Harbor ambience"
		kind="Audio"
		onclick={() => (chosen = 'audio')}
		selected={chosen === 'audio'}
	>
		{#snippet placeholder()}<MingcuteMusic2Line aria-hidden="true" />{/snippet}
	</AssetCard>
</div>
