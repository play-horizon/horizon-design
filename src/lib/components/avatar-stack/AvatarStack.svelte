<!--
@component
A row of overlapping avatars, such as who is editing a game now. Up to `max` people are shown,
each ringed with the surface colour; the others are summed up in a last chip whose text the app
gives (`overflowText(3)` → `+3`). The group's accessible name (`label`) says what the people are,
and each avatar's image is named after its person.
-->
<script lang="ts" module>
	import type { AvatarTone } from '../avatar/tone';

	/** One person of the stack. */
	export interface StackPerson {
		/** A stable, unique id. */
		id: string;
		/** The person's name, the avatar's accessible name. */
		name: string;
		/** The avatar image's URL. */
		src?: string;
		/** The initials shown without an image. */
		initials: string;
		tone?: AvatarTone;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import Avatar from '../avatar/Avatar.svelte';

	let {
		people,
		max = 3,
		size = 'sm',
		label,
		overflowText,
		class: className = ''
	}: {
		people: readonly StackPerson[];
		/** How many avatars are shown before the overflow chip. */
		max?: number;
		size?: 'xs' | 'sm' | 'md';
		/** The group's accessible name, such as "Editing now". */
		label: string;
		/** The overflow chip's text for the number of people not shown, such as `+3`. */
		overflowText: (hidden: number) => string;
		class?: string;
	} = $props();

	const shown = $derived(people.slice(0, max));
	const hidden = $derived(people.length - shown.length);

	const chipSizes = {
		xs: 'h-4.5 min-w-4.5 text-[0.5rem]',
		sm: 'h-6 min-w-6 text-[0.59375rem]',
		md: 'h-8 min-w-8 text-xs'
	};
</script>

<div
	role="group"
	aria-label={label}
	class={cn('flex items-center', className)}
	data-slot="avatar-stack"
>
	{#each shown as person (person.id)}
		<Avatar
			src={person.src}
			alt={person.name}
			fallback={person.initials}
			tone={person.tone}
			{size}
			title={person.name}
			class="-ml-1 ring-2 ring-surface first:ml-0"
		/>
	{/each}
	{#if hidden > 0}
		<span
			class={cn(
				'-ml-1 inline-grid place-items-center rounded-full bg-active px-1 font-bold text-fg-2 ring-2 ring-surface',
				chipSizes[size]
			)}
		>
			{overflowText(hidden)}
		</span>
	{/if}
</div>
