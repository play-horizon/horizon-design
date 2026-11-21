<!--
@component
Docs: InspectorPanel. A playground over every prop: the cards open and close, reorder by drag or
with Shift+arrows on a header, and, with removal on, each removable card has a remove button (the
Transform card is marked unremovable). Reset brings back the removed cards.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { ScrollArea } from '#lib/components/scroll-area/index.js';
	import { InspectorPanel, type InspectorCard } from '#lib/editor/inspector-panel/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';

	const allCards: InspectorCard[] = [
		{ id: 'transform', title: 'Transform', subtitle: '(3, 0, 0)', removable: false },
		{ id: 'mesh-renderer', title: 'Mesh Renderer', subtitle: 'Standard' },
		{ id: 'box-collider', title: 'Box Collider' },
		{ id: 'rigidbody', title: 'Rigidbody', subtitle: '1 kg' }
	];

	const fields: Record<string, [string, string][]> = {
		transform: [
			['Position', 'X 3  Y 0  Z 0'],
			['Rotation', 'X 0  Y 45  Z 0'],
			['Scale', 'X 1  Y 1  Z 1']
		],
		'mesh-renderer': [
			['Material', 'Standard'],
			['Cast Shadows', 'On'],
			['Receive Shadows', 'On']
		],
		'box-collider': [
			['Is Trigger', 'false'],
			['Center', 'X 0  Y 0  Z 0'],
			['Size', 'X 1  Y 1  Z 1']
		],
		rigidbody: [
			['Mass', '1'],
			['Drag', '0'],
			['Angular Drag', '0.05'],
			['Use Gravity', 'true'],
			['Is Kinematic', 'false']
		]
	};

	let cards = $state(allCards);
	let expandedIds = $state(['transform', 'rigidbody']);

	function remove(card: InspectorCard) {
		cards = cards.filter((c) => c.id !== card.id);
	}
</script>

{#snippet body(card: InspectorCard)}
	<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
		{#each fields[card.id] ?? [] as [label, value] (label)}
			<span class="py-0.5 text-muted">{label}</span>
			<span class="rounded bg-hover/40 px-2 py-0.5 font-mono">{value}</span>
		{/each}
	</div>
{/snippet}

<Playground controls={{ removal: boolean(true) }}>
	{#snippet example(values)}
		<div class="grid w-full gap-2">
			<div class="h-72 overflow-hidden rounded-xl border border-border">
				<ScrollArea class="size-full p-3" label="Components">
					{#if values.removal}
						<InspectorPanel
							bind:cards
							bind:expandedIds
							content={body}
							onRemove={remove}
							removeLabel={(card) => `Remove ${card.title}`}
						/>
					{:else}
						<InspectorPanel bind:cards bind:expandedIds content={body} />
					{/if}
				</ScrollArea>
			</div>
			<Button size="sm" class="justify-self-start" onclick={() => (cards = allCards)}>
				Reset the cards
			</Button>
		</div>
	{/snippet}
</Playground>
