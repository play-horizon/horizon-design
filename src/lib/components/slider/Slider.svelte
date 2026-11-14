<!--
@component
A slider to pick a value, or a range with one thumb per value (Ark Slider). `value` binds the
values; without it, Ark's `defaultValue` sets the first ones, and their count sets the thumbs'.
`label` names the thumbs; without it, give them names with Ark's `aria-label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Slider, type SliderValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		showValue = false,
		children,
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes added to the root, around the label and the track. */
		class?: string;
		/** The slider's label, which names its thumbs. */
		label?: string;
		/** Shows the values beside the label. */
		showValue?: boolean;
		/** Content between the label and the track. */
		children?: Snippet;
		/** The values, one per thumb: `[40]` for one value, `[20, 80]` for a range. */
		value?: number[];
		/** Called on every change of the values, after `value` is updated. */
		onValueChange?: (details: SliderValueChangeDetails) => void;
		/** Other props of Ark's `Slider.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Slider.Root
	class={cn('relative flex w-full touch-none flex-col gap-2 select-none', className)}
	data-slot="slider"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
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
		<Slider.Context>
			{#snippet render(api)}
				{#each api().value.map((_, index) => index) as index (index)}
					<Slider.Thumb
						{index}
						class="block size-4 rounded-full border border-primary bg-paper shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary data-disabled:pointer-events-none data-disabled:opacity-50"
					>
						<Slider.HiddenInput />
					</Slider.Thumb>
				{/each}
			{/snippet}
		</Slider.Context>
	</Slider.Control>
</Slider.Root>
