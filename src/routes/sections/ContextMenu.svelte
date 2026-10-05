<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ContextMenu } from '$lib/components/context-menu';
</script>

<section id="context-menu">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Context Menu</h2>
	<Card>
		<div>
			{#snippet contextTrigger()}
				<div
					class="border-border text-muted-foreground hover:border-primary-border-active flex h-24 items-center justify-center rounded-lg border-2 border-dashed p-4 text-sm transition-colors"
				>
					Right-click here
				</div>
			{/snippet}
			<ContextMenu
				items={[
					{ type: 'label', label: 'Actions' },
					{ type: 'separator' },
					{ value: 'edit', label: 'Edit' },
					{ value: 'copy', label: 'Copy' },
					{ type: 'separator' },
					{ value: 'delete', label: 'Delete' }
				]}
			>
				{@render contextTrigger()}
			</ContextMenu>
		</div>
	</Card>
</section>
