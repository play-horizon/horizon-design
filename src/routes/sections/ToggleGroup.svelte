<!--
@component
Docs: ToggleGroup. A playground over every prop; a single-choice group, whose highlight slides to
the pressed item; a multiple-choice group, whose pressed items are raised in place; and text items.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ToggleGroup } from '#lib/components/toggle-group/index.js';
	import MingcuteAlignCenterLine from '~icons/mingcute/align-center-line';
	import MingcuteAlignLeftLine from '~icons/mingcute/align-left-line';
	import MingcuteAlignRightLine from '~icons/mingcute/align-right-line';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';
</script>

{#snippet left()}<MingcuteAlignLeftLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet center()}<MingcuteAlignCenterLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet right()}<MingcuteAlignRightLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet bold()}<MingcuteBoldLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet italic()}<MingcuteItalicLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet underline()}<MingcuteUnderlineLine class="size-4" aria-hidden="true" />{/snippet}
{#snippet list()}List{/snippet}
{#snippet grid()}Grid{/snippet}
{#snippet map()}Map{/snippet}

<div class="grid gap-4">
	<Playground
		description="Switching multiple starts the group over."
		controls={{ multiple: boolean(), disabled: boolean(), loopFocus: boolean(true) }}
	>
		{#snippet example(values)}
			{#key values.multiple}
				<ToggleGroup
					aria-label="Alignment"
					multiple={values.multiple}
					disabled={values.disabled}
					loopFocus={values.loopFocus}
					value={['left']}
					items={[
						{ value: 'left', label: 'Align left', content: left },
						{ value: 'center', label: 'Align center', content: center },
						{ value: 'right', label: 'Align right', content: right }
					]}
				/>
			{/key}
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="One choice" description="The highlight slides.">
			<ToggleGroup
				aria-label="Alignment"
				value={['center']}
				items={[
					{ value: 'left', label: 'Align left', content: left },
					{ value: 'center', label: 'Align center', content: center },
					{ value: 'right', label: 'Align right', content: right }
				]}
			/>
		</Card>
		<Card title="Several choices" description="Each pressed item is raised.">
			<ToggleGroup
				aria-label="Text style"
				multiple
				value={['bold', 'italic']}
				items={[
					{ value: 'bold', label: 'Bold', content: bold },
					{ value: 'italic', label: 'Italic', content: italic },
					{ value: 'underline', label: 'Underline', content: underline }
				]}
			/>
		</Card>
		<Card title="Text items" description="No label, no tooltip.">
			<ToggleGroup
				aria-label="View"
				value={['list']}
				items={[
					{ value: 'list', content: list },
					{ value: 'grid', content: grid },
					{ value: 'map', content: map }
				]}
			/>
		</Card>
	</div>
</div>
