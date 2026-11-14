<!--
@component
Docs: Table. Live examples of the Table component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Table } from '#lib/components/table/index.js';
</script>

<section id="table">
	<Card>
		<div>
			<Table
				columns={[
					{ key: 'name', label: 'Name' },
					{ key: 'status', label: 'Status' },
					{ key: 'role', label: 'Role' },
					{ key: 'joined', label: 'Joined' }
				]}
				rows={[
					{ name: 'Alice Chen', status: 'online', role: 'Admin', joined: 'Jan 2024' },
					{ name: 'Bob Smith', status: 'away', role: 'Developer', joined: 'Mar 2024' },
					{ name: 'Carol White', status: 'offline', role: 'Designer', joined: 'Jun 2024' }
				]}
				rowKey={(row) => String(row.name)}
			/>
		</div>
	</Card>
</section>
