<!--
@component
A ring that fills with progress, with an optional value in its centre.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		value = 0,
		max = 100,
		size = 64,
		strokeWidth = 6,
		showLabel = true,
		label,
		children,
		...rest
	}: {
		class?: string;
		value?: number;
		max?: number;
		size?: number;
		strokeWidth?: number;
		showLabel?: boolean;
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const radius = $derived((size - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const progress = $derived(Math.min(Math.max(value / max, 0), 1));
	const dashOffset = $derived(circumference * (1 - progress));
	const percentage = $derived(Math.round(progress * 100));
</script>

<div class={cn('inline-flex flex-col items-center gap-1', className)}>
	<div
		class="relative inline-flex items-center justify-center"
		style="width: {size}px; height: {size}px;"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={max}
		data-slot="circular-progress"
		{...rest}
	>
		<svg width={size} height={size} viewBox="0 0 {size} {size}" class="-rotate-90">
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke-width={strokeWidth}
				class="stroke-surface"
			/>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke-width={strokeWidth}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashOffset}
				class="stroke-primary transition-all duration-300 ease-out"
			/>
		</svg>
		<div class="absolute inset-0 flex items-center justify-center">
			{#if children}
				{@render children()}
			{:else if showLabel}
				<span
					class="text-xs font-semibold text-fg tabular-nums"
					data-slot="circular-progress-label"
				>
					{percentage}%
				</span>
			{/if}
		</div>
	</div>
	{#if label}
		<span class="text-xs text-muted">{label}</span>
	{/if}
</div>
