<!--
@component
Docs: Avatar. A playground over every prop, every size with initials and with an image side by
side (the same size), and the five fallback tones.
-->
<script lang="ts">
	import { Avatar, type AvatarTone } from '#lib/components/avatar/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
	const tones = [1, 2, 3, 4, 5] as const;
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			size: choice(sizes, 'xl'),
			image: boolean(),
			fallback: text('RM'),
			alt: text('Rayan M.'),
			tone: choice(['from the initials', '1', '2', '3', '4', '5'])
		}}
	>
		{#snippet example(values)}
			<Avatar
				size={values.size}
				src={values.image ? art.icon : undefined}
				fallback={values.fallback}
				alt={values.alt}
				tone={values.tone === 'from the initials' ? undefined : (Number(values.tone) as AvatarTone)}
			/>
		{/snippet}
	</Playground>
	<Card
		title="Sizes"
		description="Initials, on a tone picked from them so a person keeps one colour, and an image: the same size."
	>
		<div class="flex flex-wrap items-end gap-6">
			{#each sizes as size (size)}
				<div class="grid justify-items-center gap-2">
					<div class="flex items-end gap-2">
						<Avatar {size} fallback="RM" alt="Rayan M." />
						<Avatar {size} src={art.icon} fallback="SK" alt="Skyline studio" />
					</div>
					<p class="text-xs text-muted">{size}</p>
				</div>
			{/each}
		</div>
	</Card>
	<Card title="Tones">
		<div class="flex items-center gap-3">
			{#each tones as tone (tone)}
				<Avatar {tone} fallback="T{tone}" alt="Tone {tone}" />
			{/each}
		</div>
	</Card>
</div>
