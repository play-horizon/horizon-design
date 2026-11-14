<!--
@component
Docs: VoteButtons. A vote that can be taken back, and the disabled state for an account that may
not vote yet.
-->
<script lang="ts">
	import { VoteButtons, type Vote } from '#lib/components/vote-buttons/index.js';
	import { Card } from '#lib/components/card/index.js';

	let vote = $state<Vote>('up');
	const labels = { group: 'Vote', up: 'Vote up', down: 'Vote down' };
</script>

<div class="grid gap-4">
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
	<Card title="Not allowed yet">
		<div class="flex items-center gap-4">
			<VoteButtons upCount="4.2k" downCount="310" {labels} disabled />
			<span class="text-sm text-muted">Play the game to vote on it.</span>
		</div>
	</Card>
</div>
