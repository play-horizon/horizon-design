<script lang="ts">
	import { ScrollArea } from '$lib/components/scroll-area';
	import { InspectorPanel } from '$lib/components/inspector-panel';

	let inspectorCards = $state([
		{ id: 'transform', title: 'Transform', subtitle: '(3, 0, 0)' },
		{ id: 'mesh-renderer', title: 'Mesh Renderer', subtitle: 'Standard' },
		{ id: 'box-collider', title: 'Box Collider' },
		{ id: 'rigidbody', title: 'Rigidbody', subtitle: '1 kg' }
	]);

	let inspectorExpanded = $state(['transform', 'rigidbody']);
</script>

<section id="inspector-panel">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Inspector Panel</h2>
	<div
		class="border-border min-h-40 w-full resize-y overflow-hidden rounded-xl border"
		style="height: 180px;"
	>
		<ScrollArea class="size-full p-3">
			<InspectorPanel bind:cards={inspectorCards} bind:expandedIds={inspectorExpanded}>
				{#snippet content(card)}
					{#if card.id === 'transform'}
						<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
							{#each [['Position', 'X 3  Y 0  Z 0'], ['Rotation', 'X 0  Y 45  Z 0'], ['Scale', 'X 1  Y 1  Z 1']] as [label, value] (label)}
								<span class="text-muted-foreground py-0.5">{label}</span>
								<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
							{/each}
						</div>
					{:else if card.id === 'mesh-renderer'}
						<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
							{#each [['Material', 'Standard'], ['Cast Shadows', 'On'], ['Receive Shadows', 'On']] as [label, value] (label)}
								<span class="text-muted-foreground py-0.5">{label}</span>
								<span class="bg-muted/40 rounded px-2 py-0.5">{value}</span>
							{/each}
						</div>
					{:else if card.id === 'box-collider'}
						<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
							{#each [['Is Trigger', 'false'], ['Center', 'X 0  Y 0  Z 0'], ['Size', 'X 1  Y 1  Z 1']] as [label, value] (label)}
								<span class="text-muted-foreground py-0.5">{label}</span>
								<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
							{/each}
						</div>
					{:else if card.id === 'rigidbody'}
						<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
							{#each [['Mass', '1'], ['Drag', '0'], ['Angular Drag', '0.05'], ['Use Gravity', 'true'], ['Is Kinematic', 'false']] as [label, value] (label)}
								<span class="text-muted-foreground py-0.5">{label}</span>
								<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
							{/each}
						</div>
						<button
							class="bg-muted hover:bg-muted/70 mt-2 w-full rounded px-2 py-1 text-xs transition-colors"
						>
							Apply Preset
						</button>
					{/if}
				{/snippet}
			</InspectorPanel>
		</ScrollArea>
	</div>
</section>
