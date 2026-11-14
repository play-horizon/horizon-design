<!--
@component
Docs: Marquee. Live examples of the Marquee component.
-->
<script lang="ts">
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';
	import { Marquee, MarqueeItem } from '$lib/components/marquee';
</script>

<section id="marquee">
	<Card>
		<div>
			<Marquee class="py-2">
				{#each ['Svelte', 'TypeScript', 'Tailwind', 'Ark UI', 'Zag.js', 'OKLCH', 'Vite', 'SvelteKit'] as name (name)}
					<MarqueeItem class="px-3">
						<Badge variant="neutral" class="whitespace-nowrap">{name}</Badge>
					</MarqueeItem>
				{/each}
			</Marquee>
		</div>
	</Card>
</section>
