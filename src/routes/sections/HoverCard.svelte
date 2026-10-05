<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
	import { Badge } from '$lib/components/badge';
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { HoverCard } from '$lib/components/hover-card';
</script>

<section id="hover-card">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Hover Card</h2>
	<Card>
		<HoverCard triggerClass={buttonVariants({ variant: 'outline' })}>
			{#snippet trigger()}Hover me{/snippet}
			<div class="flex items-start gap-3">
				<Avatar size="md" fallback="HD" />
				<div>
					<p class="text-sm font-semibold">horizon-design</p>
					<p class="text-muted-foreground mt-0.5 text-xs">Svelte 5 UI library</p>
					<Badge variant="secondary" class="mt-2 text-xs">v1.0.0</Badge>
				</div>
			</div>
		</HoverCard>
	</Card>
</section>
