<!--
@component
A circular control that picks a value along an arc.
-->
<script lang="ts">
	import { AngleSlider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 100,
		thickness = 6,
		step = 1,
		showValue = true,
		prefix = '',
		suffix = '',
		value = $bindable(0),
		...rest
	}: {
		class?: string;
		size?: number;
		thickness?: number;
		step?: number;
		showValue?: boolean;
		prefix?: string;
		suffix?: string;
		value?: number;
		[key: string]: unknown;
	} = $props();

	const ringRadius = $derived(size / 2 - thickness / 2);
	const ringCircumference = $derived(2 * Math.PI * ringRadius);
	const thumbSize = $derived(Math.max(thickness + 8, 16));
</script>

<AngleSlider.Root
	class={cn(
		'relative flex flex-col items-center justify-center',
		'data-disabled:pointer-events-none data-disabled:opacity-64',
		className
	)}
	data-slot="circular-slider"
	{step}
	{value}
	onValueChange={(details) => (value = details.value)}
	style="width: {size}px; height: {size}px; --thickness: {thickness}px;"
	{...rest}
>
	<AngleSlider.Control
		class="group/circular-slider-control absolute inset-0"
		data-slot="circular-slider-control"
	>
		<AngleSlider.Context>
			{#snippet render(ctx)}
				{@const api = ctx()}
				{@const percent = api.value / 360}
				{@const dashLen = percent * ringCircumference}
				{@const gapLen = ringCircumference - dashLen}
				<svg
					aria-hidden="true"
					class="pointer-events-none -rotate-90"
					height={size}
					viewBox="0 0 {size} {size}"
					width={size}
				>
					<circle
						class="stroke-hover"
						cx={size / 2}
						cy={size / 2}
						fill="transparent"
						r={ringRadius}
						stroke-width={thickness}
					/>
					<circle
						class="stroke-primary [stroke-linecap:round]"
						cx={size / 2}
						cy={size / 2}
						fill="transparent"
						r={ringRadius}
						stroke-dasharray="{dashLen} {gapLen}"
						stroke-width={thickness}
					/>
				</svg>
			{/snippet}
		</AngleSlider.Context>

		<AngleSlider.Thumb
			class={cn(
				'absolute inset-0 z-10 flex items-center justify-center outline-none',
				'focus-visible:[&_span]:ring-2 focus-visible:[&_span]:ring-primary/30 focus-visible:[&_span]:outline-hidden',
				'active:[&_span]:scale-110 active:[&_span]:ring-[3px] active:[&_span]:ring-primary/30'
			)}
			data-slot="circular-slider-thumb"
			style="--size: {thumbSize}px;"
		>
			<span
				class="absolute size-(--size) shrink-0 rounded-full bg-paper shadow-sm ring-2 ring-border transition-all hover:cursor-grab hover:ring-[3px] active:cursor-grabbing"
				style="inset-block-start: calc(50% - {ringRadius}px - {thumbSize /
					2}px); inset-inline-start: calc(50% - {thumbSize / 2}px);"
			></span>
		</AngleSlider.Thumb>
	</AngleSlider.Control>

	{#if showValue}
		<AngleSlider.Context>
			{#snippet render(ctx)}
				{@const api = ctx()}
				<AngleSlider.ValueText
					class="text-sm font-medium tabular-nums"
					data-slot="circular-slider-value"
				>
					{prefix}{api.value}{suffix}
				</AngleSlider.ValueText>
			{/snippet}
		</AngleSlider.Context>
	{/if}

	<AngleSlider.HiddenInput />
</AngleSlider.Root>
