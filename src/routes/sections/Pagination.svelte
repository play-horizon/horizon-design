<!--
@component
Docs: Pagination. Live examples of the Pagination component: its built-in page links, and a
compact control composed from its parts.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import {
		Pagination,
		PaginationContext,
		PaginationNextTrigger,
		PaginationPrevTrigger
	} from '$lib/components/pagination';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	const translations = {
		rootLabel: 'Pages',
		prevTriggerLabel: 'Previous page',
		nextTriggerLabel: 'Next page',
		itemLabel: ({ page, totalPages }: { page: number; totalPages: number }) =>
			`Page ${page} of ${totalPages}`
	};
</script>

<section id="pagination">
	<Card>
		<div class="flex flex-col gap-4">
			<Pagination count={100} pageSize={10} {translations} />
			<Pagination count={100} pageSize={10} {translations}>
				<PaginationPrevTrigger class="text-muted">
					<MingcuteLeftLine class="size-4" aria-hidden="true" />
				</PaginationPrevTrigger>
				<PaginationContext>
					{#snippet render(api)}
						<span class="px-2 text-sm text-muted tabular-nums">
							Page {api().page} of {api().totalPages}
						</span>
					{/snippet}
				</PaginationContext>
				<PaginationNextTrigger class="text-muted">
					<MingcuteRightLine class="size-4" aria-hidden="true" />
				</PaginationNextTrigger>
			</Pagination>
		</div>
	</Card>
</section>
