/**
 * SvelteKit configuration of the docs site and of `svelte-package`: runes mode everywhere, the
 * static adapter (the docs site is prerendered for GitHub Pages under `BASE_PATH`), and the build
 * scripts included in type checking.
 * @module
 */
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		paths: {
			base: /** @type {'' | `/${string}`} */ (process.env.BASE_PATH ?? '')
		},
		// Inline all CSS into the HTML so the first paint does not wait on stylesheet requests.
		inlineStyleThreshold: Infinity,
		typescript: {
			// Type-check the build scripts (the token generator) with the rest of the project.
			config: (config) => {
				config.include.push('../scripts/**/*.ts');
			}
		}
	}
};

export default config;
