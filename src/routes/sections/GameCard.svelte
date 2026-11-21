<!--
@component
Docs: GameCard. A playground over its variant, its link or button, its art and every slot, then
the large Continue playing cards with their Play action, a row of cards with live counts and
tags, and cards with editing avatars, a status line, and no thumbnail.
-->
<script lang="ts">
	import { GameCard } from '#lib/components/game-card/index.js';
	import { PlayerCount } from '#lib/components/player-count/index.js';
	import { AvatarStack } from '#lib/components/avatar-stack/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
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
	<Playground
		description="The icon shows on the feature variant only; overlay and corner on the default one."
		controls={{
			name: text('Neon Drift'),
			variant: choice(['default', 'feature'] as const),
			target: choice(['button', 'link'] as const),
			thumbnail: boolean(true),
			icon: boolean(true),
			overlay: boolean(true),
			corner: boolean(),
			meta: boolean(true),
			action: boolean()
		}}
	>
		{#snippet example(values)}
			{#snippet overlay()}
				<PlayerCount variant="overlay" count="1,204" label="playing now" />
			{/snippet}
			{#snippet corner()}
				<AvatarStack
					people={people.slice(0, 2)}
					label="Friends playing"
					overflowText={(n) => `+${n}`}
				/>
			{/snippet}
			{#snippet meta()}racing · multiplayer{/snippet}
			{#snippet action()}
				<Button variant="primary" size="sm" aria-label="Play {values.name}">
					<MingcutePlayFill aria-hidden="true" />Play
				</Button>
			{/snippet}
			<GameCard
				class={values.variant === 'feature' ? 'w-96' : 'w-64'}
				name={values.name}
				variant={values.variant}
				href={values.target === 'link' ? '#top' : undefined}
				onclick={values.target === 'button' ? () => (opened = values.name) : undefined}
				thumbnail={values.thumbnail ? art.neon : undefined}
				icon={values.icon ? art.icon : undefined}
				overlay={values.overlay ? overlay : undefined}
				corner={values.corner ? corner : undefined}
				meta={values.meta ? meta : undefined}
				action={values.action ? action : undefined}
			/>
		{/snippet}
	</Playground>
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
