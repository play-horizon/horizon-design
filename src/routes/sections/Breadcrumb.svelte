<!--
@component
Docs: Breadcrumb. A playground over its props (the trail's name and how deep it goes), then trails
of one, two and five pages, the last wrapping in a narrow column.
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { Breadcrumb } from '#lib/components/breadcrumb/index.js';
	import { Card } from '#lib/components/card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { number, text } from '../playground/controls';

	const pages = ['Home', 'Games', 'Sky Racer', 'Places', 'Lobby'];
	const here = resolve('/[section]', { section: 'breadcrumb' });

	/** The first `depth` pages, each a link but the last, the current page. */
	function trail(depth: number) {
		return pages
			.slice(0, depth)
			.map((label, index) => (index < depth - 1 ? { label, href: here } : { label }));
	}
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Breadcrumb'),
			depth: number(3, { min: 1, max: pages.length })
		}}
	>
		{#snippet example(values)}
			<Breadcrumb label={values.label} items={trail(values.depth)} />
		{/snippet}
	</Playground>
	<Card title="Depths" description="The current page comes last and is not a link.">
		<div class="grid gap-3">
			<Breadcrumb label="One page" items={trail(1)} />
			<Breadcrumb label="Two pages" items={trail(2)} />
			<Breadcrumb label="Five pages" items={trail(5)} />
			<div class="max-w-44 rounded-md border border-dashed border-border p-2">
				<Breadcrumb label="Wrapping trail" items={trail(5)} />
			</div>
		</div>
	</Card>
</div>
