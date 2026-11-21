/**
 * Tests of the colour formats: each format written from known colours (hand-converted), and the
 * hex a person types read back, opaque when it gives no alpha.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { parseColor } from '@ark-ui/svelte';
import { formatColor, parseHex } from './formats';

describe('formatColor', () => {
	it('writes an opaque colour with FF as its alpha', () => {
		// #3B82F6: red 59, green 130, blue 246; hue 217°, HSL saturation 91%, lightness 60%;
		// HSB saturation 76%, brightness 96%.
		const blue = parseColor('#3b82f6');
		expect(formatColor(blue, 'hexa')).toBe('#3B82F6FF');
		expect(formatColor(blue, 'rgba')).toBe('rgba(59, 130, 246, 1)');
		expect(formatColor(blue, 'hsla')).toBe('hsla(217, 91%, 60%, 1)');
		expect(formatColor(blue, 'hsba')).toBe('hsba(217, 76%, 96%, 1)');
	});

	it('writes the alpha in every format', () => {
		// Alpha 0x80 = 128/255 = 0.502, written 0.5.
		const translucent = parseColor('#ff000080');
		expect(formatColor(translucent, 'hexa')).toBe('#FF000080');
		expect(formatColor(translucent, 'rgba')).toBe('rgba(255, 0, 0, 0.5)');
		expect(formatColor(translucent, 'hsla')).toBe('hsla(0, 100%, 50%, 0.5)');
	});
});

describe('parseHex', () => {
	it('reads 3, 4, 6 and 8 digits, with or without #, opaque without alpha digits', () => {
		expect(parseHex('3b82f6')?.toString('hexa')).toBe('#3B82F6FF');
		expect(parseHex('#3B82F6')?.toString('hexa')).toBe('#3B82F6FF');
		expect(parseHex('#3b82f640')?.toString('hexa')).toBe('#3B82F640');
		expect(parseHex('#abc')?.toString('hexa')).toBe('#AABBCCFF');
		expect(parseHex('abc8')?.toString('hexa')).toBe('#AABBCC88');
	});

	it('refuses anything else', () => {
		for (const text of ['', '#', '#12', '#12345', '#1234567', 'blue', '#ggg', 'rgba(0, 0, 0, 1)']) {
			expect(parseHex(text), text).toBeUndefined();
		}
	});
});
