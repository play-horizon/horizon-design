<!--
@component
Docs: DataList. Live examples of the DataList component.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { DataList } from '#lib/components/data-list/index.js';
</script>

<section id="data-list">
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
