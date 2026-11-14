/**
 * Tests of `Sidebar`, `SidebarSection` and `SidebarItem`: the navigation landmark, the section
 * named by its label, links and buttons with `aria-current`, and the collapsed sidebar keeping its
 * names.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SidebarFixture from './Sidebar.test.svelte';

describe('Sidebar', () => {
	it('names its section and marks the current link', () => {
		const { getByRole } = render(SidebarFixture);
		expect(getByRole('navigation')).toBeTruthy();
		expect(getByRole('group', { name: 'General' })).toBeTruthy();
		const home = getByRole('link', { name: 'Home' });
		expect(home.getAttribute('href')).toBe('/home');
		expect(home.getAttribute('aria-current')).toBe('page');
		const button = getByRole('button', { name: 'New game' });
		expect(button.getAttribute('type')).toBe('button');
		expect(button.hasAttribute('aria-current')).toBe(false);
	});

	it('keeps every name when collapsed', () => {
		const { getByRole } = render(SidebarFixture, { collapsed: true });
		expect(getByRole('complementary').getAttribute('data-collapsed')).toBe('true');
		expect(getByRole('group', { name: 'General' })).toBeTruthy();
		expect(getByRole('link', { name: 'Home' })).toBeTruthy();
	});
});
