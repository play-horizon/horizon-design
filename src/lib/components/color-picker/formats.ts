/**
 * The colour formats `ColorPicker` writes a colour in: 8-digit hex (the alpha always written, `FF`
 * when opaque), `rgba()`, `hsla()` and `hsba()`, rounded for reading; and the hex text a person
 * types, read back into a colour.
 * @module
 */
import { parseColor, type ColorPickerColor } from '@ark-ui/svelte';

/** A format the picker can show a colour in. */
export type ColorFormat = 'hexa' | 'rgba' | 'hsla' | 'hsba';

/** Rounds to at most `digits` decimals, without trailing zeros. */
function round(value: number, digits = 0): number {
	const scale = 10 ** digits;
	return Math.round(value * scale) / scale;
}

/**
 * `color` written in `format`: `#RRGGBBAA` in capitals, or a CSS function with whole channels and
 * the alpha to two decimals.
 *
 * @example formatColor(parseColor('#3b82f6'), 'rgba') // 'rgba(59, 130, 246, 1)'
 */
export function formatColor(color: ColorPickerColor, format: ColorFormat): string {
	const alpha = round(color.getChannelValue('alpha'), 2);
	switch (format) {
		case 'hexa':
			return color.toString('hexa');
		case 'rgba': {
			const rgb = color.toFormat('rgba');
			const [red, green, blue] = (['red', 'green', 'blue'] as const).map((channel) =>
				round(rgb.getChannelValue(channel))
			);
			return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
		}
		case 'hsla': {
			const hsl = color.toFormat('hsla');
			const [hue, saturation, lightness] = (['hue', 'saturation', 'lightness'] as const).map(
				(channel) => round(hsl.getChannelValue(channel))
			);
			return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
		}
		case 'hsba': {
			const hsb = color.toFormat('hsba');
			const [hue, saturation, brightness] = (['hue', 'saturation', 'brightness'] as const).map(
				(channel) => round(hsb.getChannelValue(channel))
			);
			return `hsba(${hue}, ${saturation}%, ${brightness}%, ${alpha})`;
		}
	}
}

/**
 * The colour a person typed as hex: 3, 4, 6 or 8 digits, with or without `#`, any case. Without
 * alpha digits, the colour is opaque. `undefined` for anything else.
 *
 * @example parseHex('3b82f6')?.toString('hexa') // '#3B82F6FF'
 */
export function parseHex(text: string): ColorPickerColor | undefined {
	const digits = text.trim().replace(/^#/, '');
	if (!/^([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(digits)) return undefined;
	return parseColor(`#${digits}`);
}
