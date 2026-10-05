<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Table } from '$lib/components/table';
</script>

<section id="table">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Table</h2>
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
			/>
		</div>
	</Card>
</section>
