<!--
@component
Docs: Pagination. Live examples of the Pagination component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Pagination } from '$lib/components/pagination';
</script>

<section id="pagination">
	<Card>
		<div>
			<Pagination
				count={100}
				pageSize={10}
				translations={{
					rootLabel: 'Pages',
					prevTriggerLabel: 'Previous page',
					nextTriggerLabel: 'Next page',
					itemLabel: ({ page, totalPages }: { page: number; totalPages: number }) =>
						`Page ${page} of ${totalPages}`
				}}
			/>
		</div>
	</Card>
</section>
