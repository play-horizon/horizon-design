<!--
@component
A data table from `columns` and `rows`. A column shows each row's field named by its `key` as
text, or renders its `cell` snippet with the row, for richer content such as a status or a
button. `rowKey` gives each row's stable key.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	/** One column of the table. */
	export interface TableColumn<Row> {
		/** The column's key, unique among the columns; without `cell`, the row's field shown. */
		key: string;
		/** The column's header, translated. */
		label: string;
		/** Renders the column's cell of a row, in place of the field's text. */
		cell?: Snippet<[Row]>;
	}
</script>

<script lang="ts" generics="Row extends Record<string, unknown>">
	import { cn } from '#lib/utils.js';

	let {
		columns,
		rows,
		rowKey,
		class: className = '',
		...rest
	}: {
		/** The columns, in order. */
		columns: readonly TableColumn<Row>[];
		/** The rows, in order. */
		rows: readonly Row[];
		/** A stable, unique key of a row, such as its id. */
		rowKey: (row: Row) => string;
		/** Classes merged onto the `<table>`. */
		class?: string;
		/** Other attributes of the `<table>`. */
		[key: string]: unknown;
	} = $props();
</script>

<div class="w-full overflow-auto">
	<table class={cn('w-full caption-bottom text-sm', className)} data-slot="table" {...rest}>
		<thead class="[&_tr]:border-b [&_tr]:border-border" data-slot="table-header">
			<tr
				class="border-b border-border transition-colors hover:bg-hover data-[state=selected]:bg-hover"
				data-slot="table-row"
			>
				{#each columns as column (column.key)}
					<th
						class="h-10 px-3 text-left align-middle text-xs font-medium text-muted"
						data-slot="table-head"
					>
						{column.label}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="[&_tr:last-child]:border-0" data-slot="table-body">
			{#each rows as row (rowKey(row))}
				<tr
					class="border-b border-border transition-colors hover:bg-hover data-[state=selected]:bg-hover"
					data-slot="table-row"
				>
					{#each columns as column (column.key)}
						<td class="p-3 align-middle text-sm" data-slot="table-cell">
							{#if column.cell}
								{@render column.cell(row)}
							{:else}
								{row[column.key] ?? ''}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
