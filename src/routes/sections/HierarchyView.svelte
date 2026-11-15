<!--
@component
Docs: HierarchyView. Live examples of the HierarchyView component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { HierarchyView } from '#lib/editor/hierarchy-view/index.js';

	const hierarchyData = [
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
				{
					id: 'ui',
					name: 'UI Canvas',
					children: [{ id: 'hud', name: 'HUD' }]
				}
			]
		}
	];
	let hierarchyExpanded = $state(['scene', 'player']);
</script>

<section id="hierarchy-view">
	<Card class="h-180">
		<HierarchyView
			data={hierarchyData}
			bind:expandedValue={hierarchyExpanded}
			label="Scene hierarchy"
			renameLabel="Name"
			dragLabel={(count) => `${count} objects`}
		/>
	</Card>
</section>
