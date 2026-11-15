/**
 * Tests of `Breadcrumb`: a named trail whose pages are links but the last, the current page.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Breadcrumb from './Breadcrumb.svelte';

describe('Breadcrumb', () => {
	it('marks only the last page as the current one', () => {
		const { getByRole, getAllByRole, getByText } = render(Breadcrumb, {
			label: 'Breadcrumb',
			items: [{ label: 'Home', href: '/' }, { label: 'Games' }, { label: 'Skyline' }]
		});
		expect(getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
		expect(getAllByRole('link').map((link) => link.textContent?.trim())).toEqual(['Home']);
		expect(getByText('Games').getAttribute('aria-current')).toBeNull();
		expect(getByText('Skyline').getAttribute('aria-current')).toBe('page');
	});
});
