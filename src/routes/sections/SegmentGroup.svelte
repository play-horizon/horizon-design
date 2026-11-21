<!--
@component
Docs: SegmentGroup. A playground over every prop, both variants at every size, and the underline
variant switching the views of a page.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { SegmentGroup } from '#lib/components/segment-group/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice } from '../playground/controls';

	const variants = ['default', 'underline'] as const;
	const sizes = ['sm', 'md', 'lg'] as const;
	const periods = [
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' }
	];
	const views = [
		{
			value: 'overview',
			label: 'Overview',
			text: 'What the game is about, its rating and its creator.'
		},
		{
			value: 'servers',
			label: 'Servers',
			text: 'The servers running the game, with their players.'
		},
		{ value: 'updates', label: 'Updates', text: 'What changed in each version of the game.' }
	];

	let view = $state<string | null>('overview');
	const viewText = $derived(views.find((v) => v.value === view)?.text);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			variant: choice(variants),
			size: choice(sizes, 'md'),
			disabledItem: boolean(),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<SegmentGroup
				variant={values.variant}
				size={values.size}
				disabled={values.disabled}
				defaultValue="day"
				aria-label="Period"
				items={periods.map((p) => ({ ...p, disabled: values.disabledItem && p.value === 'month' }))}
			/>
		{/snippet}
	</Playground>
	{#each variants as variant (variant)}
		<Card title={variant === 'default' ? 'Default' : 'Underline'}>
			<div class="flex flex-wrap items-end gap-6">
				{#each sizes as size (size)}
					<SegmentGroup
						{variant}
						{size}
						defaultValue="day"
						aria-label="Period ({size})"
						items={periods}
					/>
				{/each}
			</div>
		</Card>
	{/each}
	<Card
		title="Views of a page"
		description="The underline variant switches the views of a page: the page renders the view of the value."
	>
		<SegmentGroup variant="underline" aria-label="Game page" items={views} bind:value={view} />
		<p class="mt-3 text-sm text-fg-2">{viewText}</p>
	</Card>
</div>
