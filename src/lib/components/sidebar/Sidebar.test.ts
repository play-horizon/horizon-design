/**
 * Tests of `Sidebar`, `SidebarSection` and `SidebarItem`: the navigation landmark named by
 * `label`, holding the footer's entries too and not the header, the section named by its label,
 * links and buttons with `aria-current`, and the collapsed sidebar keeping its names and showing
 * each item's text as its tooltip.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import SidebarFixture from './Sidebar.test.svelte';

describe('Sidebar', () => {
	it('names its section and marks the current link', () => {
		const { getByRole } = render(SidebarFixture);
		expect(getByRole('navigation', { name: 'Main' })).toBeTruthy();
		expect(getByRole('group', { name: 'General' })).toBeTruthy();
		const home = getByRole('link', { name: 'Home' });
		expect(home.getAttribute('href')).toBe('/home');
		expect(home.getAttribute('aria-current')).toBe('page');
		const button = getByRole('button', { name: 'New game' });
		expect(button.getAttribute('type')).toBe('button');
		expect(button.hasAttribute('aria-current')).toBe(false);
	});

	it("holds the footer's entries in the navigation landmark, and not the header", () => {
		const { getByRole } = render(SidebarFixture);
		const navigation = within(getByRole('navigation', { name: 'Main' }));
		expect(navigation.getByRole('link', { name: 'Settings' })).toBeTruthy();
		expect(navigation.getByRole('link', { name: 'Home' })).toBeTruthy();
		expect(navigation.queryByText('Brand')).toBeNull();
		expect(within(getByRole('complementary')).getByText('Brand')).toBeTruthy();
	});

	it('keeps every name when collapsed', () => {
		const { getByRole } = render(SidebarFixture, { collapsed: true });
		expect(getByRole('complementary').getAttribute('data-collapsed')).toBe('true');
		expect(getByRole('group', { name: 'General' })).toBeTruthy();
		expect(getByRole('link', { name: 'Home' })).toBeTruthy();
	});

	it("shows an item's text as its tooltip only while collapsed", async () => {
		const user = userEvent.setup();
		const collapsed = render(SidebarFixture, { collapsed: true });
		await user.tab();
		const collapsedHome = collapsed.getByRole('link', { name: 'Home' });
		expect(document.activeElement).toBe(collapsedHome);
		await waitFor(() => {
			const id = collapsedHome.getAttribute('aria-describedby');
			expect(id && document.getElementById(id)?.textContent?.trim()).toBe('Home');
		});
		collapsed.unmount();

		const expanded = render(SidebarFixture);
		await user.tab();
		const home = expanded.getByRole('link', { name: 'Home' });
		expect(document.activeElement).toBe(home);
		// Ark opens a tooltip on focus at once: the expanded item's stays closed.
		expect(home.hasAttribute('aria-describedby')).toBe(false);
		expect(expanded.queryByRole('tooltip', { hidden: true })).toBeNull();
	});
});
