<!--
@component
Docs: VirtualList. A playground over the list's props (the number of rows, their height, the
overscan, the row kept rendered out of view) with `scrollToIndex` to jump to a row, then ten
thousand log lines of which only those in view are rendered.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { VirtualList } from '#lib/components/virtual-list/index.js';
	import Playground from '../playground/Playground.svelte';
	import { number } from '../playground/controls';

	interface LogLine {
		id: string;
		label: string;
	}

	function logLines(count: number): LogLine[] {
		return Array.from({ length: count }, (_, index) => ({
			id: `row-${index}`,
			label: `Log line ${index + 1}`
		}));
	}

	const rows = logLines(10_000);

	let list: { scrollToIndex: (index: number) => void } | undefined = $state();
	let target = $state('500');
</script>

{#snippet logRow(item: LogLine, index: number, count: number, kept = -1)}
	<div
		role="listitem"
		aria-posinset={index + 1}
		aria-setsize={count}
		class={[
			'flex h-full items-center border-b border-border px-3 font-mono text-xs text-fg-2',
			index === kept && 'bg-primary-subtle text-fg'
		]}
	>
		{item.label}
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Scroll the list: only the rows in view, plus the overscan, are in the page."
		controls={{
			count: number(1000, { min: 0, max: 100_000, step: 100 }),
			itemHeight: number(28, { min: 20, max: 64 }),
			overscan: number(6, { min: 0, max: 30 }),
			keepIndex: number(0, { min: -1 })
		}}
	>
		{#snippet example(values)}
			{@const items = logLines(values.count)}
			<div class="grid w-full gap-3">
				<VirtualList
					bind:this={list}
					{items}
					itemHeight={values.itemHeight}
					overscan={values.overscan}
					keepIndex={values.keepIndex < 0 ? undefined : values.keepIndex}
					key={(item) => item.id}
					role="list"
					aria-label="Playground log"
					tabindex={0}
					class="h-64 rounded-md border border-border bg-sunken"
				>
					{#snippet row(item, index)}
						{@render logRow(item, index, items.length, values.keepIndex)}
					{/snippet}
				</VirtualList>
				<form
					class="flex items-end gap-2"
					onsubmit={(event) => {
						event.preventDefault();
						list?.scrollToIndex(Number(target) - 1);
					}}
				>
					<label class="grid gap-1 text-xs font-medium">
						Line
						<Input size="sm" inputmode="numeric" class="w-24" bind:value={target} />
					</label>
					<Button size="sm" type="submit">Scroll to it</Button>
				</form>
			</div>
		{/snippet}
	</Playground>
	<Card title="10,000 rows" description="Each row is 28 px; the list renders about twenty of them.">
		<VirtualList
			items={rows}
			itemHeight={28}
			key={(row) => row.id}
			role="list"
			aria-label="Log"
			tabindex={0}
			class="h-72 rounded-md border border-border bg-sunken"
		>
			{#snippet row(item, index)}
				{@render logRow(item, index, rows.length)}
			{/snippet}
		</VirtualList>
	</Card>
</div>
