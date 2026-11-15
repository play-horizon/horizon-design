<!--
@component
Test fixture of `Pagination.test.ts`: a `Pagination` whose `children` compose the parts into a
compact "page of pages" control between previous and next.
-->
<script lang="ts">
	import Pagination from './Pagination.svelte';
	import PaginationContext from './PaginationContext.svelte';
	import PaginationNextTrigger from './PaginationNextTrigger.svelte';
	import PaginationPrevTrigger from './PaginationPrevTrigger.svelte';

	const translations = {
		rootLabel: 'Pages',
		prevTriggerLabel: 'Previous page',
		nextTriggerLabel: 'Next page',
		itemLabel: ({ page }: { page: number }) => `Page ${page}`
	};
</script>

<Pagination count={30} pageSize={10} {translations}>
	<PaginationPrevTrigger>Previous</PaginationPrevTrigger>
	<PaginationContext>
		{#snippet render(api)}
			<span data-testid="position">{api().page} of {api().totalPages}</span>
		{/snippet}
	</PaginationContext>
	<PaginationNextTrigger>Next</PaginationNextTrigger>
</Pagination>
