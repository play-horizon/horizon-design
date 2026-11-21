/**
 * Tests of `Kbd`: a plain key shows its name; the command key shows ⌘ on Apple's platforms and
 * Ctrl elsewhere, as an attribute set once mounted, with both labels always in the markup.
 * @module
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import Kbd from './Kbd.svelte';

const command = { apple: 'Command', other: 'Ctrl' };

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Kbd', () => {
	it('shows a plain key', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>K</span>' }));
		const { container } = render(Kbd, { children });
		expect(container.querySelector('kbd')?.textContent?.trim()).toBe('K');
	});

	it('is the ⌘ key on an Apple platform', () => {
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15'
		);
		const { container } = render(Kbd, { command });
		const key = container.querySelector('kbd');
		expect(key?.dataset.platform).toBe('apple');
		expect(key?.querySelector('svg')).toBeTruthy();
		expect(key?.textContent).toContain('Command');
	});

	it('is Ctrl elsewhere, and keeps both labels so its size never changes', () => {
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
		);
		const { container } = render(Kbd, { command });
		const key = container.querySelector('kbd');
		expect(key?.dataset.platform).toBe('other');
		expect(key?.textContent).toContain('Ctrl');
		expect(key?.textContent).toContain('Command');
	});
});
