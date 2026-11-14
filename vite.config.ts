/**
 * Vite configuration of the docs site (the SvelteKit app in `src/routes`) and of the component
 * tests: Tailwind, SvelteKit, mingcute icons through unplugin-icons, and vitest running the
 * `*.test.ts` files in jsdom with Svelte's browser build (`src/test/setup.ts` fills in the browser APIs
 * jsdom lacks).
 * @module
 */
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import sveltekitConfig from './sveltekit.config.js';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(sveltekitConfig),
		Icons({ compiler: 'svelte' }),
		svelteTesting()
	],
	// pragmatic-drag-and-drop has no `exports` map, so Node's ESM loader refuses its directory
	// imports when the prerender leaves it external: bundle it into the server build instead.
	ssr: {
		noExternal: ['@atlaskit/pragmatic-drag-and-drop', '@atlaskit/pragmatic-drag-and-drop-hitbox']
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
		setupFiles: ['src/test/setup.ts']
	}
});
