<!--
@component
Docs: Status. A playground over the variant and the accessible name, then every variant with its
status written next to it (the dot decorative), and dots named by their `label` alone.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Status } from '#lib/components/status/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, text } from '../playground/controls';

	const statuses = [
		{ variant: 'online', label: 'Online' },
		{ variant: 'away', label: 'Away' },
		{ variant: 'busy', label: 'Busy' },
		{ variant: 'offline', label: 'Offline' }
	] as const;
</script>

<div class="grid gap-4">
	<Playground
		description="Without a label the dot is decorative, for a status written next to it."
		controls={{
			variant: choice(
				statuses.map((status) => status.variant),
				'online'
			),
			label: text('Online')
		}}
	>
		{#snippet example(values)}
			<Status variant={values.variant} label={values.label || undefined} />
		{/snippet}
	</Playground>
	<Card title="Variants" description="Online or running, away, busy or failing, and offline.">
		<div class="space-y-4">
			{#each statuses as status (status.variant)}
				<div class="flex items-center gap-3">
					<Status variant={status.variant} />
					<span class="text-sm font-medium">{status.label}</span>
				</div>
			{/each}
		</div>
	</Card>
	<Card title="Named by its label" description="With nothing written next to it, the dot is named.">
		<div class="flex items-center gap-4">
			{#each statuses as status (status.variant)}
				<Status variant={status.variant} label={status.label} />
			{/each}
		</div>
	</Card>
</div>
