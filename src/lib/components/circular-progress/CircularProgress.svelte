<!--
@component
A ring that fills with progress, with round ends, an optional value in its centre and a label under it. It
is a `progressbar` named by `label`; `valueText`, the value formatted by the app (such as "72%"),
is shown in the centre and announced instead of the raw number.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';
	import Ring from '../ring/Ring.svelte';

	let {
		class: className = '',
		value = 0,
		max = 100,
		size = 64,
		strokeWidth = 6,
		label,
		hideLabel = false,
		valueText,
		children,
		...rest
	}: {
		/** Classes merged onto the wrapper. */
		class?: string;
		/** The progress, from 0 to `max`; values outside are clamped. */
		value?: number;
		/** The value of a full ring. */
		max?: number;
		/** The ring's diameter, in pixels. */
		size?: number;
		/** The ring's thickness, in pixels. */
		strokeWidth?: number;
		/** What is progressing, such as "Upload": the progress bar's accessible name. */
		label: string;
		/** Keeps `label` for assistive technology only, without showing it under the ring. */
		hideLabel?: boolean;
		/** The value as text, shown in the centre and announced, such as "72%". */
		valueText?: string;
		/** Replaces the centre's content. */
		children?: Snippet;
		/** Other attributes of the progress bar. */
		[key: string]: unknown;
	} = $props();

	const labelId = $props.id();
	const clamped = $derived(Math.min(Math.max(value, 0), max));
	const progress = $derived(max > 0 ? clamped / max : 0);
</script>

<div class={cn('inline-flex flex-col items-center gap-1', className)}>
	<div
		class="relative inline-flex items-center justify-center"
		style="width: {size}px; height: {size}px;"
		role="progressbar"
		aria-labelledby={hideLabel ? undefined : labelId}
		aria-label={hideLabel ? label : undefined}
		aria-valuenow={clamped}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuetext={valueText}
		data-slot="circular-progress"
		{...rest}
	>
		<Ring turn={progress} thickness={strokeWidth} />
		<div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
			{#if children}
				{@render children()}
			{:else if valueText}
				<span
					class="text-xs font-semibold text-fg tabular-nums"
					data-slot="circular-progress-value"
				>
					{valueText}
				</span>
			{/if}
		</div>
	</div>
	{#if !hideLabel}
		<span id={labelId} class="text-xs text-muted" data-slot="circular-progress-label">{label}</span>
	{/if}
</div>
