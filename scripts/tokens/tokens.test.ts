/**
 * Tests of the token pipeline: the OKLCH → hex conversion (colorjs.io), every OKLCH colour of the library
 * inside sRGB, the values the library exports (`horizon-design/tokens`) against hand-computed
 * ones, those values against the CSS variables of each theme in the generated theme CSS, and the
 * WCAG contrast of the text the kit draws on its fills.
 * @module
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import Color from 'colorjs.io';
import { describe, expect, it } from 'vitest';
import { tokenValues } from '../../src/lib/generated/tokens.ts';
import { oklchToHex } from './generate.ts';
import {
	colorTokenDocs,
	colors,
	elevation,
	palette,
	themes,
	toOklchText,
	type Theme
} from './tokens.ts';

const themeCss = readFileSync(
	resolve(import.meta.dirname, '../../src/lib/generated/theme.css'),
	'utf8'
);

/** The `--name: value` declarations of the theme block that opens with `selector`. */
function declarations(selector: string): Map<string, string> {
	const start = themeCss.indexOf(`${selector} {`);
	expect(start).toBeGreaterThanOrEqual(0);
	const block = themeCss.slice(start, themeCss.indexOf('}', start));
	const pairs = [...block.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map(
		(m) => [m[1], m[2]] as const
	);
	return new Map(pairs);
}

const blockSelectors: Record<Theme, string> = {
	dark: "[data-theme='dark']",
	light: "[data-theme='light']"
};

describe('oklchToHex', () => {
	it('converts white, black and a mid grey', () => {
		expect(oklchToHex('oklch(1 0 0)')).toBe('#ffffff');
		expect(oklchToHex('oklch(0 0 0)')).toBe('#000000');
		// A neutral of OKLCH lightness 0.6 is linear 0.216 (0.6³), sRGB 128.04.
		expect(oklchToHex('oklch(0.6 0 0)')).toBe('#808080');
	});

	it('appends the alpha byte to translucent colours', () => {
		expect(oklchToHex('oklch(1 0 0 / 0.5)')).toBe('#ffffff80');
		expect(oklchToHex('oklch(0 0 0 / 0.062)')).toBe('#00000010');
	});

	it('refuses a colour outside sRGB', () => {
		expect(() => oklchToHex('oklch(0.76 0.13 264)')).toThrow(/outside sRGB/);
	});

	it('refuses text that is not an oklch() colour', () => {
		expect(() => oklchToHex('#ffffff')).toThrow(/not an oklch/);
		expect(() => oklchToHex('oklch(0.5. 0.1 20)')).toThrow();
		expect(() => oklchToHex('blue')).toThrow(/not an oklch/);
	});
});

describe('tokenValues', () => {
	// Converted by hand with CSS Color 4's matrices (OKLab → LMS → XYZ → linear sRGB) and its sRGB
	// transfer function, then checked against the pixels a Chromium canvas paints for the OKLCH.
	it('gives the OKLCH and hand-converted hex of two tokens of each theme', () => {
		// oklch(0.202 0.029 268.7) → sRGB 16.94, 21.89, 35.79
		expect(tokenValues.dark.background).toEqual({
			oklch: 'oklch(0.202 0.029 268.7)',
			hex: '#111624'
		});
		// oklch(0.663 0.178 263.8) → sRGB 88.95, 140.89, 254.83
		expect(tokenValues.dark.primary).toEqual({ oklch: 'oklch(0.663 0.178 263.8)', hex: '#598dff' });
		// oklch(0.985 0.003 255) → sRGB 248.69, 250.16, 252.08
		expect(tokenValues.light.background).toEqual({
			oklch: 'oklch(0.985 0.003 255)',
			hex: '#f9fafc'
		});
		// oklch(0.208 0.04 265.8) → sRGB 15.05, 23.06, 42.16
		expect(tokenValues.light.fg).toEqual({ oklch: 'oklch(0.208 0.04 265.8)', hex: '#0f172a' });
	});

	it('has every colour token in both themes', () => {
		const names = Object.keys(colorTokenDocs).sort();
		for (const theme of themes) expect(Object.keys(tokenValues[theme]).sort()).toEqual(names);
	});

	it.each(themes)('matches the CSS variables of the %s theme', (theme) => {
		const css = declarations(blockSelectors[theme]);
		for (const [name, { oklch, hex }] of Object.entries(tokenValues[theme])) {
			const value = css.get(name);
			expect(value, `--${name} in the ${theme} theme`).toBe(oklch);
			expect(oklchToHex(oklch), `--${name}`).toBe(hex);
		}
	});
});

/** Every file under `dir` whose name ends with one of `extensions`. */
function sourceFiles(dir: string, extensions: readonly string[]): string[] {
	return readdirSync(dir, { recursive: true, encoding: 'utf8' })
		.filter((name) => extensions.some((extension) => name.endsWith(extension)))
		.map((name) => resolve(dir, name));
}

/** The `oklch(…)` colours written in `text` (prose that names the function, `oklch()`, has no digits). */
function oklchLiterals(text: string): string[] {
	return [...text.matchAll(/oklch\(\s*[0-9.][^)]*\)/g)].map((match) => match[0]);
}

