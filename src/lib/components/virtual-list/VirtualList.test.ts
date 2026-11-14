/**
 * Tests of `VirtualList`: its window arithmetic, that it renders only the rows in view and the row
 * kept by `keepIndex`, and that a caller's scroll handler runs alongside its own.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import VirtualList from './VirtualList.svelte';
import { visibleRange } from './range';

describe('visibleRange', () => {
	it('covers the rows in view plus the overscan', () => {
		// Rows 20 to 24 intersect a 100 px view scrolled 400 px down, at 20 px a row.
		expect(
			visibleRange({
				count: 1000,
				itemHeight: 20,
				scrollTop: 400,
				viewportHeight: 100,
				overscan: 2
			})
		).toEqual({ start: 18, end: 27 });
	});

	it('clamps to the list', () => {
		expect(
			visibleRange({ count: 10, itemHeight: 20, scrollTop: 0, viewportHeight: 1000, overscan: 3 })
		).toEqual({ start: 0, end: 10 });
		expect(
			visibleRange({ count: 0, itemHeight: 20, scrollTop: 0, viewportHeight: 100, overscan: 3 })
		).toEqual({ start: 0, end: 0 });
	});
});

describe('VirtualList', () => {
	const items = Array.from({ length: 10_000 }, (_, i) => ({ id: `r${i}`, label: `Row ${i}` }));
	const row = createRawSnippet((item: () => { label: string }) => ({
		render: () => `<span class="row">${item().label}</span>`
	}));

	it('renders a window of rows, not the whole list, and moves it on scroll', async () => {
		const { container, getByText, queryByText } = render(VirtualList<(typeof items)[number]>, {
			items,
			itemHeight: 20,
			overscan: 2,
			key: (item) => item.id,
			row
		});
		// jsdom has no layout: an empty view shows only the overscan.
		expect(container.querySelectorAll('.row')).toHaveLength(2);
		expect(getByText('Row 0')).toBeTruthy();

		const viewport = container.querySelector<HTMLElement>('[data-slot="virtual-list"]');
		if (!viewport) throw new Error('no viewport');
		viewport.scrollTop = 2000;
		await fireEvent.scroll(viewport);
		expect(queryByText('Row 0')).toBeNull();
		expect(getByText('Row 100')).toBeTruthy();
		expect(container.querySelectorAll('.row').length).toBeLessThan(10);
	});

	it('keeps the row at keepIndex rendered, in list order, once scrolled out of view', async () => {
		const { container, getByText } = render(VirtualList<(typeof items)[number]>, {
			items,
			itemHeight: 20,
			overscan: 2,
			keepIndex: 1,
			key: (item) => item.id,
			row
		});
		const viewport = container.querySelector<HTMLElement>('[data-slot="virtual-list"]');
		if (!viewport) throw new Error('no viewport');
		viewport.scrollTop = 2000;
		await fireEvent.scroll(viewport);
		// Scrolled to row 100 with an empty view: rows 98 to 101 (2 rows of overscan on each side),
		// with row 1 before them.
		expect([...container.querySelectorAll('.row')].map((r) => r.textContent)).toEqual([
			'Row 1',
			'Row 98',
			'Row 99',
			'Row 100',
			'Row 101'
		]);
		expect(getByText('Row 1').parentElement?.style.transform).toBe('translateY(20px)');
	});

	it("calls the caller's onscroll and still moves the window", async () => {
		const onscroll = vi.fn();
		const { container, getByText } = render(VirtualList<(typeof items)[number]>, {
			items,
			itemHeight: 20,
			key: (item) => item.id,
			row,
			onscroll
		});
		const viewport = container.querySelector<HTMLElement>('[data-slot="virtual-list"]');
		if (!viewport) throw new Error('no viewport');
		viewport.scrollTop = 2000;
		await fireEvent.scroll(viewport);
		expect(onscroll).toHaveBeenCalledOnce();
		expect(getByText('Row 100')).toBeTruthy();
	});
});
