<!--
@component
A person's avatar: their image, or their initials on a coloured disc while it loads or when there
is none. With `alt` (the person's name) it is one image of that name for assistive technology;
without, it is decorative, for when the name is written next to it. The disc's colour is one of
five avatar tones: `tone`, or one picked from the initials so the same person always gets the
same colour.
-->
<script lang="ts">
	import { Avatar } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { toneOf, type AvatarTone } from './tone';

	const sizes = {
		xs: 'size-4.5 text-[0.5rem]',
		sm: 'size-6 text-[0.59375rem]',
		md: 'size-8 text-xs',
		lg: 'size-10 text-sm',
		xl: 'size-16 text-xl'
	};

	const tones = {
		1: 'bg-avatar-1',
		2: 'bg-avatar-2',
		3: 'bg-avatar-3',
		4: 'bg-avatar-4',
		5: 'bg-avatar-5'
	};

	let {
		class: className = '',
		src,
		alt = '',
		fallback = '',
		tone,
		size = 'md',
		...rest
	}: {
		/** Classes merged onto the avatar. */
		class?: string;
		/** The image's URL. */
		src?: string;
		/** The person's name, when nothing next to the avatar says it; empty for a decorative avatar. */
		alt?: string;
		/** The initials shown without an image. */
		fallback?: string;
		/** The disc's colour; picked from the initials when unset. */
		tone?: AvatarTone;
		/** The diameter, from `xs` (18 px) to `xl` (64 px). */
		size?: keyof typeof sizes;
		/** Other props of Ark's `Avatar.Root`, such as `title`. */
		[key: string]: unknown;
	} = $props();
</script>

<Avatar.Root
	class={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}
	role={alt ? 'img' : undefined}
	aria-label={alt || undefined}
	aria-hidden={alt ? undefined : 'true'}
	data-slot="avatar"
	{...rest}
>
	{#if src}
		<Avatar.Image {src} alt="" class="size-full object-cover" data-slot="avatar-image" />
	{/if}
	<Avatar.Fallback
		class={cn(
			'flex size-full items-center justify-center font-bold text-on-art [font-stretch:normal]',
			tones[tone ?? toneOf(fallback)]
		)}
		data-slot="avatar-fallback"
	>
		{fallback}
	</Avatar.Fallback>
</Avatar.Root>
