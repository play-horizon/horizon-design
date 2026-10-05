<script lang="ts">
	import { Card } from '$lib/components/card';
	import { FileTree } from '$lib/components/file-tree';
	import { createTreeCollection } from '@ark-ui/svelte';

	const treeCollection = createTreeCollection({
		nodeToValue: (node: { id: string; name: string; children?: unknown[] }) => node.id,
		nodeToString: (node: { id: string; name: string; children?: unknown[] }) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'src',
					name: 'src',
					children: [
						{
							id: 'components',
							name: 'components',
							children: [
								{ id: 'button', name: 'button.svelte' },
								{ id: 'input', name: 'input.svelte' }
							]
						},
						{ id: 'routes', name: 'routes', children: [{ id: 'page', name: '+page.svelte' }] }
					]
				},
				{ id: 'package', name: 'package.json' }
			]
		}
	});
</script>

<section id="file-tree">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">File Tree</h2>
	<Card>
		<FileTree collection={treeCollection} />
	</Card>
</section>
