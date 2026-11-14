<!--
@component
Docs: Avatar. Sizes, the five fallback tones, and an image.
-->
<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
	import { Card } from '$lib/components/card';
	import { art } from '../examples';

	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
	const tones = [1, 2, 3, 4, 5] as const;
</script>

<div class="grid gap-4">
	<Card
		title="Sizes"
		description="Initials on a tone picked from them, so a person keeps one colour."
	>
		<div class="flex items-end gap-4">
			{#each sizes as size (size)}
				<Avatar {size} fallback="RM" alt="Rayan M." />
			{/each}
		</div>
	</Card>
	<Card title="Tones and images">
		<div class="flex items-center gap-3">
			{#each tones as tone (tone)}
				<Avatar {tone} fallback="T{tone}" />
			{/each}
			<Avatar src={art.icon} fallback="SK" alt="Skyline studio" size="lg" />
		</div>
	</Card>
</div>
