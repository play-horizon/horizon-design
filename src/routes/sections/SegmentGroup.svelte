<!--
@component
Docs: SegmentGroup. Live examples of the SegmentGroup component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { SegmentGroup } from '#lib/components/segment-group/index.js';
</script>

<section id="segment-group">
	<Card>
		<div>
			<SegmentGroup
				size="sm"
				defaultValue="day"
				aria-label="Period"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
			<SegmentGroup
				size="md"
				defaultValue="day"
				aria-label="Period"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
			<SegmentGroup
				size="lg"
				defaultValue="day"
				aria-label="Period"
				items={[
					{ value: 'day', label: 'Day' },
					{ value: 'week', label: 'Week' },
					{ value: 'month', label: 'Month' }
				]}
			/>
		</div>
	</Card>
</section>
