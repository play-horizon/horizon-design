/**
 * Tests of the theme controller: the theme applied to `<html>`, the OS theme followed while the
 * mode is system, the mode saved, and the context-menu block being opt-in.
 * @module
 */
import { afterEach, describe, expect, it } from 'vitest';
import { setMedia } from '../test/setup';
import { theme, THEME_STORAGE_KEY } from './theme.svelte';

const DARK = '(prefers-color-scheme: dark)';
let stop: (() => void) | undefined;

afterEach(async () => {
	stop?.();
	stop = undefined;
	await theme.set('system');
	localStorage.clear();
});

describe('theme', () => {
	it('applies the OS theme while the mode is system, and follows it', () => {
		setMedia(DARK, true);
		stop = theme.init();
		expect(theme.resolved).toBe('dark');
		expect(document.documentElement.dataset.theme).toBe('dark');

		setMedia(DARK, false);
		expect(theme.resolved).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('keeps a chosen theme whatever the OS does, and saves the mode', async () => {
		setMedia(DARK, true);
		stop = theme.init();
		await theme.set('light');
		expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');

		setMedia(DARK, false);
		setMedia(DARK, true);
		expect(theme.resolved).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('leaves the context menu alone by default', () => {
		stop = theme.init();
		const event = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(false);
	});

	it('blocks the context menu when asked, until stopped', () => {
		stop = theme.init({ blockContextMenu: true });
		const blocked = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(blocked);
		expect(blocked.defaultPrevented).toBe(true);

		stop();
		stop = undefined;
		const after = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(after);
		expect(after.defaultPrevented).toBe(false);
	});
});
