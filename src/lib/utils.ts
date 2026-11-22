/**
 * `cn`, the class helper every component uses: `clsx` to build a class string from conditions,
 * then `tailwind-merge` to let later classes override earlier ones (a caller's `class` overrides
 * the component's own), taught horizon-design's own theme values.
 * @module
 */
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge, validators } from 'tailwind-merge';

// Theme values tailwind-merge can't recognise on its own: without them, `text-display` would
// count as a text colour and replace `text-fg`, `h-control-md` wouldn't yield to `h-8`, and a
// caller's `animate-zoom-in` wouldn't replace a component's `animate-fade-in`. Every `animate-*`
// and `ease-*` class sets one property only, so any name of the theme is one of them.
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			text: ['display-sm', 'display', 'display-lg'],
			'inset-shadow': ['highlight'],
			spacing: ['control-xs', 'control-sm', 'control-md', 'control-lg'],
			animate: [validators.isAny],
			ease: [validators.isAny]
		}
	}
});

/**
 * Joins classes, later ones overriding conflicting earlier ones.
 *
 * @example
 * cn('text-muted px-2', active && 'text-fg'); // 'px-2 text-fg' when active
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
