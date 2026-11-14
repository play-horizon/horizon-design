/**
 * Page motion through the View Transitions API: the theme crossfade (used by `theme.set`) and the
 * navigation slide the apps start when they change screens. The animations themselves are CSS
 * (`styles/motion.css`, 0.32 s). Both skip the transition, and just apply the change, when the
 * browser has no View Transitions or the system asks for reduced motion.
 * @module
 */

/** The direction of travel of a navigation: forward slides the new screen in from the end. */
export type SlideDirection = 'forward' | 'backward';

let activeSlide: ViewTransition | null = null;
let activeCrossfade: ViewTransition | null = null;

/** Whether the system asks for reduced motion (false where there is no `matchMedia`). */
export function prefersReducedMotion(): boolean {
	return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function canTransition(): boolean {
	return (
		typeof document !== 'undefined' &&
		typeof document.startViewTransition === 'function' &&
		!prefersReducedMotion()
	);
}

/**
 * Crossfades the whole page into the state `update` produces (synchronously). Other CSS
 * transitions are frozen meanwhile (`data-crossfade` on `<html>`), so the crossfade is the only
 * motion. Resolves when the crossfade has finished.
 */
export async function crossfadePage(update: () => void): Promise<void> {
	if (!canTransition()) {
		update();
		return;
	}
	const root = document.documentElement;
	root.dataset.crossfade = '';
	const transition = document.startViewTransition(update);
	activeCrossfade = transition;
	try {
		await transition.finished;
	} finally {
		// A newer crossfade may have started meanwhile: leave its freeze in place.
		if (activeCrossfade === transition) {
			activeCrossfade = null;
			delete root.dataset.crossfade;
		}
	}
}

/**
 * Slides the element marked `data-slide-region` out and its new content in, in the direction of
 * travel. `update` changes the page (it may be async, such as a SvelteKit navigation); the
 * returned promise resolves once `update` has run, and the slide goes on after it.
 *
 * In SvelteKit, start it from `onNavigate`:
 *
 * @example
 * onNavigate((navigation) => {
 *   const direction = directionOf(navigation); // the app's own order of screens
 *   return new Promise((resolve) => {
 *     slidePage(direction, async () => {
 *       resolve();
 *       // A failed or cancelled navigation is SvelteKit's to report; the slide just ends.
 *       await navigation.complete.catch(() => {});
 *     });
 *   });
 * });
 */
export async function slidePage(
	direction: SlideDirection,
	update: () => void | Promise<void>
): Promise<void> {
	if (!canTransition()) {
		await update();
		return;
	}
	const root = document.documentElement;
	root.dataset.slide = direction;
	const transition = document.startViewTransition(update);
	activeSlide = transition;
	const clear = () => {
		// A newer slide may have started meanwhile: leave its direction in place.
		if (activeSlide !== transition) return;
		activeSlide = null;
		delete root.dataset.slide;
	};
	// `finished` rejects when `update` does; that error reaches the caller through
	// `updateCallbackDone`, so here it only clears the direction.
	transition.finished.then(clear, clear);
	await transition.updateCallbackDone;
}
