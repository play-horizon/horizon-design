<!--
@component
Docs: Progress. Live examples of the Progress component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Progress } from '#lib/components/progress/index.js';
</script>

<section id="progress">
	<Card>
		<div class="space-y-3">
			<Progress label="Upload progress" showValue value={72} />
			<div class="mt-4 grid grid-cols-3 gap-2">
				{#each [{ label: 'CPU', value: 45 }, { label: 'RAM', value: 68 }, { label: 'Disk', value: 23 }] as metric (metric.label)}
					<div class="rounded-lg bg-active p-3">
						<Progress label={metric.label} showValue value={metric.value} />
					</div>
				{/each}
			</div>
		</div>
	</Card>
</section>
