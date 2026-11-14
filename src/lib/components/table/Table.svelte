<!--
@component
A data table from columns and rows.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	/** One column of the table. */
	interface Column {
		/** The key of each row's value in this column, unique among the columns. */
		key: string;
		/** The column's header, translated. */
		label: string;
	}

	/** A cell: text, or a snippet for richer content. */
	type CellValue = string | Snippet;

	/** One row: its cells by column key. */
	interface Row {
		[key: string]: CellValue;
	}

	let {
		columns = [],
		rows = [],
		rowKey,
		class: className = '',
		...rest
	}: {
		/** The columns, in order. */
		columns?: Column[];
		/** The rows, in order. */
		rows?: Row[];
		/** A stable, unique key of a row, such as its id. */
		rowKey: (row: Row) => string;
		class?: string;
		/** Other attributes of the `<table>`. */
		[key: string]: unknown;
	} = $props();

	function isSnippet(v: CellValue): v is Snippet {
		return typeof v === 'function';
	}
</script>

<div class="w-full overflow-auto">
	<table class={cn('w-full caption-bottom text-sm', className)} data-slot="table" {...rest}>
		<thead class="[&_tr]:border-b [&_tr]:border-border" data-slot="table-header">
			<tr
				class="border-b border-border transition-colors hover:bg-hover data-[state=selected]:bg-hover"
				data-slot="table-row"
			>
				{#each columns as col (col.key)}
					<th
						class="h-10 px-3 text-left align-middle text-xs font-medium text-muted"
						data-slot="table-head"
					>
						{col.label}
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
					{#each columns as col (col.key)}
						<td class="p-3 align-middle text-sm" data-slot="table-cell">
							{#if isSnippet(row[col.key])}
								{@render (row[col.key] as Snippet)()}
							{:else}
								{row[col.key] ?? ''}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