describe('the sRGB gamut', () => {
	it('holds every colour of the token source', () => {
		const sourceColors = [
			...Object.values(palette),
			...themes.flatMap((theme) => Object.values(colors[theme]).map(toOklchText)),
			...themes.flatMap((theme) => Object.values(elevation[theme]).flatMap(oklchLiterals))
		];
		expect(sourceColors.length).toBeGreaterThan(100);
		for (const color of sourceColors) {
			expect(() => oklchToHex(color), color).not.toThrow();
		}
	});

	it('holds every OKLCH colour written in the library and the docs site', () => {
		const files = sourceFiles(resolve(import.meta.dirname, '../../src'), [
			'.css',
			'.svelte',
			'.ts'
		]);
		for (const file of files) {
			for (const color of oklchLiterals(readFileSync(file, 'utf8'))) {
				expect(() => oklchToHex(color), `${color} in ${file}`).not.toThrow();
			}
		}
	});
});

/** `color` (translucent or not) laid over the opaque `backdrop`, as the screen shows it. */
function over(color: string, backdrop: string): Color {
	const top = new Color(color).to('srgb');
	const under = new Color(backdrop).to('srgb');
	const alpha = top.alpha;
	return new Color(
		'srgb',
		// A channel is null only for a missing (`none`) component, which no token has: read it as 0.
		top.coords.map(
			(channel, index) => (channel ?? 0) * alpha + (under.coords[index] ?? 0) * (1 - alpha)
		) as [number, number, number]
	);
}

/** The WCAG 2 contrast of `text` on `fill` (laid over `backdrop` when translucent). */
function contrast(text: string, fill: string, backdrop = fill): number {
	return new Color(text).contrast(over(fill, backdrop), 'WCAG21');
}

describe('contrast', () => {
	const value = (theme: Theme, token: keyof typeof colorTokenDocs) =>
		toOklchText(colors[theme][token]);

	it('keeps warning text at 4.5:1 on every surface and on its own tint, in both themes', () => {
		for (const theme of themes) {
			for (const surface of ['background', 'surface', 'raised', 'sunken'] as const) {
				const backdrop = value(theme, surface);
				const label = `${theme} warning on ${surface}`;
				expect(contrast(value(theme, 'warning'), backdrop), label).toBeGreaterThanOrEqual(4.5);
				expect(
					contrast(value(theme, 'warning'), value(theme, 'warning-subtle'), backdrop),
					`${label}'s tint`
				).toBeGreaterThanOrEqual(4.5);
			}
		}
	});

	it('keeps the initials on every avatar tone at 4.5:1', () => {
		for (const tone of [1, 2, 3, 4, 5] as const) {
			expect(
				contrast(value('dark', 'on-art'), value('dark', `avatar-${tone}`)),
				`avatar-${tone}`
			).toBeGreaterThanOrEqual(4.5);
		}
	});

	it('keeps text on the scrims over game art at 4.5:1, even over white art', () => {
		for (const scrim of ['art-scrim', 'art-scrim-hover'] as const) {
			expect(
				contrast(value('light', 'on-art'), value('light', scrim), 'oklch(1 0 0)'),
				scrim
			).toBeGreaterThanOrEqual(4.5);
		}
	});
});
