/**
 * Tests of the theme controller: the theme applied to `<html>`, the OS theme followed while the
 * mode is system, the mode saved, the context-menu block being opt-in, and a repeated `initialize`
 * replacing the listeners of the call before.
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
		stop = theme.initialize();
		expect(theme.resolved).toBe('dark');
		expect(document.documentElement.dataset.theme).toBe('dark');

		setMedia(DARK, false);
		expect(theme.resolved).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('keeps a chosen theme whatever the OS does, and saves the mode', async () => {
		setMedia(DARK, true);
		stop = theme.initialize();
		await theme.set('light');
		expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');

		setMedia(DARK, false);
		setMedia(DARK, true);
		expect(theme.resolved).toBe('light');
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('leaves the context menu alone by default', () => {
		stop = theme.initialize();
		const event = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(false);
	});

	it('blocks the context menu when asked, until stopped', () => {
		stop = theme.initialize({ blockContextMenu: true });
		const blocked = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(blocked);
		expect(blocked.defaultPrevented).toBe(true);

		stop();
		stop = undefined;
		const after = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(after);
		expect(after.defaultPrevented).toBe(false);
	});

	it('replaces the listeners of an earlier initialize, whose stop leaves the new ones alone', () => {
		const first = theme.initialize({ blockContextMenu: true });
		stop = theme.initialize({ blockContextMenu: true });
		first();
		const event = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it('lifts the block of an earlier initialize that asked for it', () => {
		theme.initialize({ blockContextMenu: true });
		stop = theme.initialize();
		const event = new MouseEvent('contextmenu', { cancelable: true });
		window.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(false);
	});
});
