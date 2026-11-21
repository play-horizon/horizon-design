<!--
@component
Test fixture of `Table.test.ts`: two rows, a text column and a column rendered by its `cell`
snippet.
-->
<script lang="ts">
	import Table from './Table.svelte';

	const rows = [
		{ id: 'a', name: 'Alice', score: 3 },
		{ id: 'b', name: 'Bob', score: 5 }
	];
</script>

{#snippet scoreCell(row: (typeof rows)[number])}
	<strong>{row.score} points</strong>
{/snippet}

<Table
	aria-label="Scores"
	columns={[
		{ key: 'name', label: 'Name' },
		{ key: 'score', label: 'Score', cell: scoreCell }
	]}
	{rows}
	rowKey={(row) => row.id}
/>
