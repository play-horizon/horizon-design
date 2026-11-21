<!--
@component
The top of a game page: the game's 16:9 thumbnail as a banner that fades into the page, with
the square icon, the name, a `byline` (the creator) and the game's `tags` over its bottom, and a
`top` slot at its top left (Back, a `Button` of the `art` variant, readable over any art). The page's actions (Play, votes) follow under it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		name,
		thumbnail,
		icon,
		byline,
		tags,
		top,
		class: className = ''
	}: {
		/** The game's name, the page's heading. */
		name: string;
		/** The 16:9 thumbnail's URL. */
		thumbnail?: string;
		/** The square icon's URL. */
		icon?: string;
		/** The line under the name: the creator. */
		byline?: Snippet;
		/** The game's tags, next to the byline. */
		tags?: Snippet;
		/** Drawn at the banner's top left, such as a Back button. */
		top?: Snippet;
		/** Classes merged onto the header. */
		class?: string;
	} = $props();
</script>

<header class={cn('relative isolate', className)} data-slot="game-hero">
	<div class="relative h-72 overflow-hidden bg-raised">
		{#if thumbnail}
			<img src={thumbnail} alt="" class="absolute inset-0 size-full object-cover" />
		{/if}
		<div
			class="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/60 to-transparent"
		></div>
		{#if top}
			<div class="absolute top-4 left-6">{@render top()}</div>
		{/if}
	</div>
	<div class="-mt-24 flex items-end gap-4 px-6">
		{#if icon}
			<img
				src={icon}
				alt=""
				class="relative size-19 shrink-0 rounded-[22%] object-cover shadow-md ring-3 ring-background"
			/>
		{/if}
		<div class="relative min-w-0 pb-1">
			<h1 class="truncate text-4xl font-bold text-fg">{name}</h1>
			{#if byline || tags}
				<div class="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
					{#if byline}
						<div class="flex items-center gap-1.5 text-fg-2">{@render byline()}</div>
					{/if}
					{#if tags}
						<div class="flex flex-wrap gap-1.5">{@render tags()}</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</header>
