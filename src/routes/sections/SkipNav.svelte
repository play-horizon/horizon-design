<!--
@component
Docs: SkipNav. Live examples of the SkipNav component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { SkipNav } from '$lib/components/skip-nav';
</script>

<section id="skip-nav">
	<Card>
		<div class="flex flex-col gap-3">
			<SkipNav class="sr-only focus-visible:not-sr-only">Skip to content</SkipNav>
			<p class="text-sm text-muted">
				Focus the page with keyboard navigation to reveal the skip link.
			</p>
		</div>
	</Card>
</section>
