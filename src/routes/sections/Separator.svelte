<!--
@component
Docs: Separator. A playground over every prop, then a horizontal line between blocks and vertical
lines between items of a row, decorative or announced.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Separator } from '#lib/components/separator/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="An announced separator has the separator role; a decorative one is hidden."
		controls={{
			orientation: choice(['horizontal', 'vertical'] as const),
			decorative: boolean(true)
		}}
	>
		{#snippet example(values)}
			<div
				class={[
					'flex gap-3 text-sm text-muted',
					values.orientation === 'horizontal' ? 'w-full flex-col' : 'h-8 items-center'
				]}
			>
				<span>Play</span>
				<Separator orientation={values.orientation} decorative={values.decorative} />
				<span>Create</span>
			</div>
		{/snippet}
	</Playground>
	<Card title="Orientations">
		<div class="space-y-3">
			<p class="text-sm text-muted">Above the line</p>
			<Separator />
			<p class="text-sm text-muted">Below the line</p>
			<div class="flex h-5 items-center gap-4">
				<span class="text-sm text-muted">Games</span>
				<Separator orientation="vertical" />
				<span class="text-sm text-muted">Assets</span>
				<Separator orientation="vertical" decorative={false} />
				<span class="text-sm text-muted">Docs</span>
			</div>
		</div>
	</Card>
</div>
