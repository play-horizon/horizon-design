/**
 * Tests of `ThemeSwitch`: its labelled buttons, the pressed mode, and choosing a theme.
 * @module
 */
import { afterEach, describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import ThemeSwitch from './ThemeSwitch.svelte';
import { theme } from '#lib/theme.svelte.js';

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
		expect(getByRole('button', { name: 'Light' }).getAttribute('aria-pressed')).toBe('true');
		expect(getByRole('button', { name: 'System' }).getAttribute('aria-pressed')).toBe('false');
		expect(document.documentElement.dataset.theme).toBe('light');
	});
});
