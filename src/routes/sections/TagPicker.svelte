<!--
@component
Docs: TagPicker. The game tag list, up to three tags.
-->
<script lang="ts">
	import { TagPicker } from '#lib/components/tag-picker/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { gameTags } from '../examples';

	let tags = $state(['obby', 'platformer']);
</script>

<Card
	title="Game tags"
	description="Up to 3, from the fixed list; the others are disabled once 3 are chosen."
>
	<TagPicker options={gameTags} bind:value={tags} max={3} label="Tags" />
	<p class="mt-3 text-sm text-muted">Chosen: {tags.join(', ') || 'none'}</p>
</Card>
