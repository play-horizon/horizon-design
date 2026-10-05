<script lang="ts">
	import { Card } from '$lib/components/card';
	import { HierarchyView } from '$lib/components/hierarchy-view';

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
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Hierarchy View</h2>
	<Card class="h-180">
		<HierarchyView data={hierarchyData} />
	</Card>
</section>
