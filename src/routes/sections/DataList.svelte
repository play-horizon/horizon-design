<!--
@component
Docs: DataList. A playground over the rows (their count, a text pair, a snippet value), then a
game's details with text and snippet values side by side.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { DataList } from '#lib/components/data-list/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	const details = [
		{ label: 'Creator', value: 'Nova Studio' },
		{ label: 'Genre', value: 'Racing' },
		{ label: 'Released', value: 'March 2026' },
		{ label: 'Max players', value: '12' }
	];
</script>

{#snippet active()}
	<Badge variant="success">Active</Badge>
{/snippet}

{#snippet beta()}
	<Badge variant="info">Beta</Badge>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Each value is text or a snippet, such as a badge."
		controls={{
			label: text('Name'),
			value: text('Neon Drift'),
			rows: number(3, { min: 0, max: details.length }),
			snippetValue: boolean(true)
		}}
	>
		{#snippet example(values)}
			<DataList
				items={[
					{ label: values.label, value: values.value },
					// Labels key the rows, so the other rows skip the one typed above.
					...details.slice(0, values.rows).filter((item) => item.label !== values.label),
					...(values.snippetValue && values.label !== 'Status'
						? [{ label: 'Status', value: active }]
						: [])
				]}
			/>
		{/snippet}
	</Playground>
	<Card title="Text and snippet values">
		<DataList
			items={[
				{ label: 'Name', value: 'Neon Drift' },
				...details,
				{ label: 'Status', value: active },
				{ label: 'Channel', value: beta }
			]}
		/>
	</Card>
</div>
