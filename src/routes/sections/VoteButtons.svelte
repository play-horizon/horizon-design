<!--
@component
Docs: VoteButtons. A playground over every prop (the account's vote, the counts, the labels,
disabled), then a vote that can be taken back, each vote shown pressed, and the disabled state
for an account that may not vote yet.
-->
<script lang="ts">
	import { VoteButtons, type Vote } from '#lib/components/vote-buttons/index.js';
	import { Card } from '#lib/components/card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	let vote = $state<Vote>('up');
	const labels = { group: 'Vote', up: 'Vote up', down: 'Vote down' };
</script>

<div class="grid gap-4">
	<Playground
		description="The labels are only announced: the group, then each button before its count."
		controls={{
			vote: choice(['none', 'up', 'down'] as const),
			upCount: text('4.2k'),
			downCount: text('310'),
			group: text('Vote'),
			up: text('Vote up'),
			down: text('Vote down'),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<VoteButtons
				vote={values.vote === 'none' ? null : values.vote}
				upCount={values.upCount}
				downCount={values.downCount}
				labels={{ group: values.group, up: values.up, down: values.down }}
				disabled={values.disabled}
			/>
		{/snippet}
	</Playground>
	<Card title="Voting" description="Pressing the current vote again takes it back.">
		<div class="flex items-center gap-4">
			<VoteButtons
				bind:vote
				upCount={vote === 'up' ? '4.2k' : '4.1k'}
				downCount={vote === 'down' ? '311' : '310'}
				{labels}
			/>
			<span class="text-sm text-muted">Your vote: {vote ?? 'none'}</span>
		</div>
	</Card>
	<Card title="Votes" description="No vote, an up vote and a down vote.">
		<div class="flex flex-wrap items-center gap-4">
			<VoteButtons vote={null} upCount="4.2k" downCount="310" {labels} />
			<VoteButtons vote="up" upCount="4.2k" downCount="310" {labels} />
			<VoteButtons vote="down" upCount="4.2k" downCount="310" {labels} />
		</div>
	</Card>
	<Card title="Not allowed yet">
		<div class="flex items-center gap-4">
			<VoteButtons upCount="4.2k" downCount="310" {labels} disabled />
			<span class="text-sm text-muted">Play the game to vote on it.</span>
		</div>
	</Card>
</div>
