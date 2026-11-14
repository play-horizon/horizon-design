<!--
@component
Picks a colour: a swatch trigger opening an area, hue and alpha sliders and a field (Ark
ColorPicker); swatches are passed in.
-->
<script lang="ts">
	import { ColorPicker, type ColorPickerColor as Color } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { untrack } from 'svelte';

	let {
		class: className = '',
		label = '',
		value = $bindable(undefined),
		swatches = [],
		...rest
	}: {
		class?: string;
		label?: string;
		value?: Color;
		/** Preset colours offered under the picker, as CSS colour strings; none when empty. */
		swatches?: readonly string[];
		[key: string]: unknown;
	} = $props();
</script>

<ColorPicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="color-picker"
	defaultValue={untrack(() => value)}
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<ColorPicker.Label class="text-sm font-medium text-fg">{label}</ColorPicker.Label>
	{/if}
	<ColorPicker.Control class="flex items-center gap-2">
		<ColorPicker.ChannelInput
			channel="hex"
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 font-mono text-sm text-fg shadow-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
		/>
		<ColorPicker.Trigger
			class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border shadow-sm transition-colors hover:opacity-90"
		>
			<ColorPicker.TransparencyGrid class="rounded-md" />
			<ColorPicker.Context>
				{#snippet render(api)}
					<ColorPicker.Swatch value={api().value} class="size-full rounded-md" />
				{/snippet}
			</ColorPicker.Context>
		</ColorPicker.Trigger>
	</ColorPicker.Control>
	<ColorPicker.Positioner>
		<ColorPicker.Content
			class="z-50 flex w-64 flex-col gap-3 rounded-xl border border-border bg-raised p-4 shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
			data-slot="color-picker-content"
		>
			<ColorPicker.Area class="h-36 w-full overflow-hidden rounded-lg">
				<ColorPicker.AreaBackground class="h-full w-full rounded-lg" />
				<ColorPicker.AreaThumb class="size-4 rounded-full border-2 border-paper shadow-md" />
			</ColorPicker.Area>

			<ColorPicker.ChannelSlider channel="hue" class="h-3 w-full rounded-full">
				<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
				<ColorPicker.ChannelSliderThumb
					class="size-4 -translate-y-0.5 rounded-full border-2 border-paper shadow-md"
				/>
			</ColorPicker.ChannelSlider>

			<ColorPicker.ChannelSlider channel="alpha" class="h-3 w-full rounded-full">
				<ColorPicker.TransparencyGrid class="rounded-full" />
				<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
				<ColorPicker.ChannelSliderThumb
					class="size-4 -translate-y-0.5 rounded-full border-2 border-paper shadow-md"
				/>
			</ColorPicker.ChannelSlider>

			<div class="flex gap-2">
				<ColorPicker.ChannelInput
					channel="hex"
					class="flex h-7 w-full rounded-md border border-border bg-sunken px-2 font-mono text-xs text-fg outline-none focus-visible:ring-1 focus-visible:ring-primary"
				/>
				<ColorPicker.ChannelInput
					channel="alpha"
					class="flex h-7 w-16 shrink-0 rounded-md border border-border bg-sunken px-2 font-mono text-xs text-fg outline-none focus-visible:ring-1 focus-visible:ring-primary"
				/>
			</div>

			{#if swatches.length > 0}
				<ColorPicker.SwatchGroup class="flex flex-wrap gap-1.5">
					{#each swatches as color (color)}
						<ColorPicker.SwatchTrigger
							value={color}
							class="size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110"
						>
							<ColorPicker.Swatch value={color} class="size-full rounded-md" />
						</ColorPicker.SwatchTrigger>
					{/each}
				</ColorPicker.SwatchGroup>
			{/if}
		</ColorPicker.Content>
	</ColorPicker.Positioner>
	<ColorPicker.HiddenInput />
</ColorPicker.Root>
