/**
 * SvelteKit configuration of the docs site and of `svelte-package`, passed to the `sveltekit()`
 * Vite plugin (vite.config.ts) and to the Svelte ESLint parser (eslint.config.js): runes mode
 * everywhere, the static adapter (the docs site is prerendered for GitHub Pages under
 * `BASE_PATH`), and the CSS inlined into the pages.
 * @module
 */
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit/vite').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	adapter: adapter(),
	paths: {
		base: /** @type {'' | `/${string}`} */ (process.env.BASE_PATH ?? '')
	},
	// Inline all CSS into the HTML so the first paint does not wait on stylesheet requests.
	inlineStyleThreshold: Infinity
};

export default config;
