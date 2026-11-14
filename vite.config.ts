/**
 * Vite configuration of the docs site (the SvelteKit app in `src/routes`) and of the component
 * tests: Tailwind, SvelteKit, mingcute icons through unplugin-icons, and vitest running the
 * `*.test.ts` files in jsdom with Svelte's browser build.
 * @module
 */
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), Icons({ compiler: 'svelte' }), svelteTesting()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts', 'scripts/**/*.test.ts']
	}
});
