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
			<Pagination count={100} pageSize={10} />
		</div>
	</Card>
</section>
