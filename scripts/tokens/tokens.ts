/**
 * The single source of horizon-design's colour and elevation tokens: one OKLCH palette and, for
 * each theme, the semantic tokens mapped onto it (values from the approved U0 mockups).
 *
 * Every value lies inside sRGB (the generator refuses one that doesn't), so the CSS and the
 * exported hex show the same colour on every display; where a mockup value fell just outside sRGB,
 * its chroma was lowered to the sRGB boundary, which changes nothing visible on an sRGB screen.
 *
 * `generate.ts` turns this file into the library's theme CSS (CSS variables per theme plus the
 * Tailwind theme) and into the exported hex values. Components use only the semantic tokens,
 * through Tailwind (`bg-surface`, `text-muted`, `border-border`…) or `var(--surface)`.
 * @module
 */

/** The shared palette: a navy ramp, a blue ramp and the status hues, the same in both themes. */
export const palette = {
	'navy-0': 'oklch(1 0 0)',
	'navy-25': 'oklch(0.985 0.003 255)',
	'navy-50': 'oklch(0.968 0.007 255)',
	'navy-100': 'oklch(0.945 0.01 256)',
	'navy-150': 'oklch(0.925 0.013 257)',
	'navy-200': 'oklch(0.895 0.017 258)',
	'navy-300': 'oklch(0.83 0.024 259)',
	'navy-400': 'oklch(0.7 0.035 260)',
	'navy-500': 'oklch(0.6 0.045 262)',
	'navy-600': 'oklch(0.5 0.045 263)',
	'navy-650': 'oklch(0.4 0.05 265)',
	'navy-700': 'oklch(0.34 0.055 266)',
	'navy-750': 'oklch(0.297 0.052 266.4)',
	'navy-800': 'oklch(0.262 0.047 267)',
	'navy-850': 'oklch(0.239 0.04 268.6)',
	'navy-900': 'oklch(0.221 0.035 268.6)',
	'navy-950': 'oklch(0.202 0.029 268.7)',
	'navy-1000': 'oklch(0.178 0.026 269)',
	'blue-200': 'oklch(0.86 0.068 264)',
	'blue-300': 'oklch(0.76 0.122 264)',
	'blue-400': 'oklch(0.663 0.178 263.8)',
	'blue-500': 'oklch(0.604 0.197 264.8)',
	'blue-600': 'oklch(0.533 0.219 264)',
	'blue-700': 'oklch(0.488 0.217 264.4)',
	'red-400': 'oklch(0.672 0.208 25.6)',
	'red-600': 'oklch(0.541 0.207 25.3)',
	'green-400': 'oklch(0.72 0.15 162.5)',
	'green-600': 'oklch(0.506 0.109 162.6)',
	'amber-400': 'oklch(0.79 0.16 75)',
	'gold-300': 'oklch(0.84 0.17 84)',
	'gold-600': 'oklch(0.51 0.104 84)',
	'sky-400': 'oklch(0.754 0.139 232.7)',
	'sky-600': 'oklch(0.52 0.13 245)',
	'violet-400': 'oklch(0.7 0.16 300)',
	'violet-600': 'oklch(0.52 0.19 300)'
} as const;

/** A palette entry's name. */
export type PaletteName = keyof typeof palette;

/** The two themes. Dark is the default (`:root`); light applies under `data-theme="light"`. */
export const themes = ['dark', 'light'] as const;

/** A theme's name. */
export type Theme = (typeof themes)[number];

/**
 * A token's value: a palette entry, the same entry with an alpha (`[name, alpha]`), or an OKLCH
 * literal for the colours that sit between ramp steps, among them the text colours whose ramp step
 * fell short of 4.5:1 and was lightened (dark) or darkened (light) just enough, hue kept.
 */
export type ColorValue = PaletteName | readonly [PaletteName, number] | `oklch(${string})`;

