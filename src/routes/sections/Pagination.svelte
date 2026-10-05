<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Pagination } from '$lib/components/pagination';
</script>

<section id="pagination">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Pagination</h2>
	<Card>
		<div>
			<Pagination count={100} pageSize={10} />
		</div>
	</Card>
</section>
