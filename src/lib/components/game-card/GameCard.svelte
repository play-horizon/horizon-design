<!--
@component
A game in a list: its 16:9 thumbnail and its name, the card's link (`href`) or button
(`onclick`). The link covers the whole card, while controls drawn on it (`action`, `corner`) stay
their own buttons.

- `default`: the art, then the name and a `meta` line (tags, status) under it; `overlay` draws
  at the art's top left (a `PlayerCount`), `corner` at its top right (an `AvatarStack`).
- `feature` (Continue playing): a larger card with the square `icon`, the name and the `meta`
  line drawn over the bottom of the art, and an `action` (Play) at its bottom right.

The art carries the colour; without a thumbnail, a neutral fill stands in.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		name,
		href,
		onclick,
		thumbnail,
		icon,
		variant = 'default',
		overlay,
		corner,
		meta,
		action,
		class: className = ''
	}: {
		/** The game's name: the card's link text. */
		name: string;
		/** Where the card leads. */
		href?: string;
		/** Called when the card is chosen, when it has no `href`. */
		onclick?: () => void;
		/** The 16:9 thumbnail's URL. */
		thumbnail?: string;
		/** The square icon's URL, shown by the `feature` variant. */
		icon?: string;
		variant?: 'default' | 'feature';
		/** Drawn at the art's top left, such as a `PlayerCount`. */
		overlay?: Snippet;
		/** Drawn at the art's top right, such as an `AvatarStack`. */
		corner?: Snippet;
		/** The line under the name: tags, status, last played. */
		meta?: Snippet;
		/** A control on the card, such as Play (the `feature` variant). */
		action?: Snippet;
		class?: string;
	} = $props();

	// The link's ::after covers the card, so a click anywhere follows it; focus rings the card.
	const stretched =
		'outline-none after:absolute after:inset-0 after:z-1 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background';
</script>

{#snippet title(extra: string)}
	{#if href}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- the app passes an href it has already resolved -->
		<a {href} class={cn(stretched, extra)}>{name}</a>
	{:else}
		<button type="button" class={cn(stretched, 'text-left', extra)} {onclick}>{name}</button>
	{/if}
{/snippet}

{#if variant === 'feature'}
	<div class={cn('group relative min-w-0', className)} data-slot="game-card" data-variant="feature">
		<div
			class="relative grid aspect-video overflow-hidden rounded-lg bg-raised shadow-sm transition-[transform,box-shadow] duration-200 ease-standard group-hover:-translate-y-0.5 group-hover:shadow-md"
		>
			<!-- The art, its scrim and the name bar share one grid cell, none of them positioned, so
			     the link's ::after is placed against this container and covers the whole card. -->
			{#if thumbnail}
				<img src={thumbnail} alt="" class="col-start-1 row-start-1 size-full object-cover" />
			{/if}
			<div
				class="col-start-1 row-start-1 h-2/3 self-end bg-linear-to-t from-art-scrim to-transparent"
			></div>
			<div class="col-start-1 row-start-1 flex items-end gap-2.5 self-end p-3">
				{#if icon}
					<img
						src={icon}
						alt=""
						class="size-9 shrink-0 rounded-[22%] object-cover ring-1 ring-on-art/70"
					/>
				{/if}
				<div class="min-w-0 flex-1 text-on-art">
					{@render title('block truncate text-md font-bold')}
					{#if meta}
						<div class="truncate text-xs opacity-85">{@render meta()}</div>
					{/if}
				</div>
				{#if action}
					<div class="relative z-2 shrink-0">{@render action()}</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div
		class={cn('group relative grid min-w-0 content-start gap-2', className)}
		data-slot="game-card"
		data-variant="default"
	>
		<div
			class="relative aspect-video overflow-hidden rounded-lg bg-raised shadow-sm transition-[transform,box-shadow] duration-200 ease-standard group-hover:-translate-y-0.5 group-hover:shadow-md"
		>
			{#if thumbnail}
				<img src={thumbnail} alt="" class="absolute inset-0 size-full object-cover" />
			{/if}
			{#if overlay}
				<div class="absolute top-2 left-2 z-2">{@render overlay()}</div>
			{/if}
			{#if corner}
				<div class="absolute top-2 right-2 z-2">{@render corner()}</div>
			{/if}
		</div>
		<div class="min-w-0">
			{@render title('text-fg block truncate text-base font-semibold')}
			{#if meta}
				<div class="relative z-2 mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted">
					{@render meta()}
				</div>
			{/if}
		</div>
		{#if action}
			<div class="relative z-2">{@render action()}</div>
		{/if}
	</div>
{/if}
