<!--
@component
Docs: HierarchyView. A playground over its props: a scene's objects to select (a background only),
rename with F2, delete, and drag to reparent or reorder; Reset brings the scene back.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { HierarchyView } from '#lib/editor/hierarchy-view/index.js';
	import MingcuteBox3Line from '~icons/mingcute/box-3-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	/** An object of the scene; HierarchyView takes any fields beside these. */
	type SceneNode = {
		id: string;
		name: string;
		children?: SceneNode[];
	};

	const scene: SceneNode[] = [
		{
			id: 'scene',
			name: 'Scene',
			children: [
				{
					id: 'player',
					name: 'Player',
					children: [
						{ id: 'camera', name: 'Camera' },
						{ id: 'mesh', name: 'Mesh' }
					]
				},
				{ id: 'light', name: 'Directional Light' },
				{ id: 'ui', name: 'UI Canvas', children: [{ id: 'hud', name: 'HUD' }] }
			]
		}
	];

	let data = $state.raw<SceneNode[]>(scene);
	let expandedValue = $state(['scene', 'player']);
	let selectedValue = $state<string[]>([]);
</script>

<Playground controls={{ label: text('Scene hierarchy'), customIcons: boolean() }}>
	{#snippet example(values)}
		{#snippet objectIcon()}<MingcuteBox3Line
				class="size-4 text-faint"
				aria-hidden="true"
			/>{/snippet}
		<div class="grid w-full gap-2">
			<div class="h-72 rounded-lg border border-border bg-surface p-1">
				<HierarchyView
					{data}
					onDataChange={(next) => (data = next as SceneNode[])}
					bind:expandedValue
					bind:selectedValue
					label={values.label}
					renameLabel="Name"
					dragLabel={(count) => `${count} objects`}
					icon={values.customIcons ? objectIcon : undefined}
				/>
			</div>
			<Button size="sm" class="justify-self-start" onclick={() => (data = scene)}
				>Reset the scene</Button
			>
		</div>
	{/snippet}
</Playground>
