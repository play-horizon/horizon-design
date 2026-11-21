<!--
@component
Docs: ButtonGroup. A playground over its orientation and the buttons it joins (their variant, size
and count, icon-only or labelled), then a row, a column, a group of icon buttons and a split
button.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { ButtonGroup } from '#lib/components/button-group/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import MingcuteAlignCenterLine from '~icons/mingcute/align-center-line';
	import MingcuteAlignLeftLine from '~icons/mingcute/align-left-line';
	import MingcuteAlignRightLine from '~icons/mingcute/align-right-line';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';

	const actions = ['Cut', 'Copy', 'Paste', 'Duplicate', 'Delete'];
	const alignments = [
		{ label: 'Align left', icon: MingcuteAlignLeftLine },
		{ label: 'Align centre', icon: MingcuteAlignCenterLine },
		{ label: 'Align right', icon: MingcuteAlignRightLine }
	];
</script>

<div class="grid gap-4">
	<Playground
		description="count sets how many labelled buttons are joined."
		controls={{
			orientation: choice(['horizontal', 'vertical']),
			variant: choice(['default', 'primary', 'tint', 'ghost']),
			size: choice(['xs', 'sm', 'md', 'lg'], 'sm'),
			count: number(3, { min: 2, max: actions.length }),
			iconOnly: boolean()
		}}
	>
		{#snippet example(values)}
			<ButtonGroup orientation={values.orientation} aria-label="Edit">
				{#if values.iconOnly}
					{#each alignments as alignment (alignment.label)}
						<IconButton label={alignment.label} variant={values.variant} size={values.size}>
							<alignment.icon aria-hidden="true" />
						</IconButton>
					{/each}
				{:else}
					{#each actions.slice(0, values.count) as action (action)}
						<Button variant={values.variant} size={values.size}>{action}</Button>
					{/each}
				{/if}
			</ButtonGroup>
		{/snippet}
	</Playground>
	<Card title="Variants" description="A row, a column, icon buttons and a split button.">
		<div class="flex flex-wrap items-start gap-6">
			<ButtonGroup aria-label="Clipboard">
				{#each actions.slice(0, 3) as action (action)}
					<Button size="sm">{action}</Button>
				{/each}
			</ButtonGroup>
			<ButtonGroup orientation="vertical" aria-label="Clipboard, stacked">
				{#each actions.slice(0, 3) as action (action)}
					<Button size="sm" class="w-full">{action}</Button>
				{/each}
			</ButtonGroup>
			<ButtonGroup aria-label="Text alignment">
				{#each alignments as alignment (alignment.label)}
					<IconButton label={alignment.label} variant="default" size="sm">
						<alignment.icon aria-hidden="true" />
					</IconButton>
				{/each}
			</ButtonGroup>
			<ButtonGroup aria-label="Publish">
				<Button size="sm" variant="primary">Publish</Button>
				<IconButton label="More publish options" size="sm" variant="primary">
					<MingcuteDownLine aria-hidden="true" />
				</IconButton>
			</ButtonGroup>
		</div>
	</Card>
</div>
