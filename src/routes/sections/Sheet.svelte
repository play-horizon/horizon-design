<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Sheet } from '$lib/components/sheet';
	import MingcuteDownLine from '~icons/mingcute/down-line';
</script>

<section id="sheet">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Sheet</h2>
	<Card>
		<Sheet
			title="Bottom Sheet"
			description="Slides up from the bottom of the screen."
			side="bottom"
			triggerClass={buttonVariants({ variant: 'outline' })}
		>
			{#snippet trigger()}
				<MingcuteDownLine class="size-4" />
				Open Sheet (bottom)
			{/snippet}
			<p class="text-muted-foreground text-sm">Great for mobile-style action panels.</p>
		</Sheet>
	</Card>
</section>
