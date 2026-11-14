<!--
@component
Docs: FloatingPanel. Live examples of the FloatingPanel component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { FloatingPanel } from '$lib/components/floating-panel';
</script>

<section id="floating-panel">
	<Card>
		<div class="flex flex-col gap-3">
			<p class="text-sm text-muted">
				A draggable floating panel anchored to a trigger. Drag the header to reposition it.
			</p>
			{#snippet floatingPanelTrigger()}Open Panel{/snippet}
			{#snippet floatingPanelBody()}
				<p class="text-sm text-muted">Drag the header to move this panel around the screen.</p>
			{/snippet}
			<FloatingPanel
				closeLabel="Close"
				title="Settings"
				trigger={floatingPanelTrigger}
				triggerClass="border-border hover:bg-hover inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors"
			>
				{@render floatingPanelBody()}
			</FloatingPanel>
		</div>
	</Card>
</section>
