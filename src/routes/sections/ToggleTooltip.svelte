<!--
@component
Docs: ToggleTooltip. A playground over every prop, and a text-style toolbar: a press shrinks a
toggle for a moment, and a pressed toggle is tinted.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ToggleTooltip } from '#lib/components/toggle-tooltip/index.js';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteStrikethroughLine from '~icons/mingcute/strikethrough-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const tools = [
		{ label: 'Bold', Icon: MingcuteBoldLine },
		{ label: 'Italic', Icon: MingcuteItalicLine },
		{ label: 'Underline', Icon: MingcuteUnderlineLine },
		{ label: 'Strikethrough', Icon: MingcuteStrikethroughLine }
	];
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Bold'),
			side: choice(['top', 'bottom', 'left', 'right']),
			pressed: boolean()
		}}
	>
		{#snippet example(values)}
			{#key values.pressed}
				<ToggleTooltip label={values.label} side={values.side} pressed={values.pressed}>
					<MingcuteBoldLine class="size-4" aria-hidden="true" />
				</ToggleTooltip>
			{/key}
		{/snippet}
	</Playground>
	<Card title="Toolbar" description="Italic starts pressed.">
		<div class="flex gap-1">
			{#each tools as tool (tool.label)}
				<ToggleTooltip label={tool.label} pressed={tool.label === 'Italic'}>
					<tool.Icon class="size-4" aria-hidden="true" />
				</ToggleTooltip>
			{/each}
		</div>
	</Card>
</div>
