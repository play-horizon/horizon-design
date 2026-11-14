<!--
@component
Docs: VirtualList. Ten thousand rows, of which only those in view are rendered.
-->
<script lang="ts">
	import { VirtualList } from '$lib/components/virtual-list';
	import { Card } from '$lib/components/card';

	const rows = Array.from({ length: 10_000 }, (_, i) => ({
		id: `row-${i}`,
		label: `Log line ${i + 1}`
	}));
</script>

<Card title="10,000 rows" description="Each row is 28 px; the list renders about twenty of them.">
	<VirtualList
		items={rows}
		itemHeight={28}
		key={(row) => row.id}
		role="list"
		aria-label="Log"
		class="h-72 rounded-md border border-border bg-sunken"
	>
		{#snippet row(item, index)}
			<div
				role="listitem"
				aria-posinset={index + 1}
				aria-setsize={rows.length}
				class="flex h-full items-center border-b border-border px-3 font-mono text-xs text-fg-2"
			>
				{item.label}
			</div>
		{/snippet}
	</VirtualList>
</Card>
