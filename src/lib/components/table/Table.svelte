<!--
@component
A data table from columns and rows.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface Column {
		key: string;
		label: string;
	}

	type CellValue = string | Snippet;

	interface Row {
		[key: string]: CellValue;
	}

	let {
		columns = [],
		rows = [],
		class: className = '',
		...rest
	}: {
		columns?: Column[];
		rows?: Row[];
		class?: string;
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
			{#each rows as row, i (i)}
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
