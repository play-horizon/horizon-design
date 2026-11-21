<!--
@component
Docs: FacetedSearch. A playground over its texts, the sort control, the option counts and a
second facet, then the full example: games filtered by tag and sorted, the results drawn by the
page as game cards.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { FacetedSearch, type Facet } from '#lib/components/faceted-search/index.js';
	import { GameCard } from '#lib/components/game-card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';
	import { art, gameTags } from '../examples';

	interface Game {
		id: string;
		name: string;
		art: string;
		tags: string[];
		players: number;
	}

	const games: Game[] = [
		{
			id: 'skyline',
			name: 'Skyline Obby',
			art: art.skyline,
			tags: ['obby', 'platformer', 'solo'],
			players: 988
		},
		{
			id: 'frost',
			name: 'Frostbite Arena',
			art: art.frost,
			tags: ['fighting', 'action', 'multiplayer'],
			players: 412
		},
		{
			id: 'neon',
			name: 'Neon Drift',
			art: art.neon,
			tags: ['racing', 'multiplayer'],
			players: 1204
		},
		{
			id: 'woods',
			name: 'Quiet Woods',
			art: art.woods,
			tags: ['survival', 'horror', 'solo'],
			players: 377
		}
	];

	const tagOptions = gameTags.slice(0, 8);
	const tagsFacet: Facet = { id: 'tags', label: 'Tags', options: tagOptions };
	const countedTagsFacet: Facet = {
		id: 'tags',
		label: 'Tags',
		options: tagOptions.map((tag) => ({
			...tag,
			count: String(games.filter((game) => game.tags.includes(tag.id)).length)
		}))
	};
	const modeFacet: Facet = {
		id: 'mode',
		label: 'Mode',
		options: [
			{ id: 'solo', label: 'Solo' },
			{ id: 'multiplayer', label: 'Multiplayer' }
		]
	};
	const sorts = [
		{ id: 'players', label: 'Players now' },
		{ id: 'name', label: 'Name' }
	];

	function search(query: string, selected: Record<string, string[]>, sort: string | undefined) {
		const chosen = Object.values(selected).flat();
		const found = games.filter(
			(game) =>
				game.name.toLowerCase().includes(query.trim().toLowerCase()) &&
				chosen.every((tag) => game.tags.includes(tag))
		);
		return sort === 'name'
			? found.toSorted((a, b) => a.name.localeCompare(b.name))
			: found.toSorted((a, b) => b.players - a.players);
	}

	let playgroundQuery = $state('');
	let playgroundSelected = $state<Record<string, string[]>>({});
	let playgroundSort = $state<string>();

	let query = $state('');
	let selected = $state<Record<string, string[]>>({});
	let sort = $state('players');
	const results = $derived(search(query, selected, sort));
</script>

<div class="grid gap-4">
	<Playground
		description="Every text is passed in; the results are the page's own."
		controls={{
			searchLabel: text('Search games'),
			placeholder: text('Search games by name'),
			sortLabel: text('Sort by'),
			clearLabel: text('Clear filters'),
			sorts: boolean(true),
			counts: boolean(true),
			secondFacet: boolean()
		}}
	>
		{#snippet example(values)}
			<FacetedSearch
				class="w-full"
				bind:query={playgroundQuery}
				bind:selected={playgroundSelected}
				bind:sort={playgroundSort}
				facets={[
					values.counts ? countedTagsFacet : tagsFacet,
					...(values.secondFacet ? [modeFacet] : [])
				]}
				sorts={values.sorts ? sorts : []}
				searchLabel={values.searchLabel}
				placeholder={values.placeholder}
				sortLabel={values.sortLabel}
				clearLabel={values.clearLabel}
			>
				<ul class="grid gap-1 text-sm">
					{#each search(playgroundQuery, playgroundSelected, playgroundSort) as game (game.id)}
						<li>{game.name} <span class="text-muted">· {game.players} playing</span></li>
					{:else}
						<li class="text-muted">No game matches.</li>
					{/each}
				</ul>
			</FacetedSearch>
		{/snippet}
	</Playground>
	<Card title="Games by tag" description="Search, two facets with counts, a sort, game cards.">
		<FacetedSearch
			bind:query
			bind:selected
			bind:sort
			facets={[countedTagsFacet, modeFacet]}
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
	</Card>
</div>
