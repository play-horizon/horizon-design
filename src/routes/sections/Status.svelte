<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Status } from '$lib/components/status';
</script>

<section id="status">
	<p class="section-tag">Indicators</p>
	<h2 class="mb-6 text-2xl font-bold">Status</h2>
	<Card>
		<div class="space-y-4">
			{#each [{ variant: 'online', label: 'Online' }, { variant: 'away', label: 'Away' }, { variant: 'busy', label: 'Busy' }, { variant: 'offline', label: 'Offline' }] as s (s.variant)}
				<div class="flex items-center gap-3">
					<div class="relative flex size-4 justify-center">
						<Status variant={s.variant as 'online' | 'offline' | 'away' | 'busy'} />
					</div>
					<span class="text-sm font-medium">{s.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</section>
