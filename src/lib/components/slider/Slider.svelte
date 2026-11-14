<!--
@component
A slider to pick a value or a range (Ark Slider).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Slider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		showValue = false,
		children,
		value = $bindable([0]),
		...rest
	}: {
		class?: string;
		label?: string;
		showValue?: boolean;
		children?: Snippet;
		value?: number[];
		[key: string]: unknown;
	} = $props();
</script>

<Slider.Root
	class={cn('relative flex w-full touch-none flex-col gap-2 select-none', className)}
	data-slot="slider"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label || showValue}
		<div class="flex items-center justify-between">
			{#if label}
				<Slider.Label class="text-sm leading-none font-medium" data-slot="slider-label"
					>{label}</Slider.Label
				>
			{/if}
			{#if showValue}
				<Slider.ValueText class="text-sm text-muted tabular-nums" data-slot="slider-value" />
			{/if}
		</div>
	{/if}
	{@render children?.()}
	<Slider.Control class="relative flex w-full items-center">
		<Slider.Track class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
			<Slider.Range class="absolute h-full bg-primary" />
		</Slider.Track>
		<Slider.Thumb
			index={0}
			class="block size-4 rounded-full border border-primary bg-paper shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
		/>
	</Slider.Control>
</Slider.Root>