/** What each semantic colour token is for (shown in the generated CSS and the docs). */
export const colorTokenDocs = {
	background: 'The page and window background.',
	sunken: 'Recessed areas: sidebars, title bars, input fields, segmented-control tracks, code.',
	surface: 'Cards, panels and default buttons.',
	raised: 'Popovers, menus, dialogs and hover cards.',
	hover: 'The fill of a hovered row, item or ghost button.',
	active: 'The fill of a pressed or current item.',
	border: 'Default borders and dividers.',
	'border-strong': 'Borders that must stand out: overlays, the window frame, keyboard keys.',
	fg: 'Primary text.',
	'fg-2': 'Secondary text: body copy next to primary text.',
	muted: 'Labels, metadata and placeholder text.',
	faint:
		'The quietest text: hints, counts and disabled text, still 4.5:1 on every surface; never on a tint.',
	primary: 'The one main action, links, selection and focus.',
	'primary-hover': 'A hovered primary action.',
	'on-primary': 'Text and icons on a primary fill.',
	'primary-subtle': 'Tinted primary fills: selected rows, tint buttons, chips.',
	'primary-border': 'Borders of tinted primary elements.',
	danger: 'Errors and destructive actions.',
	'danger-subtle': 'Tinted danger fills.',
	'danger-border': 'Borders of tinted danger elements.',
	'on-danger': 'Text and icons on a danger fill.',
	success: 'Success, running and online states.',
	'success-subtle': 'Tinted success fills.',
	'success-border': 'Borders of tinted success elements.',
	warning: 'Warnings and unapplied changes.',
	'warning-subtle': 'Tinted warning fills.',
	'warning-border': 'Borders of tinted warning elements.',
	info: 'Neutral information: banners, console info lines.',
	'info-subtle': 'Tinted info fills.',
	'info-border': 'Borders of tinted info elements.',
	accent: 'Information badges, the one violet hue.',
	'accent-subtle': 'Tinted accent fills.',
	'accent-border': 'Borders of tinted accent elements.',
	server: "The Server mode's colour in the Editor.",
	local: "The Local mode's colour in the Editor.",
	scrim: 'The dimmed backdrop behind modal overlays.',
	paper: 'Always white: switch and slider thumbs, QR code backgrounds.',
	'on-art': 'Text and icons drawn over game art, in both themes.',
	'art-scrim': 'Translucent labels and buttons drawn over game art, in both themes.',
	'art-scrim-hover': 'A hovered translucent button over game art, in both themes.',
	'avatar-1': 'Avatar fallback tone 1.',
	'avatar-2': 'Avatar fallback tone 2.',
	'avatar-3': 'Avatar fallback tone 3.',
	'avatar-4': 'Avatar fallback tone 4.',
	'avatar-5': 'Avatar fallback tone 5.',
	'grid-line': 'Lines of background grids (graph, viewport).',
	'code-line': 'The highlight of the current line in code.',
	'code-keyword': 'Code: keywords.',
	'code-function': 'Code: function names.',
	'code-string': 'Code: strings.',
	'code-number': 'Code: numbers.',
	'code-type': 'Code: type names.',
	'code-comment': 'Code: comments.',
	'code-attribute': 'Code: attributes and properties.'
} as const;

/** A semantic colour token's name. */
export type ColorToken = keyof typeof colorTokenDocs;

/** Each theme's per-theme elevation: three shadows and the inset highlight on raised edges. */
export interface Elevation {
	sm: string;
	md: string;
	lg: string;
	highlight: string;
}

/** Tokens that are the same in both themes. */
const shared = {
	paper: 'navy-0',
	'on-art': 'navy-0',
	'art-scrim': 'oklch(0.15 0.02 268 / 0.72)',
	'art-scrim-hover': 'oklch(0.15 0.02 268 / 0.86)',
	'avatar-1': 'oklch(0.56 0.17 264)',
	'avatar-2': 'oklch(0.54 0.12 160)',
	'avatar-3': 'oklch(0.56 0.15 45)',
	'avatar-4': 'oklch(0.58 0.18 330)',
	'avatar-5': 'oklch(0.54 0.09 200)'
} as const satisfies Partial<Record<ColorToken, ColorValue>>;

/**
 * The semantic colour tokens of each theme. Every text colour keeps 4.5:1 (WCAG 2.2 AA) on every fill
 * it is drawn on, which `tokens.test.ts` checks pair by pair.
 */
