/**
 * Tests of `Pagination`: the page links and their names, Ark's `defaultPage`, an `onPageChange`
 * of the app running without breaking the bound `page`, `children` composed from the parts in
 * place of the built-in controls, and the built-in arrows showing their names as tooltips.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Pagination from './Pagination.svelte';
import PaginationFixture from './Pagination.test.svelte';

/** Hovers `button` and returns the text of the tooltip that opens and describes it. */
async function hoverTooltip(button: HTMLElement): Promise<string | undefined> {
	await fireEvent.pointerMove(button, { pointerType: 'mouse' });
	await waitFor(() => expect(button.getAttribute('aria-describedby')).toBeTruthy());
	return document
		.getElementById(button.getAttribute('aria-describedby') ?? '')
		?.textContent?.trim();
}

const translations = {
	rootLabel: 'Pages',
	prevTriggerLabel: 'Previous page',
	nextTriggerLabel: 'Next page',
	itemLabel: ({ page }: { page: number }) => `Page ${page}`
};

function currentPage(container: HTMLElement): string | undefined {
	return container.querySelector('[aria-current="page"]')?.textContent?.trim();
}

describe('Pagination', () => {
	it('starts from defaultPage, with the pages around it and ellipses', () => {
		const { container, getByRole, getAllByRole } = render(Pagination, {
			count: 100,
			defaultPage: 5,
			translations
		});
		expect(currentPage(container)).toBe('5');
		const names = getAllByRole('button').map((button) => button.getAttribute('aria-label'));
		expect(names).toEqual([
			'Previous page',
			'Page 1',
			'Page 4',
			'Page 5',
			'Page 6',
			'Page 10',
			'Next page'
		]);
		expect(container.textContent?.match(/…/g)).toHaveLength(2);
		expect(getByRole('navigation', { name: 'Pages' })).toBeTruthy();
	});

	it('keeps the page in step with an onPageChange of the app', async () => {
		const onPageChange = vi.fn();
		let bound = 1;
		const { getByRole } = render(Pagination, {
			count: 100,
			// An accessor pair is how Svelte passes `bind:page`.
			get page() {
				return bound;
			},
			set page(next: number) {
				bound = next;
			},
			onPageChange,
			translations
		});
		await fireEvent.click(getByRole('button', { name: 'Next page' }));
		expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));
		expect(bound).toBe(2);
	});

	it('composes the parts given as children in place of the built-in controls', async () => {
		const { getByRole, getAllByRole, getByTestId } = render(PaginationFixture);
		expect(getByRole('navigation', { name: 'Pages' })).toBeTruthy();
		expect(getAllByRole('button').map((button) => button.getAttribute('aria-label'))).toEqual([
			'Previous page',
			'Next page'
		]);
		expect(getByTestId('position').textContent).toBe('1 of 3');
		await fireEvent.click(getByRole('button', { name: 'Next page' }));
		expect(getByTestId('position').textContent).toBe('2 of 3');
	});

	it('shows the built-in arrows by their names as tooltips', async () => {
		const { getByRole } = render(Pagination, { count: 100, defaultPage: 5, translations });
		const previous = getByRole('button', { name: 'Previous page' });
		expect(await hoverTooltip(previous)).toBe('Previous page');
		expect(await hoverTooltip(getByRole('button', { name: 'Next page' }))).toBe('Next page');
	});
});
