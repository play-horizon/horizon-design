<!--
@component
Docs: FileTree. Live examples of the FileTree component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { FileTree } from '$lib/editor/file-tree';
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
	<Card>
		<FileTree collection={treeCollection} label="Project files" />
	</Card>
</section>
