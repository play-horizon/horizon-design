/**
 * The theme controller shared by every app: the chosen mode (system, dark or light), saved in
 * `localStorage`, and the resolved theme, which follows the OS reactively while the mode is
 * system. The resolved theme is applied as `data-theme` on `<html>`; changing the mode crossfades
 * the whole page.
 *
 * Apps call `theme.initialize()` once in the root layout, and set `data-theme` before the first paint
 * with the inline script the README gives, so the page never flashes the other theme.
 * @module
 */
import { flushSync } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import type { Theme } from './generated/tokens';
import { crossfadePage } from './motion/page-transition';

/** The user's choice: follow the OS, or one theme. */
export type ThemeMode = 'system' | 'dark' | 'light';

/** Options of `theme.initialize()`. */
export interface ThemeInitializeOptions {
	/**
	 * Blocks the browser's own context menu on the whole page, for desktop apps that show only
	 * their own menus. Off by default.
	 */
	blockContextMenu?: boolean;
}

/** The `localStorage` key that holds the mode; the README's pre-paint script reads it too. */
export const THEME_STORAGE_KEY = 'horizon-theme';

const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

function isThemeMode(value: unknown): value is ThemeMode {
	return value === 'system' || value === 'dark' || value === 'light';
}

function storedMode(): ThemeMode {
	try {
		const value = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemeMode(value) ? value : 'system';
	} catch {
		// No storage (server rendering, or storage disabled): follow the OS.
		return 'system';
	}
}

function saveMode(mode: ThemeMode): void {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, mode);
	} catch {
		// Storage disabled: the choice lasts until the page is closed.
	}
}

function applyTheme(resolved: Theme): void {
	document.documentElement.dataset.theme = resolved;
}

/** The theme state; use the shared `theme` instance. */
class ThemeController {
	#mode = $state<ThemeMode>(storedMode());

	// Server rendering has no OS theme: dark, the default theme, stands in for it.
	#systemDark = new MediaQuery(SYSTEM_DARK_QUERY, true);

	#stopInitialize: (() => void) | undefined;

	/** The chosen mode (reactive). Change it with `set`, which saves it and crossfades the page. */
	get mode(): ThemeMode {
		return this.#mode;
	}

	/** The theme in effect: the mode, or the OS theme while the mode is system (reactive). */
	get resolved(): Theme {
		if (this.#mode !== 'system') return this.#mode;
		return this.#systemDark.current ? 'dark' : 'light';
	}

	/**
	 * Applies the theme to `<html>` and keeps it in step with the OS while the mode is system.
	 * Call it in the browser, from the root layout. Returns a function that removes the listeners
	 * it added. Calling it again replaces the previous call's listeners, so the page is never
	 * listened to twice and the latest `blockContextMenu` applies.
	 */
	initialize({ blockContextMenu = false }: ThemeInitializeOptions = {}): () => void {
		this.#stopInitialize?.();
		applyTheme(this.resolved);
		const systemDark = matchMedia(SYSTEM_DARK_QUERY);
		const followSystem = () => {
			if (this.#mode === 'system') applyTheme(systemDark.matches ? 'dark' : 'light');
		};
		// Its own function on each call: a listener added twice is added once, so a shared one
		// would be removed by an earlier call's stop.
		const blockMenu = (event: Event) => event.preventDefault();
		systemDark.addEventListener('change', followSystem);
		if (blockContextMenu) window.addEventListener('contextmenu', blockMenu);
		const stop = () => {
			systemDark.removeEventListener('change', followSystem);
			window.removeEventListener('contextmenu', blockMenu);
			if (this.#stopInitialize === stop) this.#stopInitialize = undefined;
		};
		this.#stopInitialize = stop;
		return stop;
	}

	/** Saves the mode and crossfades the page into the theme it resolves to. */
	set(mode: ThemeMode): Promise<void> {
		saveMode(mode);
		return crossfadePage(() => {
			this.#mode = mode;
			// Update the components that show the mode inside the new snapshot.
			flushSync();
			applyTheme(this.resolved);
		});
	}
}

/** The app's theme. */
export const theme = new ThemeController();
