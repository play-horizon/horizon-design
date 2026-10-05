<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Progress } from '$lib/components/progress';

	let progressValue = $state(72);
</script>

<section id="progress">
	<p class="section-tag">Feedback</p>
	<h2 class="mb-6 text-2xl font-bold">Progress</h2>
	<Card>
		<div class="space-y-3" data-progress-animate>
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium">Upload progress</p>
				<span class="text-muted-foreground text-sm tabular-nums">{progressValue}%</span>
			</div>
			<Progress value={progressValue} class="transition-all duration-1000" />
			<div class="mt-4 grid grid-cols-3 gap-2">
				{#each [{ label: 'CPU', value: 45 }, { label: 'RAM', value: 68 }, { label: 'Disk', value: 23 }] as metric (metric.label)}
					<div class="bg-secondary-active space-y-1.5 rounded-lg p-3">
						<div class="flex items-center justify-between text-xs">
							<span class="text-muted-foreground">{metric.label}</span>
							<span class="font-medium tabular-nums">{metric.value}%</span>
						</div>
						<Progress value={metric.value} class="h-1" />
					</div>
				{/each}
			</div>
		</div>
	</Card>
</section>
