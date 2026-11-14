<!--
@component
How many people are playing a game now: a live dot and the count. `inline` (the game page) shows
the count in bold followed by its label; `overlay` (on game art) is a dark pill with the count
only, its label kept for assistive technology. The app passes the count already formatted by the
i18n layer (`9,870`, `4.2k`) and the label translated (`playing now`). `live` false shows an idle
dot, for a game nobody is playing.
-->
<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		count,
		label,
		variant = 'inline',
		live = true,
		class: className = '',
		...rest
	}: {
		/** The count, formatted for display. */
		count: string;
		/** What the count counts, such as "playing now". */
		label: string;
		variant?: 'inline' | 'overlay';
		/** False when nobody is playing: the dot turns idle. */
		live?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<span
	class={cn(
		'inline-flex shrink-0 items-center whitespace-nowrap tabular-nums',
		variant === 'inline'
			? 'gap-1.75 text-base text-fg'
			: 'h-5 gap-1.25 rounded-full bg-art-scrim px-1.75 text-xs font-semibold text-on-art',
		className
	)}
	data-slot="player-count"
	data-variant={variant}
	{...rest}
>
	<span
		class={cn(
			'shrink-0 rounded-full',
			variant === 'inline' ? 'size-1.75' : 'size-1.5',
			live ? 'bg-success' : 'bg-faint',
			live && variant === 'inline' && 'ring-3 ring-success/20'
		)}
		aria-hidden="true"
	></span>
	{#if variant === 'inline'}
		<span><b class="font-bold">{count}</b> {label}</span>
	{:else}
		<span>{count}</span>
		<span class="sr-only">{label}</span>
	{/if}
</span>
