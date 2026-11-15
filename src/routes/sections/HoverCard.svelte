<!--
@component
Docs: HoverCard. Live examples of the HoverCard component.
-->
<script lang="ts">
	import { Avatar } from '#lib/components/avatar/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { HoverCard } from '#lib/components/hover-card/index.js';
</script>

<section id="hover-card">
	<Card>
		<HoverCard triggerClass={buttonVariants({ variant: 'default' })}>
			{#snippet trigger()}Hover me{/snippet}
			<div class="flex items-start gap-3">
				<Avatar size="md" fallback="HD" />
				<div>
					<p class="text-sm font-semibold">horizon-design</p>
					<p class="mt-0.5 text-xs text-muted">Svelte 5 UI library</p>
					<Badge variant="neutral" class="mt-2 text-xs">v1.0.0</Badge>
				</div>
			</div>
		</HoverCard>
	</Card>
</section>
