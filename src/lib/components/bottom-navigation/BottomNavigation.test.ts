/**
 * Tests of `BottomNavigation`: a named landmark whose active item is the current page.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import BottomNavigation from './BottomNavigation.svelte';

describe('BottomNavigation', () => {
	it('is named and marks the active item as the current page', () => {
		const { getByRole } = render(BottomNavigation, {
			label: 'Main',
			items: [
				{ label: 'Home', href: '/', active: true },
				{ label: 'Search', href: '/search' }
			]
		});
		expect(getByRole('navigation', { name: 'Main' })).toBeTruthy();
		expect(getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBe('page');
		expect(getByRole('link', { name: 'Search' }).getAttribute('aria-current')).toBeNull();
	});
});
