<!--
@component
A circular control that picks an angle, from 0 to 360, along a ring that fills up to its thumb
(Ark AngleSlider), with the value written in its centre between `prefix` and `suffix`. `label`
is its accessible name; the arrow keys move it by `step`.
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
		label,
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The ring's diameter, in pixels. */
		size?: number;
		/** The ring's thickness, in pixels. */
		thickness?: number;
		/** How far an arrow key moves the thumb. */
		step?: number;
		/** Shows the value in the centre. */
		showValue?: boolean;
		/** Text written before the value, such as a currency sign. */
		prefix?: string;
		/** Text written after the value, such as "°". */
		suffix?: string;
		/** The control's accessible name, such as "Hue", read by assistive technology only. */
		label: string;
		/** The value, from 0 to 360 (bindable); when unset, `defaultValue` gives the first one. */
		value?: number;
		/** Called with the new value while the thumb moves. */
		onValueChange?: (details: { value: number }) => void;
		/** Other props of Ark's `AngleSlider.Root`, such as `defaultValue` and `disabled`. */
		[key: string]: unknown;
	} = $props();

	const ringRadius = $derived(size / 2 - thickness / 2);
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
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	style="width: {size}px; height: {size}px;"
	{...rest}
>
	<AngleSlider.Label class="sr-only">{label}</AngleSlider.Label>
	<AngleSlider.Control
		class="group/circular-slider-control absolute inset-0"
		data-slot="circular-slider-control"
	>
		<AngleSlider.Context>
			{#snippet render(ctx)}
				{@const api = ctx()}
				{@const turn = api.value / 360}
				<!-- A conic gradient drawn as a ring by a radial mask, which reads only the alpha of its colours. -->
				<div
					aria-hidden="true"
					class="pointer-events-none absolute inset-0 rounded-full"
					style:background="conic-gradient(var(--primary) {turn}turn, var(--hover) 0)"
					style:mask="radial-gradient(farthest-side, transparent calc(100% - {thickness}px - 0.5px),
					currentColor calc(100% - {thickness}px))"
				></div>
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
