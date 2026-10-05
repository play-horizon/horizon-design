<script lang="ts">
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';
	import { RadioGroup } from '$lib/components/radio-group';
</script>

<section id="radio-group">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Radio Group</h2>
	{#snippet proLabel()}
		<span class="text-sm font-medium"
			>Pro <Badge variant="info" class="ml-1 py-0 text-[10px]">Popular</Badge></span
		>
	{/snippet}
	<Card>
		<RadioGroup
			defaultValue="pro"
			label="Subscription plan"
			items={[
				{ value: 'free', label: 'Free' },
				{ value: 'pro', label: proLabel },
				{ value: 'enterprise', label: 'Enterprise' }
			]}
		/>
	</Card>
</section>
