/**
 * Test setup for jsdom: the browser APIs the components use and jsdom lacks. `matchMedia`
 * answers from `mediaState` (tests flip `prefers-color-scheme` and `prefers-reduced-motion` with
 * `setMedia`), and `ResizeObserver` and `IntersectionObserver` do nothing (jsdom has no layout). Components are unmounted after each test by
 * the testing library's own setup (`svelteTesting` in vite.config.ts).
 * @module
 */
import { afterEach } from 'vitest';

type Listener = (event: MediaQueryListEvent) => void;

const mediaState = new Map<string, boolean>();
const listeners = new Map<string, Set<Listener>>();

/** Sets whether a media query matches, and notifies its listeners. */
export function setMedia(query: string, matches: boolean): void {
	mediaState.set(query, matches);
	for (const listener of listeners.get(query) ?? []) {
		listener({ matches, media: query } as MediaQueryListEvent);
	}
}

window.matchMedia = (query: string): MediaQueryList => {
	const set = listeners.get(query) ?? new Set<Listener>();
	listeners.set(query, set);
	return {
		media: query,
		get matches() {
			return mediaState.get(query) ?? false;
		},
		onchange: null,
		addEventListener: (_type: string, listener: Listener) => set.add(listener),
		removeEventListener: (_type: string, listener: Listener) => set.delete(listener),
		addListener: (listener: Listener) => set.add(listener),
		removeListener: (listener: Listener) => set.delete(listener),
		dispatchEvent: () => true
	} as MediaQueryList;
};

globalThis.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};

globalThis.IntersectionObserver = class {
	readonly root = null;
	readonly rootMargin = '0px';
	readonly scrollMargin = '0px';
	readonly thresholds = [0];
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
};

afterEach(() => mediaState.clear());
