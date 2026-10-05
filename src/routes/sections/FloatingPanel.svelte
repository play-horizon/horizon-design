<script lang="ts">
	import { Card } from '$lib/components/card';
	import { FloatingPanel } from '$lib/components/floating-panel';
</script>

<section id="floating-panel">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Floating Panel</h2>
	<Card>
		<div class="flex flex-col gap-3">
			<p class="text-muted-foreground text-sm">
				A draggable floating panel anchored to a trigger. Drag the header to reposition it.
			</p>
			{#snippet floatingPanelTrigger()}Open Panel{/snippet}
			{#snippet floatingPanelBody()}
				<p class="text-muted-foreground text-sm">
					Drag the header to move this panel around the screen.
				</p>
			{/snippet}
			<FloatingPanel
				title="Settings"
				trigger={floatingPanelTrigger}
				triggerClass="border-border hover:bg-accent inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors"
			>
				{@render floatingPanelBody()}
			</FloatingPanel>
		</div>
	</Card>
</section>
