<!--
@component
Docs: FileTree. A playground over its props: a project's files, with folder and file icons, or
the app's own icons; the selected row is shown by its background only.
-->
<script lang="ts">
	import { FileTree } from '#lib/editor/file-tree/index.js';
	import { createTreeCollection } from '@ark-ui/svelte';
	import MingcuteFileLine from '~icons/mingcute/file-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	interface FileNode {
		id: string;
		name: string;
		children?: FileNode[];
	}

	const collection = createTreeCollection<FileNode>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
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

	let expandedValue = $state(['src', 'components']);
	let selectedValue = $state(['button']);
</script>

<Playground controls={{ label: text('Project files'), customIcons: boolean() }}>
	{#snippet example(values)}
		{#snippet plainIcon()}<MingcuteFileLine
				class="size-4 text-faint"
				aria-hidden="true"
			/>{/snippet}
		<div class="grid w-full gap-2">
			<div class="h-64 rounded-lg border border-border bg-surface p-1">
				<FileTree
					{collection}
					label={values.label}
					bind:expandedValue
					bind:selectedValue
					icon={values.customIcons ? plainIcon : undefined}
				/>
			</div>
			<p class="text-sm text-muted">Selected: {selectedValue.join(', ') || 'none'}</p>
		</div>
	{/snippet}
</Playground>
