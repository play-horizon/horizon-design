<!--
@component
A circular control that picks an angle in degrees (Ark AngleSlider), from 0 to 360, with the
angle written under it. `label` is its accessible name; the arrow keys turn it by `step`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AngleSlider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 120,
		label,
		step = 1,
		value = $bindable(),
		onValueChange,
		children,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The dial's diameter, in pixels. */
		size?: number;
		/** The control's accessible name, such as "Rotation", read by assistive technology only. */
		label: string;
		/** How many degrees an arrow key turns the dial. */
		step?: number;
		/** The angle in degrees (bindable); when unset, `defaultValue` gives the first one. */
		value?: number;
		/** Called with the new angle while the dial turns. */
		onValueChange?: (details: { value: number }) => void;
		/** Content under the angle, such as presets. */
		children?: Snippet;
		/** Other props of Ark's `AngleSlider.Root`, such as `defaultValue` and `disabled`. */
		[key: string]: unknown;
	} = $props();
</script>

<AngleSlider.Root
	class={cn('flex flex-col items-center gap-3', className)}
	data-slot="angle-slider"
	{step}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	<AngleSlider.Label class="sr-only">{label}</AngleSlider.Label>
	<AngleSlider.Control
		class="relative rounded-full border-2 border-border bg-hover"
		style="width: {size}px; height: {size}px;"
	>
		<AngleSlider.Thumb class="absolute inset-0 cursor-grab rounded-full active:cursor-grabbing">
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full"
			>
				<div
					class="absolute h-0.5 origin-left rounded-full bg-primary"
					style="width: calc({size / 2}px - 12px); left: 50%; top: calc(50% - 1px);"
				></div>
				<div class="relative z-10 size-3 rounded-full bg-primary"></div>
			</div>
		</AngleSlider.Thumb>
	</AngleSlider.Control>
	<AngleSlider.Context>
		{#snippet render(slider)}
			<AngleSlider.ValueText class="font-mono text-sm font-medium text-fg tabular-nums">
				{Math.round(slider().value)}°
			</AngleSlider.ValueText>
		{/snippet}
	</AngleSlider.Context>
	<AngleSlider.HiddenInput />
	{@render children?.()}
</AngleSlider.Root>
