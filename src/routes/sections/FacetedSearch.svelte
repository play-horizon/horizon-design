<!--
@component
Docs: FacetedSearch. Games filtered by tag and sorted, the results drawn by the page.
-->
<script lang="ts">
	import { FacetedSearch } from '$lib/components/faceted-search';
	import { GameCard } from '$lib/components/game-card';
	import { art, gameTags } from '../examples';

	let query = $state('');
	let selected = $state<Record<string, string[]>>({});
	let sort = $state('players');

	const games = [
		{
			id: 'skyline',
			name: 'Skyline Obby',
			art: art.skyline,
			tags: ['obby', 'platformer'],
			players: 988
		},
		{
			id: 'frost',
			name: 'Frostbite Arena',
			art: art.frost,
			tags: ['fighting', 'action'],
			players: 412
		},
		{ id: 'neon', name: 'Neon Drift', art: art.neon, tags: ['racing'], players: 1204 },
		{ id: 'woods', name: 'Quiet Woods', art: art.woods, tags: ['survival', 'horror'], players: 377 }
	];

	const facets = [{ id: 'tags', label: 'Tags', options: gameTags.slice(0, 8) }];
	const sorts = [
		{ id: 'players', label: 'Players now' },
		{ id: 'name', label: 'Name' }
	];

	const results = $derived.by(() => {
		const tags = selected.tags ?? [];
		const found = games.filter(
			(g) =>
				g.name.toLowerCase().includes(query.trim().toLowerCase()) &&
				tags.every((t) => g.tags.includes(t))
		);
		return sort === 'name'
			? found.toSorted((a, b) => a.name.localeCompare(b.name))
			: found.toSorted((a, b) => b.players - a.players);
	});
</script>

<FacetedSearch
	bind:query
	bind:selected
	bind:sort
	{facets}
	{sorts}
	searchLabel="Search games"
	placeholder="Search games by name or description"
	sortLabel="Sort by"
	clearLabel="Clear filters"
>
	{#if results.length === 0}
		<p class="py-8 text-center text-sm text-muted">No game matches.</p>
	{:else}
		<div class="grid grid-cols-2 gap-4">
			{#each results as game (game.id)}
				<GameCard name={game.name} thumbnail={game.art}>
					{#snippet meta()}{game.tags.join(' · ')}{/snippet}
				</GameCard>
			{/each}
		</div>
	{/if}
</FacetedSearch>
