<!--
@component
Docs: Marquee. Live examples of the Marquee component.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Marquee, MarqueeItem } from '#lib/components/marquee/index.js';
</script>

<section id="marquee">
	<Card>
		<div>
			<Marquee label="Technologies" roleDescription="marquee" class="py-2">
				{#each ['Svelte', 'TypeScript', 'Tailwind', 'Ark UI', 'Zag.js', 'OKLCH', 'Vite', 'SvelteKit'] as name (name)}
					<MarqueeItem class="px-3">
						<Badge variant="neutral" class="whitespace-nowrap">{name}</Badge>
					</MarqueeItem>
				{/each}
			</Marquee>
		</div>
	</Card>
</section>
