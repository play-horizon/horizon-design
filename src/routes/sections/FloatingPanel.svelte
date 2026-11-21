<!--
@component
Docs: FloatingPanel. A playground over its texts, surface, size and how it moves and resizes,
then a resizable panel, a fixed-size one opened from outside (`bind:open`), and a frosted one.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { FloatingPanel } from '#lib/components/floating-panel/index.js';
	import MingcuteLayoutLine from '~icons/mingcute/layout-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	let layersOpen = $state(false);
</script>

<div class="grid gap-4">
	<Playground
		description="Open the panel, then drag its header and pull its edges."
		controls={{
			title: text('Inspector'),
			closeLabel: text('Close'),
			frosted: boolean(),
			draggable: boolean(true),
			resizable: boolean(true),
			lockAspectRatio: boolean(),
			allowOverflow: boolean(true),
			closeOnEscape: boolean(true),
			width: number(320, { min: 200, max: 640, step: 10 }),
			height: number(240, { min: 120, max: 480, step: 10 })
		}}
	>
		{#snippet example(values)}
			<!-- defaultSize is read once, when the panel mounts. -->
			{#key `${values.width}x${values.height}`}
				<FloatingPanel
					title={values.title}
					closeLabel={values.closeLabel}
					frosted={values.frosted}
					draggable={values.draggable}
					resizable={values.resizable}
					lockAspectRatio={values.lockAspectRatio}
					allowOverflow={values.allowOverflow}
					closeOnEscape={values.closeOnEscape}
					defaultSize={{ width: values.width, height: values.height }}
					minSize={{ width: 200, height: 120 }}
					triggerClass={buttonVariants({ variant: 'default' })}
				>
					{#snippet trigger()}
						<MingcuteLayoutLine class="size-4" aria-hidden="true" />
						Open the panel
					{/snippet}
					<p class="text-sm text-muted">The selected object's properties.</p>
				</FloatingPanel>
			{/key}
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="Resizable" description="Dragged by its header, resized by its edges.">
			<FloatingPanel
				closeLabel="Close"
				title="Settings"
				defaultSize={{ width: 320, height: 220 }}
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				{#snippet trigger()}Open the settings{/snippet}
				<p class="text-sm text-muted">Drag the header to move this panel around the screen.</p>
			</FloatingPanel>
		</Card>
		<Card title="Opened from outside" description="Fixed size, opened with bind:open.">
			<Button onclick={() => (layersOpen = true)}>Show the layers</Button>
			<FloatingPanel
				bind:open={layersOpen}
				closeLabel="Close"
				title="Layers"
				resizable={false}
				defaultSize={{ width: 260, height: 180 }}
			>
				<p class="text-sm text-muted">Terrain, props and lights.</p>
			</FloatingPanel>
		</Card>
		<Card title="Frosted" description="A translucent, blurred surface, over a game.">
			<FloatingPanel
				frosted
				closeLabel="Close"
				title="Chat"
				defaultSize={{ width: 300, height: 220 }}
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				{#snippet trigger()}Open the chat{/snippet}
				<p class="text-sm text-muted">Nova: see you at the finish line.</p>
			</FloatingPanel>
		</Card>
	</div>
</div>
