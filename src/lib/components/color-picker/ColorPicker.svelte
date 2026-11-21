<!--
@component
Picks a colour: a hex field and a swatch trigger opening an area, hue and alpha sliders and
fields (Ark ColorPicker). The hex fields show 8 digits, the alpha always written (`FF` when
opaque), and take 3, 4, 6 or 8 digits (opaque without alpha digits). Under the controls, the colour
is written in each of `formats` at once (hex, `rgba()` and `hsla()` by default), and under them the
`swatches`, preset colours on a single line; no swatches, no row. `labels` names every control
for assistive technology and gives the values the sliders announce; the trigger takes the visible
`label` when there is one, and shows `labels.trigger` in its tooltip.
-->
<script lang="ts">
	import {
		ColorPicker,
		type ColorPickerColor as Color,
		type ColorPickerValueChangeDetails
	} from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import { formatColor, parseHex, type ColorFormat } from './formats';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		class: className = '',
		label = '',
		labels,
		value = $bindable(),
		onValueChange,
		swatches = [],
		formats = ['hexa', 'rgba', 'hsla'],
		disabled = false,
		readOnly = false,
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
			/** The list of the colour's values in `formats`, such as "Colour values". */
			formats: string;
		};
		/** The colour (bindable), from `parseColor`; when unset, `defaultValue` gives the first one. */
		value?: Color;
		/** Called with the new colour while it changes. */
		onValueChange?: (details: ColorPickerValueChangeDetails) => void;
		/** Preset colours offered on one line under the picker, as CSS colour strings; none when empty. */
		swatches?: readonly string[];
		/** The formats the colour is written in under the controls, in order; none when empty. */
		formats?: readonly ColorFormat[];
		/** Turns every control off. */
		disabled?: boolean;
		/** Shows the colour without letting it change. */
		readOnly?: boolean;
		/** Other props of Ark's `ColorPicker.Root`, such as `defaultValue` and `name`. */
		[key: string]: unknown;
	} = $props();

	/** The colour in the HSB or HSL form the area and the sliders work in, chosen as Ark does. */
	function toAreaColor(color: Color, format: string): Color {
		return color.toFormat(format.startsWith('hsl') ? 'hsla' : 'hsba');
	}

	// The trigger's id, shared by Ark's color picker and its tooltip, which both find it by id.
	const uid = $props.id();
	const triggerId = `${uid}-trigger`;

	/** Takes the typed hex when it reads as a colour; otherwise puts the current one back. */
	function commitHex(input: HTMLInputElement, current: Color, setValue: (color: Color) => void) {
		const typed = parseHex(input.value);
		if (typed) setValue(typed);
		input.value = formatColor(typed ?? current, 'hexa');
	}
</script>

{#snippet hexField(className: string)}
	<ColorPicker.Context>
		{#snippet render(api)}
			<input
				type="text"
				aria-label={labels.hex}
				spellcheck="false"
				autocomplete="off"
				maxlength={9}
				class={cn(
					'flex w-full rounded-lg border border-border bg-sunken font-mono text-fg outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50',
					className
				)}
				data-slot="color-picker-hex"
				value={formatColor(api().value, 'hexa')}
				{disabled}
				readonly={readOnly}
				onchange={(event) => commitHex(event.currentTarget, api().value, api().setValue)}
				onkeydown={(event) => {
					if (event.key === 'Enter') commitHex(event.currentTarget, api().value, api().setValue);
				}}
			/>
		{/snippet}
	</ColorPicker.Context>
{/snippet}

<ColorPicker.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="color-picker"
	{value}
	{disabled}
	{readOnly}
	ids={{ trigger: triggerId }}
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
		{@render hexField('h-8 px-3 py-1 text-sm shadow-sm')}
		<Tooltip content={labels.trigger} {triggerId}>
			{#snippet trigger(props)}
				<ColorPicker.Trigger
					{...props}
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
			{/snippet}
		</Tooltip>
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
					{@render hexField('h-7 rounded-md px-2 text-xs')}
					<ColorPicker.ChannelInput
						channel="alpha"
						aria-label={labels.alpha}
						class="flex h-7 w-16 shrink-0 rounded-md border border-border bg-sunken px-2 font-mono text-xs text-fg outline-none focus-visible:ring-1 focus-visible:ring-primary"
					/>
				</div>

				{#if formats.length > 0}
					<ColorPicker.Context>
						{#snippet render(api)}
							<ul
								aria-label={labels.formats}
								class="grid gap-1 border-t border-border pt-3 font-mono text-xs text-fg-2"
								data-slot="color-picker-formats"
							>
								{#each formats as format (format)}
									<li class="truncate select-text">{formatColor(api().value, format)}</li>
								{/each}
							</ul>
						{/snippet}
					</ColorPicker.Context>
				{/if}

				{#if swatches.length > 0}
					<!-- One line whatever their number: the swatches share its width. -->
					<ColorPicker.SwatchGroup
						class="grid auto-cols-fr grid-flow-col gap-1.5"
						data-slot="color-picker-swatches"
					>
						{#each swatches as color (color)}
							<ColorPicker.SwatchTrigger
								value={color}
								aria-label={labels.swatch(color)}
								class="aspect-square max-h-7 w-full rounded-md border border-border shadow-sm transition-transform hover:scale-110"
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
