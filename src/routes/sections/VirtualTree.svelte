<!--
@component
Docs: VirtualTree. A playground over every prop, on a scene's hierarchy with thousands of objects:
selection (single or multiple, a background only), typeahead, renaming with F2, and the keyboard of
a tree view.
-->
<script lang="ts">
	import { VirtualTree, createTreeCollection } from '#lib/components/virtual-tree/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

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
	/** The names given with F2, by object id. */
	const names: Record<string, string> = $state({});
</script>

<Playground
	description="Expand Crates: 5,000 children, rendered only as they scroll into view. Changing multiple, the row height or the indentation starts the tree over."
	controls={{
		label: text('Hierarchy'),
		multiple: boolean(true),
		expandOnClick: boolean(),
		renaming: boolean(true),
		itemHeight: number(28, { min: 20, max: 48, step: 2 }),
		indent: number(16, { min: 8, max: 32, step: 2 })
	}}
>
	{#snippet example(values)}
		<div class="grid w-full gap-3">
			{#key [values.multiple, values.itemHeight, values.indent]}
				<VirtualTree
					{collection}
					bind:expandedValue={expanded}
					bind:selectedValue={selected}
					label={values.label}
					multiple={values.multiple}
					expandOnClick={values.expandOnClick}
					itemHeight={values.itemHeight}
					indent={values.indent}
					rename={values.renaming
						? {
								label: 'Name',
								canRename: () => true,
								onRename: ({ value, label }) => (names[value] = label)
							}
						: undefined}
					onActivate={(o) => (activated = o.name)}
					class="h-80 border border-border bg-surface p-1"
				>
					{#snippet row(object, state)}
						<Badge variant={object.mode} size="sm" class="w-4.25 justify-center px-0">
							{object.mode === 'server' ? 'S' : 'L'}
						</Badge>
						{#if !state.renaming}<span class="truncate">
								{names[object.id] ?? object.name}
							</span>{/if}
					{/snippet}
				</VirtualTree>
			{/key}
			<p class="text-sm text-muted">
				Selected: {selected.join(', ') || 'none'}{activated ? ` · Activated: ${activated}` : ''}
			</p>
		</div>
	{/snippet}
</Playground>
