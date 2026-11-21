/**
 * Tests of `ScrollArea`: the scrollbar keeps 8 px (Tailwind's `py-2`) from the region's top and
 * bottom, the viewport is a region named by `label`, and it is a tab stop only while its content
 * overflows (the layout stubbed: jsdom has none).
 * @module
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import ScrollArea from './ScrollArea.svelte';

/**
 * Makes every element `contentHeight` tall inside a `viewportHeight` box, 300 px wide, and every
 * `ResizeObserver` report its element at once, as a browser does on `observe`.
 */
function layOut(contentHeight: number, viewportHeight: number) {
	vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(contentHeight);
	vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(viewportHeight);
	// Ark measures nothing while the width is 0, as it always is in jsdom.
	vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(300);
	vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
	vi.stubGlobal(
		'ResizeObserver',
		class {
			constructor(private readonly report: ResizeObserverCallback) {}
			observe(target: Element) {
				this.report([{ target } as ResizeObserverEntry], this as unknown as ResizeObserver);
			}
			unobserve() {}
			disconnect() {}
		}
	);
}

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

describe('ScrollArea', () => {
	it('insets its scrollbar, and is a region named by its label', () => {
		const { container, getByRole } = render(ScrollArea, { class: 'h-52', label: 'Players' });
		const scrollbar = container.querySelector('[data-slot="scroll-area-scrollbar"]');
		expect(scrollbar?.classList.contains('py-2')).toBe(true);
		expect(getByRole('region', { name: 'Players' }).dataset.slot).toBe('scroll-area-viewport');
	});

	it('is a tab stop while its content overflows', async () => {
		layOut(800, 200);
		const { getByRole } = render(ScrollArea, { class: 'h-52', label: 'Players' });
		await waitFor(() =>
			expect(getByRole('region', { name: 'Players' }).getAttribute('tabindex')).toBe('0')
		);
	});

	it('is no tab stop while its content fits', async () => {
		layOut(200, 200);
		const { getByRole } = render(ScrollArea, { class: 'h-52', label: 'Players' });
		const region = getByRole('region', { name: 'Players' });
		// Ark has measured (it sets these once it has), and found nothing to scroll.
		await waitFor(() =>
			expect(region.style.getPropertyValue('--scroll-area-overflow-y-end')).not.toBe('')
		);
		expect(region.getAttribute('tabindex')).toBe('-1');
	});
});
