<!--
@component
Docs: ColorPicker. A playground over every prop (the formats written under the controls, the preset
swatches on one line, or none), and every variant side by side: all formats with presets, hex and
RGBA only, and no formats and no presets.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ColorPicker, parseColor, type ColorFormat } from '#lib/components/color-picker/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const labels = {
		trigger: 'Choose a colour',
		area: 'Saturation and brightness',
		areaRoleDescription: '2D slider',
		areaValue: (saturation: number, brightness: number) =>
			`Saturation ${saturation}, brightness ${brightness}`,
		hue: 'Hue',
		hueValue: (hue: number) => `${hue} degrees`,
		alpha: 'Opacity',
		alphaValue: (alpha: number) => `${Math.round(alpha * 100)}%`,
		hex: 'Hex',
		swatch: (color: string) => `Use ${color}`,
		formats: 'Colour values'
	};

	// A colour picker's values are content (a material's colour), not interface colours.
	const presets = [
		'#ef4444',
		'#f97316',
		'#eab308',
		'#22c55e',
		'#3b82f6',
		'#8b5cf6',
		'#ffffff',
		'#000000',
		'#14b8a6',
		'#ec4899'
	];

	const formatSets: Record<string, ColorFormat[]> = {
		'hex, rgba, hsla': ['hexa', 'rgba', 'hsla'],
		'hex, rgba': ['hexa', 'rgba'],
		'all four': ['hexa', 'rgba', 'hsla', 'hsba'],
		none: []
	};
</script>

<div class="grid gap-4">
	<Playground
		description="Open the picker: the formats are under the sliders, the presets under them."
		controls={{
			label: text('Material colour'),
			formats: choice(['hex, rgba, hsla', 'hex, rgba', 'all four', 'none']),
			presets: number(8, { min: 0, max: 10 }),
			disabled: boolean(),
			readOnly: boolean()
		}}
	>
		{#snippet example(values)}
			<ColorPicker
				class="w-60"
				label={values.label}
				{labels}
				defaultValue={parseColor('#737efa')}
				formats={formatSets[values.formats]}
				swatches={presets.slice(0, values.presets)}
				disabled={values.disabled}
				readOnly={values.readOnly}
			/>
		{/snippet}
	</Playground>
	<Card title="Variants">
		<div class="grid gap-6 sm:grid-cols-3">
			<ColorPicker
				label="All formats and presets"
				{labels}
				defaultValue={parseColor('#22c55e80')}
				formats={formatSets['all four']}
				swatches={presets.slice(0, 8)}
			/>
			<ColorPicker
				label="Hex and RGBA, no presets"
				{labels}
				defaultValue={parseColor('#f97316')}
				formats={formatSets['hex, rgba']}
			/>
			<ColorPicker
				label="No formats, no presets"
				{labels}
				defaultValue={parseColor('#3b82f6')}
				formats={[]}
			/>
		</div>
	</Card>
</div>
