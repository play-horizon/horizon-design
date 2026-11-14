/**
 * Tests of `MenuGroup`: groups without an id of their own each get one, so each is named by its
 * own `MenuGroupLabel`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import MenuGroupFixture from './MenuGroup.test.svelte';

describe('MenuGroup', () => {
	it('is named by its own label', async () => {
		const { findByRole } = render(MenuGroupFixture);
		const account = await findByRole('group', { name: 'Account' });
		const game = await findByRole('group', { name: 'Game' });
		expect(account.querySelector('[role="menuitem"]')?.textContent?.trim()).toBe('Profile');
		expect(game.querySelector('[role="menuitem"]')?.textContent?.trim()).toBe('Publish');
	});
});
