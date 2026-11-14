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

	const progress = $derived(Math.min(Math.max(value / max, 0), 1));
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
		<!-- A conic gradient drawn as a ring by a radial mask, which reads only the alpha of its colours. -->
		<div
			aria-hidden="true"
			class="absolute inset-0 rounded-full"
			style:background="conic-gradient(var(--primary) {progress}turn, var(--hover) 0)"
			style:mask="radial-gradient(farthest-side, transparent calc(100% - {strokeWidth}px - 0.5px),
			currentColor calc(100% - {strokeWidth}px))"
		></div>
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
