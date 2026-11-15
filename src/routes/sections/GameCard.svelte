<!--
@component
Docs: GameCard. A row of cards with live counts and tags, editing avatars, and the large
Continue playing card with its Play action.
-->
<script lang="ts">
	import { GameCard } from '#lib/components/game-card/index.js';
	import { PlayerCount } from '#lib/components/player-count/index.js';
	import { AvatarStack } from '#lib/components/avatar-stack/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import { art, people } from '../examples';

	let opened = $state('');
	const games = [
		{
			id: 'skyline',
			name: 'Skyline Obby',
			art: art.skyline,
			count: '988',
			tags: 'obby · platformer'
		},
		{
			id: 'frost',
			name: 'Frostbite Arena',
			art: art.frost,
			count: '412',
			tags: 'fighting · action'
		},
		{ id: 'neon', name: 'Neon Drift', art: art.neon, count: '1,204', tags: 'racing' },
		{ id: 'woods', name: 'Quiet Woods', art: art.woods, count: '377', tags: 'survival · horror' }
	];
</script>

<div class="grid gap-8">
	<div>
		<h2 class="mb-3 text-lg font-bold">Continue playing</h2>
		<div class="grid grid-cols-2 gap-4">
			{#each games.slice(0, 2) as game (game.id)}
				<GameCard
					variant="feature"
					name={game.name}
					thumbnail={game.art}
					icon={art.icon}
					onclick={() => (opened = game.name)}
				>
					{#snippet meta()}Last played 2 hours ago{/snippet}
					{#snippet action()}
						<Button variant="primary" size="sm" aria-label="Play {game.name}">
							<MingcutePlayFill aria-hidden="true" />Play
						</Button>
					{/snippet}
				</GameCard>
			{/each}
		</div>
	</div>
	<div>
		<h2 class="mb-3 text-lg font-bold">Popular</h2>
		<div class="grid grid-cols-4 gap-4">
			{#each games as game (game.id)}
				<GameCard name={game.name} thumbnail={game.art} onclick={() => (opened = game.name)}>
					{#snippet overlay()}
						<PlayerCount variant="overlay" count={game.count} label="playing now" />
					{/snippet}
					{#snippet meta()}{game.tags}{/snippet}
				</GameCard>
			{/each}
		</div>
	</div>
	<div>
		<h2 class="mb-3 text-lg font-bold">My games</h2>
		<div class="grid grid-cols-3 gap-4">
			<GameCard
				name="Harbor Tycoon"
				thumbnail={art.frost}
				onclick={() => (opened = 'Harbor Tycoon')}
			>
				{#snippet corner()}
					<AvatarStack
						people={people.slice(0, 2)}
						label="Editing now"
						overflowText={(n) => `+${n}`}
					/>
				{/snippet}
				{#snippet meta()}
					<PlayerCount count="46" label="playing" class="text-xs" />
					<Badge variant="danger" size="sm" class="ml-auto">2 errors</Badge>
				{/snippet}
			</GameCard>
			<GameCard name="Rooftop trials" onclick={() => (opened = 'Rooftop trials')}>
				{#snippet meta()}Not published{/snippet}
			</GameCard>
		</div>
	</div>
	<p class="text-sm text-muted" aria-live="polite">
		{opened ? `Opened ${opened}` : 'Choose a card.'}
	</p>
</div>
