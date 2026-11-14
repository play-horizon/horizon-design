<!--
@component
Docs: HierarchyView. Live examples of the HierarchyView component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { HierarchyView } from '$lib/editor/hierarchy-view';

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
</script>

<section id="hierarchy-view">
	<Card class="h-180">
		<HierarchyView data={hierarchyData} dragLabel={(count) => `${count} objects`} />
	</Card>
</section>
