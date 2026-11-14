<!--
@component
Picks a colour: a hex field and a swatch trigger opening an area, hue and alpha sliders and
fields (Ark ColorPicker); swatches are passed in. `labels` names every control for assistive
technology and gives the values the sliders announce; the trigger takes the visible `label` when
there is one.
-->
<script lang="ts">
	import {
		ColorPicker,
		type ColorPickerColor as Color,
		type ColorPickerValueChangeDetails
	} from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		labels,
		value = $bindable(),
		onValueChange,
		swatches = [],
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The visible label above the field, such as "Material colour". */
		label?: string;
		/** The accessible names of the controls. */
		labels: {
			/** The swatch button that opens the picker, such as "Choose a colour". */
			trigger: string;
			/** The saturation and brightness area, such as "Saturation and brightness". */
			area: string;
			/** The role the area is announced as, such as "2D slider". */
			areaRoleDescription: string;
			/**
			 * The area's announced value, from its saturation and brightness (lightness under an HSL
			 * `format`), each from 0 to 100, such as `Saturation ${saturation}, brightness ${brightness}`.
			 */
			areaValue: (saturation: number, brightness: number) => string;
			/** The hue slider, such as "Hue". */
			hue: string;
			/** The hue slider's announced value, from the hue in degrees, such as `${hue} degrees`. */
			hueValue: (hue: number) => string;
			/** The alpha slider and field, such as "Opacity". */
			alpha: string;
			/** The alpha slider's announced value, from the alpha from 0 to 1, such as `${alpha * 100}%`. */
			alphaValue: (alpha: number) => string;
			/** The hex fields, such as "Hex". */
			hex: string;
			/** A preset swatch, from its colour string, such as `Use ${color}`. */
			swatch: (color: string) => string;
		};
		/** The colour (bindable), from `parseColor`; when unset, `defaultValue` gives the first one. */
		value?: Color;
		/** Called with the new colour while it changes. */
		onValueChange?: (details: ColorPickerValueChangeDetails) => void;
		/** Preset colours offered under the picker, as CSS colour strings; none when empty. */
		swatches?: readonly string[];
		/** Other props of Ark's `ColorPicker.Root`, such as `defaultValue`, `disabled` and `name`. */
		[key: string]: unknown;
	} = $props();

	/** The colour in the HSB or HSL form the area and the sliders work in, chosen as Ark does. */
	function toAreaColor(color: Color, format: string): Color {
		return color.toFormat(format.startsWith('hsl') ? 'hsla' : 'hsba');
	}
</script>

<ColorPicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="color-picker"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	{#if label}
		<ColorPicker.Label class="text-sm font-medium text-fg">{label}</ColorPicker.Label>
	{/if}
	<ColorPicker.Control class="flex items-center gap-2">
		<ColorPicker.ChannelInput
			channel="hex"
			aria-label={labels.hex}
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 font-mono text-sm text-fg shadow-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
		/>
		<ColorPicker.Trigger
			aria-label={labels.trigger}
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
	<Portal>
		<ColorPicker.Positioner>
			<ColorPicker.Content
				aria-label={labels.trigger}
				class="z-50 flex w-64 flex-col gap-3 rounded-xl border border-border bg-raised p-4 shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
				data-slot="color-picker-content"
			>
				<ColorPicker.Context>
					{#snippet render(api)}
						{@const area = toAreaColor(api().value, api().format)}
						{@const [, xChannel, yChannel] = area.getChannels()}
						<ColorPicker.Area class="h-36 w-full overflow-hidden rounded-lg">
							<ColorPicker.AreaBackground class="h-full w-full rounded-lg" />
							<ColorPicker.AreaThumb
								aria-label={labels.area}
								aria-roledescription={labels.areaRoleDescription}
								aria-valuetext={labels.areaValue(
									area.getChannelValue(xChannel),
									area.getChannelValue(yChannel)
								)}
								class="size-4 rounded-full border-2 border-paper shadow-md"
							/>
						</ColorPicker.Area>

						<ColorPicker.ChannelSlider channel="hue" class="h-3 w-full rounded-full">
							<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
							<ColorPicker.ChannelSliderThumb
								aria-label={labels.hue}
								aria-valuetext={labels.hueValue(area.getChannelValue('hue'))}
								class="size-4 -translate-y-0.5 rounded-full border-2 border-paper shadow-md"
							/>
						</ColorPicker.ChannelSlider>

						<ColorPicker.ChannelSlider channel="alpha" class="h-3 w-full rounded-full">
							<ColorPicker.TransparencyGrid class="rounded-full" />
							<ColorPicker.ChannelSliderTrack class="h-full w-full rounded-full" />
							<ColorPicker.ChannelSliderThumb
								aria-label={labels.alpha}
								aria-valuetext={labels.alphaValue(area.getChannelValue('alpha'))}
								class="size-4 -translate-y-0.5 rounded-full border-2 border-paper shadow-md"
							/>
						</ColorPicker.ChannelSlider>
					{/snippet}
				</ColorPicker.Context>

				<div class="flex gap-2">
					<ColorPicker.ChannelInput
						channel="hex"
						aria-label={labels.hex}
						class="flex h-7 w-full rounded-md border border-border bg-sunken px-2 font-mono text-xs text-fg outline-none focus-visible:ring-1 focus-visible:ring-primary"
					/>
					<ColorPicker.ChannelInput
						channel="alpha"
						aria-label={labels.alpha}
						class="flex h-7 w-16 shrink-0 rounded-md border border-border bg-sunken px-2 font-mono text-xs text-fg outline-none focus-visible:ring-1 focus-visible:ring-primary"
					/>
				</div>

				{#if swatches.length > 0}
					<ColorPicker.SwatchGroup class="flex flex-wrap gap-1.5">
						{#each swatches as color (color)}
							<ColorPicker.SwatchTrigger
								value={color}
								aria-label={labels.swatch(color)}
								class="size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110"
							>
								<ColorPicker.Swatch value={color} class="size-full rounded-md" />
							</ColorPicker.SwatchTrigger>
						{/each}
					</ColorPicker.SwatchGroup>
				{/if}
			</ColorPicker.Content>
		</ColorPicker.Positioner>
	</Portal>
	<ColorPicker.HiddenInput />
</ColorPicker.Root>
