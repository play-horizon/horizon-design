<script lang="ts">
	import { ColorPicker, type ColorPickerColor as Color } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { untrack } from 'svelte';

	let {
		class: className = '',
		label = '',
		value = $bindable(undefined),
		...rest
	}: {
		class?: string;
		label?: string;
		value?: Color;
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
		<ColorPicker.Label class="text-foreground text-sm font-medium">{label}</ColorPicker.Label>
	{/if}
	<ColorPicker.Control class="flex items-center gap-2">
		<ColorPicker.ChannelInput
			channel="hex"
			class="border-border bg-input text-foreground focus-visible:ring-ring focus-visible:border-primary flex h-8 w-full rounded-lg border px-3 py-1 font-mono text-sm shadow-sm outline-none focus-visible:ring-2"
		/>
		<ColorPicker.Trigger
			class="border-border inline-flex size-8 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors hover:opacity-90"
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
			class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover z-50 flex w-64 flex-col gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-xl outline-none"
			data-slot="color-picker-content"
		>
			<ColorPicker.Area class="h-36 w-full overflow-hidden rounded-lg">
				<ColorPicker.AreaBackground class="h-full w-full rounded-lg" />
				<ColorPicker.AreaThumb class="size-4 rounded-full border-2 border-white shadow-md" />
			</ColorPicker.Area>

			<ColorPicker.ChannelSlider channel="hue" class="h-3 w-full rounded-full">
				<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
				<ColorPicker.ChannelSliderThumb
					class="size-4 -translate-y-0.5 rounded-full border-2 border-white shadow-md"
				/>
			</ColorPicker.ChannelSlider>

			<ColorPicker.ChannelSlider channel="alpha" class="h-3 w-full rounded-full">
				<ColorPicker.TransparencyGrid class="rounded-full" />
				<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
				<ColorPicker.ChannelSliderThumb
					class="size-4 -translate-y-0.5 rounded-full border-2 border-white shadow-md"
				/>
			</ColorPicker.ChannelSlider>

			<div class="flex gap-2">
				<ColorPicker.ChannelInput
					channel="hex"
					class="border-border bg-input text-foreground focus-visible:ring-ring flex h-7 w-full rounded-md border px-2 font-mono text-xs outline-none focus-visible:ring-1"
				/>
				<ColorPicker.ChannelInput
					channel="alpha"
					class="border-border bg-input text-foreground focus-visible:ring-ring flex h-7 w-16 shrink-0 rounded-md border px-2 font-mono text-xs outline-none focus-visible:ring-1"
				/>
			</div>

			<ColorPicker.SwatchGroup class="flex flex-wrap gap-1.5">
				{#each ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff', '#000000'] as color (color)}
					<ColorPicker.SwatchTrigger
						value={color}
						class="border-border size-6 rounded-md border shadow-sm transition-transform hover:scale-110"
					>
						<ColorPicker.Swatch value={color} class="size-full rounded-md" />
					</ColorPicker.SwatchTrigger>
				{/each}
			</ColorPicker.SwatchGroup>
		</ColorPicker.Content>
	</ColorPicker.Positioner>
	<ColorPicker.HiddenInput />
</ColorPicker.Root>
