<!--
@component
Docs: Float. A playground over its position and how many children it stacks, then every position
side by side. Each example is pinned inside its frame (`class="absolute"`) instead of the window.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Float } from '#lib/components/float/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteChat1Line from '~icons/mingcute/chat-1-line';
	import MingcuteShareForwardLine from '~icons/mingcute/share-forward-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';

	const positions = [
		'bottom-right',
		'bottom-left',
		'top-right',
		'top-left',
		'bottom-center'
	] as const;
	const actions = [
		{ id: 'new', label: 'New game', icon: MingcuteAddLine },
		{ id: 'chat', label: 'Open the chat', icon: MingcuteChat1Line },
		{ id: 'share', label: 'Share', icon: MingcuteShareForwardLine }
	];
</script>

<div class="grid gap-4">
	<Playground
		description="Several children stack in a column, aligned to the chosen side."
		controls={{
			position: choice(positions),
			buttons: number(1, { min: 1, max: actions.length }),
			withText: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="relative h-56 w-full overflow-hidden rounded-xl border border-border bg-sunken">
				<Float class="absolute z-0" position={values.position}>
					{#if values.withText}
						<Button variant="primary" pill class="shadow-lg">
							<MingcuteAddLine aria-hidden="true" />
							New game
						</Button>
					{/if}
					{#each actions.slice(0, values.buttons) as action (action.id)}
						<IconButton
							label={action.label}
							variant="primary"
							size="lg"
							class="rounded-full shadow-lg"
						>
							<action.icon aria-hidden="true" />
						</IconButton>
					{/each}
				</Float>
			</div>
		{/snippet}
	</Playground>
	<Card title="Positions">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each positions as position (position)}
				<div class="grid gap-1.5">
					<p class="text-xs text-muted">{position}</p>
					<div class="relative h-32 overflow-hidden rounded-xl border border-border bg-sunken">
						<Float class="absolute z-0" {position}>
							<IconButton
								label="New game ({position})"
								variant="primary"
								class="rounded-full shadow-lg"
							>
								<MingcuteAddLine aria-hidden="true" />
							</IconButton>
						</Float>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>
