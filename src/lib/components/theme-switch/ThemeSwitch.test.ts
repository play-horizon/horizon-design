/**
 * Tests of `ThemeSwitch`: its labelled buttons, the pressed mode, and choosing a theme: the
 * highlight moves at once and the theme follows once it has slid, or at once under reduced motion.
 * @module
 */
import { afterEach, describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { expectTooltip } from '../../../test/tooltip';
import ThemeSwitch from './ThemeSwitch.svelte';
import { theme } from '#lib/theme.svelte.js';
import { setMedia } from '../../../test/setup';

const labels = { group: 'Theme', system: 'System', dark: 'Dark', light: 'Light' };

afterEach(async () => {
	await theme.set('system');
	localStorage.clear();
});

describe('ThemeSwitch', () => {
	it('presses the chosen mode and applies the theme', async () => {
		const { getByRole } = render(ThemeSwitch, { labels });
		expect(getByRole('group', { name: 'Theme' })).toBeTruthy();
		expect(getByRole('button', { name: 'System' }).getAttribute('aria-pressed')).toBe('true');

		await fireEvent.click(getByRole('button', { name: 'Light' }));
		// The highlight moves at once; the theme follows once it has slid.
		expect(getByRole('button', { name: 'Light' }).getAttribute('aria-pressed')).toBe('true');
		expect(getByRole('button', { name: 'System' }).getAttribute('aria-pressed')).toBe('false');
		expect(document.documentElement.dataset.theme).not.toBe('light');
		await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'));
		expect(theme.mode).toBe('light');
		expect(getByRole('group').querySelector('[data-slot="theme-switch-indicator"]')).toBeTruthy();
	});

	it('shows the name of each mode in a tooltip, the same as its accessible name', async () => {
		const { getByRole } = render(ThemeSwitch, { labels });
		await expectTooltip(getByRole('button', { name: 'Dark' }), 'Dark');
	});

	it('applies the theme at once under reduced motion, with nothing to slide', async () => {
		setMedia('(prefers-reduced-motion: reduce)', true);
		const { getByRole } = render(ThemeSwitch, { labels });
		await fireEvent.click(getByRole('button', { name: 'Dark' }));
		expect(theme.mode).toBe('dark');
	});

	it('keeps a second choice highlighted while the first one still crossfades', async () => {
		// A crossfade that lasts 400 ms, as a view transition of the page would.
		const startViewTransition = (update: () => void) => {
			update();
			const finished = new Promise<void>((done) => setTimeout(done, 400));
			return { finished, ready: Promise.resolve(), updateCallbackDone: Promise.resolve() };
		};
		Object.assign(document, { startViewTransition });
		try {
			const { getByRole } = render(ThemeSwitch, { labels });
			const pressed = () =>
				['System', 'Dark', 'Light'].filter(
					(name) => getByRole('button', { name }).getAttribute('aria-pressed') === 'true'
				);
			await fireEvent.click(getByRole('button', { name: 'Light' }));
			// The first theme change starts once the highlight has slid (200 ms), then crossfades until
			// 600 ms; Dark is chosen at 450 ms, and its own change waits for its slide, until 650 ms.
			await new Promise((done) => setTimeout(done, 450));
			await fireEvent.click(getByRole('button', { name: 'Dark' }));
			for (let step = 0; step < 8; step++) {
				expect(pressed()).toEqual(['Dark']);
				await new Promise((done) => setTimeout(done, 40));
			}
			await waitFor(() => expect(theme.mode).toBe('dark'));
		} finally {
			Reflect.deleteProperty(document, 'startViewTransition');
		}
	});
});
