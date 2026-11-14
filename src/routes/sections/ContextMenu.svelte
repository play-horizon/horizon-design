<!--
@component
Docs: ContextMenu. Live examples of the ContextMenu component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ContextMenu } from '$lib/components/context-menu';
</script>

<section id="context-menu">
	<Card>
		<div>
			{#snippet contextTrigger()}
				<div
					class="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border p-4 text-sm text-muted transition-colors hover:border-primary/50"
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
