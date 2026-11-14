<!--
@component
An asset in a list (a store listing, an entry of My assets or of a game's assets): its square
thumbnail, its name (the card's link or button), its kind, a `meta` line (votes, the rig profile)
and `actions` (Add to my assets). The link covers the whole card; the actions stay their own
buttons. Without a thumbnail, `placeholder` (an icon of the kind) is drawn on a neutral fill.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';
	import Badge from '../badge/Badge.svelte';

	let {
		name,
		kind,
		href,
		onclick,
		thumbnail,
		placeholder,
		meta,
		actions,
		selected = false,
		class: className = ''
	}: {
		/** The asset's name (its label in the list, or the listing's name). */
		name: string;
		/** The asset's kind, translated: "Mesh", "Texture"… */
		kind: string;
		/** Where the card leads. */
		href?: string;
		/** Called when the card is chosen, when it has no `href`. */
		onclick?: () => void;
		/** The square thumbnail's URL. */
		thumbnail?: string;
		/** Drawn instead of a thumbnail, such as the kind's icon. */
		placeholder?: Snippet;
		/** The line under the name. */
		meta?: Snippet;
		/** Buttons of the card, such as Add to my assets. */
		actions?: Snippet;
		/** Marks the card as the chosen one in a picker. */
		selected?: boolean;
		/** Classes merged onto the card. */
		class?: string;
	} = $props();

	const stretched =
		'outline-none after:absolute after:inset-0 after:z-1 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-primary';
</script>

<div
	class={cn(
		'group relative grid min-w-0 content-start gap-2 rounded-lg border border-border bg-surface p-2 transition-colors hover:bg-hover',
		selected && 'border-primary ring-3 ring-primary/20',
		className
	)}
	data-slot="asset-card"
>
	<div
		class="relative grid aspect-square place-items-center overflow-hidden rounded-md bg-sunken text-faint [&_svg]:size-8"
	>
		{#if thumbnail}
			<img src={thumbnail} alt="" class="absolute inset-0 size-full object-cover" />
		{:else if placeholder}
			{@render placeholder()}
		{/if}
	</div>
	<div class="grid min-w-0 gap-1 px-0.5">
		{#if href}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- the app passes an href it has already resolved -->
			<a {href} class={cn(stretched, 'truncate text-sm font-semibold text-fg')}>{name}</a>
		{:else}
			<button
				type="button"
				class={cn(stretched, 'truncate text-left text-sm font-semibold text-fg')}
				aria-pressed={onclick ? selected : undefined}
				{onclick}
			>
				{name}
			</button>
		{/if}
		<div class="flex min-w-0 items-center gap-1.5 text-xs text-muted">
			<Badge size="sm">{kind}</Badge>
			{#if meta}<span class="relative z-2 truncate">{@render meta()}</span>{/if}
		</div>
	</div>
	{#if actions}
		<div class="relative z-2 flex flex-wrap gap-1.5 px-0.5 pb-0.5">{@render actions()}</div>
	{/if}
</div>
