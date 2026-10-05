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
		inlineStyleThreshold: Infinity
	}
};

export default config;
