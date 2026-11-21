<!--
@component
Docs: Pagination. A playground over every prop (the item count, the page size, the sibling and
boundary links), then the first, a middle and the last page of a long list, a short list, and a
compact control composed from the parts. The arrows show their names as tooltips.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import {
		Pagination,
		PaginationContext,
		PaginationNextTrigger,
		PaginationPrevTrigger
	} from '#lib/components/pagination/index.js';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import Playground from '../playground/Playground.svelte';
	import { number } from '../playground/controls';

	const translations = {
		rootLabel: 'Pages',
		prevTriggerLabel: 'Previous page',
		nextTriggerLabel: 'Next page',
		itemLabel: ({ page, totalPages }: { page: number; totalPages: number }) =>
			`Page ${page} of ${totalPages}`
	};

	let page = $state(1);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			count: number(200, { min: 0, step: 10 }),
			pageSize: number(10, { min: 1, step: 1 }),
			siblingCount: number(1, { min: 0, max: 5, step: 1 }),
			boundaryCount: number(1, { min: 0, max: 5, step: 1 })
		}}
	>
		{#snippet example(values)}
			<div class="grid justify-items-center gap-2">
				<Pagination
					bind:page
					count={values.count}
					pageSize={values.pageSize}
					siblingCount={values.siblingCount}
					boundaryCount={values.boundaryCount}
					translations={{ ...translations, rootLabel: 'Playground pages' }}
				/>
				<p class="text-xs text-muted">Page {page}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Positions" description="On the first page, Previous is disabled; on the last, Next.">
		<div class="grid gap-3">
			<Pagination
				count={100}
				defaultPage={1}
				translations={{ ...translations, rootLabel: 'First page' }}
			/>
			<Pagination
				count={100}
				defaultPage={5}
				translations={{ ...translations, rootLabel: 'Middle page' }}
			/>
			<Pagination
				count={100}
				defaultPage={10}
				translations={{ ...translations, rootLabel: 'Last page' }}
			/>
			<Pagination count={30} translations={{ ...translations, rootLabel: 'Short list' }} />
		</div>
	</Card>
	<Card title="Composed from the parts" description="Icon-only arrows take a label: their tooltip.">
		<Pagination count={100} translations={{ ...translations, rootLabel: 'Compact pages' }}>
			<PaginationPrevTrigger class="text-muted" label={translations.prevTriggerLabel}>
				<MingcuteLeftLine class="size-4" aria-hidden="true" />
			</PaginationPrevTrigger>
			<PaginationContext>
				{#snippet render(api)}
					<span class="px-2 text-sm text-muted tabular-nums">
						Page {api().page} of {api().totalPages}
					</span>
				{/snippet}
			</PaginationContext>
			<PaginationNextTrigger class="text-muted" label={translations.nextTriggerLabel}>
				<MingcuteRightLine class="size-4" aria-hidden="true" />
			</PaginationNextTrigger>
		</Pagination>
	</Card>
</div>
