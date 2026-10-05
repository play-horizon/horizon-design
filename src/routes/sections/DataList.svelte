<script lang="ts">
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';
	import { DataList } from '$lib/components/data-list';
</script>

<section id="data-list">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Data List</h2>
	<Card>
		<div>
			{#snippet dataListStatus()}
				<Badge variant="success">Active</Badge>
			{/snippet}
			<DataList
				items={[
					{ label: 'Name', value: 'John Doe' },
					{ label: 'Role', value: 'Administrator' },
					{ label: 'Status', value: dataListStatus },
					{ label: 'Email', value: 'john@example.com' }
				]}
			/>
		</div>
	</Card>
</section>
