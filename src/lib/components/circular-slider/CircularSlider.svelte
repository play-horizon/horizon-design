<!--
@component
A circular control that picks an angle, from 0 to 359, along a ring that fills clockwise from the
top, with a round start, up to its thumb (Ark AngleSlider), with the value written in its centre as `valueText` formats
it. `label` is its accessible name and `valueText` its spoken value; the arrow keys move it by
`step`.
-->
<script lang="ts">
	import { AngleSlider } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import Ring from '../ring/Ring.svelte';

	let {
		class: className = '',
		size = 100,
		thickness = 6,
		step = 1,
		showValue = true,
		label,
		valueText,
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
		/** The control's accessible name, such as "Hue", read by assistive technology only. */
		label: string;
		/**
		 * Formats the value for display and for assistive technology, such as 120 as "120°"; the
		 * app gives it so the unit goes through its translations.
		 */
		valueText: (value: number) => string;
		/** The value, from 0 to 359 (bindable); when unset, `defaultValue` gives the first one. */
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
	<AngleSlider.Context>
		{#snippet render(ctx)}
			{@const api = ctx()}
			{@const turn = api.value / 360}
			{@const text = valueText(api.value)}
			<AngleSlider.Control
				class="group/circular-slider-control absolute inset-0"
				data-slot="circular-slider-control"
			>
				<Ring {turn} {thickness} />

				<!-- Zag announces a maximum of 360, but clamps the value to 359. -->
				<AngleSlider.Thumb
					class={cn(
						'absolute inset-0 z-10 flex items-center justify-center outline-none',
						'focus-visible:[&_span]:ring-2 focus-visible:[&_span]:ring-primary/30 focus-visible:[&_span]:outline-hidden',
						'active:[&_span]:scale-110 active:[&_span]:ring-[3px] active:[&_span]:ring-primary/30'
					)}
					data-slot="circular-slider-thumb"
					style="--size: {thumbSize}px;"
					aria-valuemax={359}
					aria-valuetext={text}
				>
					<span
						class="absolute size-(--size) shrink-0 rounded-full bg-paper shadow-sm ring-2 ring-border transition-all hover:cursor-grab hover:ring-[3px] active:cursor-grabbing"
						style="inset-block-start: calc(50% - {ringRadius}px - {thumbSize /
							2}px); inset-inline-start: calc(50% - {thumbSize / 2}px);"
					></span>
				</AngleSlider.Thumb>
			</AngleSlider.Control>

			{#if showValue}
				<AngleSlider.ValueText
					class="text-sm font-medium tabular-nums"
					data-slot="circular-slider-value"
				>
					{text}
				</AngleSlider.ValueText>
			{/if}
		{/snippet}
	</AngleSlider.Context>

	<AngleSlider.HiddenInput />
</AngleSlider.Root>
