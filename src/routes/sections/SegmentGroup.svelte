<script lang="ts">
	import { Card } from '$lib/components/card';
	import { SegmentGroup } from '$lib/components/segment-group';
</script>

<section id="segment-group">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Segment Group</h2>
	<Card>
		<div>
			<SegmentGroup
				size="sm"
				defaultValue="day"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
			<SegmentGroup
				size="md"
				defaultValue="day"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
			<SegmentGroup
				size="lg"
				defaultValue="day"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
		</div>
	</Card>
</section>
