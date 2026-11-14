<!--
@component
Docs: Status. Live examples of the Status component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Status } from '#lib/components/status/index.js';
</script>

<section id="status">
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
