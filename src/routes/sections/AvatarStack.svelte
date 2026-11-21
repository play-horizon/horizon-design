<!--
@component
Docs: AvatarStack. A playground over every prop (how many people, how many are shown, the size,
the group's name), then every size side by side and stacks below, at and over their `max`, the
last with an overflow chip whose text the app formats.
-->
<script lang="ts">
	import { AvatarStack, type StackPerson } from '#lib/components/avatar-stack/index.js';
	import { Card } from '#lib/components/card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, number, text } from '../playground/controls';
	import { people } from '../examples';

	const crowd: StackPerson[] = [
		...people,
		{ id: 'mei', name: 'Mei Chen', initials: 'MC' },
		{ id: 'omar', name: 'Omar Haddad', initials: 'OH' },
		{ id: 'ines', name: 'Inès Duval', initials: 'ID' }
	];
	const sizes = ['xs', 'sm', 'md'] as const;
	const plus = (hidden: number) => `+${hidden}`;
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			people: number(5, { min: 1, max: crowd.length }),
			max: number(3, { min: 1, max: crowd.length }),
			size: choice(sizes, 'sm'),
			label: text('Editing now')
		}}
	>
		{#snippet example(values)}
			<AvatarStack
				people={crowd.slice(0, values.people)}
				max={values.max}
				size={values.size}
				label={values.label}
				overflowText={plus}
			/>
		{/snippet}
	</Playground>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-6">
			{#each sizes as size (size)}
				<AvatarStack {size} people={crowd} label="Editing now ({size})" overflowText={plus} />
			{/each}
		</div>
	</Card>
	<Card title="Overflow" description="Up to max people are shown; the others are counted.">
		<div class="flex flex-wrap items-center gap-6">
			<AvatarStack people={crowd.slice(0, 2)} label="Two people" overflowText={plus} />
			<AvatarStack people={crowd.slice(0, 3)} label="Three people" overflowText={plus} />
			<AvatarStack people={crowd} label="Eight people" overflowText={plus} />
			<AvatarStack
				people={crowd}
				max={5}
				size="md"
				label="Members"
				overflowText={(hidden) => `${hidden} more`}
			/>
		</div>
	</Card>
</div>
