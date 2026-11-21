<!--
@component
Docs: AssetCard. A playground over every prop; a picker of selectable cards; store listings that
link to their page, with Add to my assets apart; and plain display cards, with no action.
-->
<script lang="ts">
	import { AssetCard } from '#lib/components/asset-card/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteMusic2Line from '~icons/mingcute/music-2-line';
	import MingcuteThumbUp2Line from '~icons/mingcute/thumb-up-2-line';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	let chosen = $state('sky');
	let added = $state<string[]>([]);

	const listings = [
		{ id: 'sky', name: 'Sunset sky', kind: 'Sky', art: art.skyline, votes: '128' },
		{ id: 'ice', name: 'Ice floor', kind: 'Texture', art: art.frost, votes: '64' },
		{ id: 'pine', name: 'Pine forest', kind: 'Prefab', art: art.woods, votes: '301' }
	];
</script>

{#snippet votes(count: string)}
	<span class="inline-flex items-center gap-1">
		<MingcuteThumbUp2Line class="size-3" aria-hidden="true" />{count}
	</span>
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			name: text('Sunset sky'),
			kind: text('Sky'),
			action: choice(['none', 'href', 'onclick', 'selectable']),
			selected: boolean(true),
			thumbnail: boolean(true),
			meta: boolean(true),
			actions: boolean()
		}}
	>
		{#snippet example(values)}
			{#snippet meta()}{@render votes('128')}{/snippet}
			{#snippet actions()}
				<Button size="xs" variant="tint">
					<MingcuteAddLine aria-hidden="true" />Add to my assets
				</Button>
			{/snippet}
			{#snippet placeholder()}<MingcuteMusic2Line aria-hidden="true" />{/snippet}
			<AssetCard
				class="w-44"
				name={values.name}
				kind={values.kind}
				thumbnail={values.thumbnail ? art.skyline : undefined}
				{placeholder}
				href={values.action === 'href' ? '#top' : undefined}
				onclick={values.action === 'onclick' || values.action === 'selectable'
					? () => {}
					: undefined}
				selectable={values.action === 'selectable'}
				selected={values.selected}
				meta={values.meta ? meta : undefined}
				actions={values.actions ? actions : undefined}
			/>
		{/snippet}
	</Playground>
	<Card
		title="A picker"
		description="Selectable cards: one is chosen, pressing another chooses it."
	>
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each listings as listing (listing.id)}
				<AssetCard
					name={listing.name}
					kind={listing.kind}
					thumbnail={listing.art}
					selectable
					selected={chosen === listing.id}
					onclick={() => (chosen = listing.id)}
				/>
			{/each}
			<AssetCard
				name="Harbor ambience"
				kind="Audio"
				selectable
				selected={chosen === 'audio'}
				onclick={() => (chosen = 'audio')}
			>
				{#snippet placeholder()}<MingcuteMusic2Line aria-hidden="true" />{/snippet}
			</AssetCard>
		</div>
	</Card>
	<Card
		title="Store listings"
		description="Each card links to its page; Add to my assets is its own button."
	>
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each listings as listing (listing.id)}
				<AssetCard name={listing.name} kind={listing.kind} thumbnail={listing.art} href="#top">
					{#snippet meta()}{@render votes(listing.votes)}{/snippet}
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
		</div>
	</Card>
	<Card title="Display only" description="No href, no onclick: no hover, no pointer, no focus.">
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each listings as listing (listing.id)}
				<AssetCard name={listing.name} kind={listing.kind} thumbnail={listing.art}>
					{#snippet meta()}{@render votes(listing.votes)}{/snippet}
				</AssetCard>
			{/each}
		</div>
	</Card>
</div>