export const colors: Record<Theme, Record<ColorToken, ColorValue>> = {
	dark: {
		background: 'navy-950',
		sunken: 'navy-1000',
		surface: 'navy-900',
		raised: 'navy-850',
		hover: 'navy-800',
		active: 'navy-750',
		border: 'navy-750',
		'border-strong': 'navy-700',
		fg: 'oklch(0.968 0.007 248)',
		'fg-2': 'oklch(0.86 0.02 255)',
		muted: 'oklch(0.685 0.045 261)',
		faint: 'oklch(0.635 0.045 263)',
		primary: 'oklch(0.672 0.172 263.8)',
		'primary-hover': 'blue-300',
		'on-primary': 'oklch(0.17 0.02 265)',
		'primary-subtle': ['blue-400', 0.13],
		'primary-border': ['blue-400', 0.45],
		danger: 'oklch(0.679 0.208 25.6)',
		'danger-subtle': ['red-400', 0.13],
		'danger-border': ['red-400', 0.45],
		'on-danger': 'oklch(0.18 0.03 25)',
		success: 'green-400',
		'success-subtle': ['green-400', 0.13],
		'success-border': ['green-400', 0.4],
		warning: 'amber-400',
		'warning-subtle': ['amber-400', 0.14],
		'warning-border': ['amber-400', 0.45],
		info: 'sky-400',
		'info-subtle': ['sky-400', 0.13],
		'info-border': ['sky-400', 0.4],
		accent: 'violet-400',
		'accent-subtle': ['violet-400', 0.13],
		'accent-border': ['violet-400', 0.35],
		server: 'oklch(0.672 0.172 263.8)',
		local: 'green-400',
		scrim: 'oklch(0.12 0.02 268 / 0.62)',
		...shared,
		'grid-line': ['navy-0', 0.045],
		'code-line': ['navy-0', 0.035],
		'code-keyword': 'oklch(0.74 0.15 300)',
		'code-function': 'oklch(0.8 0.12 230)',
		'code-string': 'oklch(0.8 0.13 150)',
		'code-number': 'oklch(0.8 0.13 65)',
		'code-type': 'oklch(0.82 0.1 190)',
		'code-comment': 'oklch(0.642 0.04 262)',
		'code-attribute': 'oklch(0.82 0.08 25)'
	},
	light: {
		background: 'navy-25',
		sunken: 'navy-100',
		surface: 'navy-0',
		raised: 'navy-0',
		hover: 'navy-100',
		active: 'navy-150',
		border: 'navy-200',
		'border-strong': 'navy-300',
		fg: 'oklch(0.208 0.04 265.8)',
		'fg-2': 'oklch(0.33 0.045 265)',
		muted: 'oklch(0.498 0.041 259)',
		faint: 'oklch(0.529 0.035 260)',
		primary: 'oklch(0.503 0.219 264)',
		'primary-hover': 'blue-700',
		'on-primary': 'navy-0',
		'primary-subtle': ['blue-600', 0.09],
		'primary-border': ['blue-600', 0.4],
		danger: 'oklch(0.525 0.207 25.3)',
		'danger-subtle': ['red-600', 0.08],
		'danger-border': ['red-600', 0.4],
		'on-danger': 'navy-0',
		success: 'oklch(0.477 0.103 162.6)',
		'success-subtle': ['green-600', 0.1],
		'success-border': ['green-600', 0.4],
		// A gold, not the dark theme's amber darkened (which reads brown): as text it keeps 4.5:1
		// on every light surface and on its own tint.
		warning: 'gold-600',
		'warning-subtle': ['gold-300', 0.2],
		'warning-border': ['gold-600', 0.45],
		info: 'oklch(0.499 0.125 245)',
		'info-subtle': ['sky-600', 0.09],
		'info-border': ['sky-600', 0.4],
		accent: 'violet-600',
		'accent-subtle': ['violet-600', 0.08],
		'accent-border': ['violet-600', 0.35],
		server: 'oklch(0.503 0.219 264)',
		local: 'oklch(0.477 0.103 162.6)',
		scrim: 'oklch(0.2 0.04 266 / 0.4)',
		...shared,
		'grid-line': 'oklch(0.3 0.05 265 / 0.06)',
		'code-line': 'oklch(0.4 0.08 265 / 0.04)',
		'code-keyword': 'oklch(0.5 0.2 300)',
		'code-function': 'oklch(0.48 0.12 245)',
		'code-string': 'oklch(0.5 0.13 150)',
		'code-number': 'oklch(0.526 0.13 55)',
		'code-type': 'oklch(0.5 0.085 200)',
		'code-comment': 'oklch(0.515 0.03 262)',
		'code-attribute': 'oklch(0.5 0.15 25)'
	}
};

/** The elevation of each theme: deeper, darker shadows in dark; soft navy-tinted ones in light. */
export const elevation: Record<Theme, Elevation> = {
	dark: {
		sm: '0 1px 2px oklch(0 0 0 / 0.3)',
		md: '0 6px 18px oklch(0 0 0 / 0.32), 0 1px 2px oklch(0 0 0 / 0.3)',
		lg: '0 24px 60px oklch(0 0 0 / 0.5), 0 2px 6px oklch(0 0 0 / 0.3)',
		highlight: 'inset 0 1px 0 oklch(1 0 0 / 0.06)'
	},
	light: {
		sm: '0 1px 2px oklch(0.3 0.05 265 / 0.08)',
		md: '0 6px 18px oklch(0.3 0.05 265 / 0.12), 0 1px 2px oklch(0.3 0.05 265 / 0.08)',
		lg: '0 24px 60px oklch(0.25 0.05 265 / 0.22), 0 2px 6px oklch(0.3 0.05 265 / 0.1)',
		highlight: 'inset 0 1px 0 oklch(1 0 0 / 0.7)'
	}
};

/** Resolves a token value to the OKLCH text the CSS uses. */
export function toOklchText(value: ColorValue): string {
	if (typeof value === 'string') {
		return value.startsWith('oklch(') ? value : palette[value as PaletteName];
	}
	const [name, alpha] = value;
	return palette[name].replace(/\)$/, ` / ${alpha})`);
}
