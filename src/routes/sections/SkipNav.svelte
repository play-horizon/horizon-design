<script lang="ts">
	import { Card } from '$lib/components/card';
	import { SkipNav } from '$lib/components/skip-nav';
</script>

<section id="skip-nav">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Skip Nav</h2>
	<Card>
		<div class="flex flex-col gap-3">
			<SkipNav class="sr-only focus-visible:not-sr-only">Skip to content</SkipNav>
			<p class="text-muted-foreground text-sm">
				Focus the page with keyboard navigation to reveal the skip link.
			</p>
		</div>
	</Card>
</section>
