<!--
@component
Docs: TagPicker. A playground over every prop, and the game tag list, up to three tags: a chosen
tag is shown by its colour only.
-->
<script lang="ts">
	import { TagPicker } from '#lib/components/tag-picker/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { gameTags } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	let tags = $state(['obby', 'platformer']);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Tags'),
			limit: boolean(true),
			max: number(3, { min: 1, max: 18 }),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<TagPicker
				options={gameTags.slice(0, 8)}
				value={['obby', 'racing']}
				label={values.label}
				max={values.limit ? values.max : undefined}
				disabled={values.disabled}
			/>
		{/snippet}
	</Playground>
	<Card
		title="Game tags"
		description="Up to 3, from the fixed list; the others are disabled once 3 are chosen."
	>
		<TagPicker options={gameTags} bind:value={tags} max={3} label="Game tags" />
		<p class="mt-3 text-sm text-muted">Chosen: {tags.join(', ') || 'none'}</p>
	</Card>
</div>
