<!--
@component
Docs: Splitter. A playground over the splitter's props (orientation, two or three panels, the
first panel's size limits and collapsing, the arrow keys' step), then panels side by side and
stacked, and a sidebar that collapses when dragged below its minimum.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import {
		Splitter,
		SplitterPanel,
		SplitterResizeTrigger
	} from '#lib/components/splitter/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';
</script>

{#snippet pane(name: string)}
	<div class="flex h-full items-center justify-center p-4 text-sm text-muted">{name}</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Drag a handle, or focus it and use the arrow keys."
		controls={{
			orientation: choice(['horizontal', 'vertical'] as const),
			panels: choice(['two', 'three'] as const),
			minSize: number(20, { min: 0, max: 50 }),
			maxSize: number(70, { min: 50, max: 100 }),
			collapsible: boolean(),
			keyboardResizeBy: number(5, { min: 1, max: 25 })
		}}
	>
		{#snippet example(values)}
			{@const three = values.panels === 'three'}
			<div class="h-56 w-full overflow-hidden rounded-lg border border-border">
				<!-- defaultSize is read once: a new panel count mounts a new splitter. -->
				{#key values.panels}
					<Splitter
						orientation={values.orientation}
						keyboardResizeBy={values.keyboardResizeBy}
						defaultSize={three ? [30, 40, 30] : [40, 60]}
						panels={[
							{
								id: 'first',
								minSize: values.minSize,
								maxSize: values.maxSize,
								collapsible: values.collapsible,
								collapsedSize: 0
							},
							{ id: 'second' },
							...(three ? [{ id: 'third' }] : [])
						]}
					>
						<SplitterPanel id="first">{@render pane('First')}</SplitterPanel>
						<SplitterResizeTrigger id="first:second" label="Resize the first panel" />
						<SplitterPanel id="second">{@render pane('Second')}</SplitterPanel>
						{#if three}
							<SplitterResizeTrigger id="second:third" label="Resize the third panel" />
							<SplitterPanel id="third">{@render pane('Third')}</SplitterPanel>
						{/if}
					</Splitter>
				{/key}
			</div>
		{/snippet}
	</Playground>
	<Card title="Orientations">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="h-40 overflow-hidden rounded-lg border border-border">
				<Splitter panels={[{ id: 'scene' }, { id: 'inspector' }]} defaultSize={[60, 40]}>
					<SplitterPanel id="scene">{@render pane('Scene')}</SplitterPanel>
					<SplitterResizeTrigger id="scene:inspector" label="Resize the inspector" />
					<SplitterPanel id="inspector">{@render pane('Inspector')}</SplitterPanel>
				</Splitter>
			</div>
			<div class="h-40 overflow-hidden rounded-lg border border-border">
				<Splitter
					orientation="vertical"
					panels={[{ id: 'editor' }, { id: 'console' }]}
					defaultSize={[65, 35]}
				>
					<SplitterPanel id="editor">{@render pane('Editor')}</SplitterPanel>
					<SplitterResizeTrigger id="editor:console" label="Resize the console" />
					<SplitterPanel id="console">{@render pane('Console')}</SplitterPanel>
				</Splitter>
			</div>
		</div>
	</Card>
	<Card title="Collapsible" description="Drag the sidebar below its minimum and it collapses.">
		<div class="h-40 overflow-hidden rounded-lg border border-border">
			<Splitter
				panels={[{ id: 'files', minSize: 20, collapsible: true, collapsedSize: 0 }, { id: 'code' }]}
				defaultSize={[25, 75]}
			>
				<SplitterPanel id="files">{@render pane('Files')}</SplitterPanel>
				<SplitterResizeTrigger id="files:code" label="Resize the files" />
				<SplitterPanel id="code">{@render pane('Code')}</SplitterPanel>
			</Splitter>
		</div>
	</Card>
</div>
