<!--
@component
Docs: VirtualTree. A scene's hierarchy with thousands of objects, multiple selection, typeahead
and the keyboard of a tree view.
-->
<script lang="ts">
	import { VirtualTree, createTreeCollection } from '$lib/components/virtual-tree';
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';

	interface SceneObject {
		id: string;
		name: string;
		mode: 'server' | 'local';
		children?: SceneObject[];
	}

	const objects: SceneObject[] = [
		{ id: 'spawn', name: 'SpawnPoint', mode: 'server' },
		{
			id: 'pier',
			name: 'Pier',
			mode: 'server',
			children: [
				{ id: 'planks', name: 'Pier planks', mode: 'server' },
				{ id: 'bollards', name: 'Bollards', mode: 'server' }
			]
		},
		{
			id: 'crane',
			name: 'Crane',
			mode: 'server',
			children: [
				{
					id: 'hook',
					name: 'Hook',
					mode: 'server',
					children: [{ id: 'light', name: 'Warning light', mode: 'local' }]
				}
			]
		},
		{
			id: 'crates',
			name: 'Crates',
			mode: 'server',
			children: Array.from({ length: 5000 }, (_, i) => ({
				id: `crate-${i}`,
				name: `Crate ${i + 1}`,
				mode: 'server' as const
			}))
		},
		{ id: 'birds', name: 'Ambient birds', mode: 'local' }
	];

	const collection = createTreeCollection<SceneObject>({
		nodeToValue: (o) => o.id,
		nodeToString: (o) => o.name,
		rootNode: { id: 'scene', name: 'Scene', mode: 'server', children: objects }
	});

	let expanded = $state(['pier', 'crane', 'hook']);
	let selected = $state(['crane']);
	let activated = $state('');
</script>

<Card
	title="Hierarchy"
	description="Expand Crates: 5,000 children, rendered only as they scroll into view."
>
	<VirtualTree
		{collection}
		bind:expandedValue={expanded}
		bind:selectedValue={selected}
		multiple
		label="Hierarchy"
		onActivate={(o) => (activated = o.name)}
		class="h-80 border border-border bg-surface p-1"
	>
		{#snippet row(object)}
			<Badge variant={object.mode} size="sm" class="w-4.25 justify-center px-0">
				{object.mode === 'server' ? 'S' : 'L'}
			</Badge>
			<span class="truncate">{object.name}</span>
		{/snippet}
	</VirtualTree>
	<p class="mt-3 text-sm text-muted">
		Selected: {selected.join(', ') || 'none'}{activated ? ` · Activated: ${activated}` : ''}
	</p>
</Card>
