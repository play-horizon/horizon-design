/**
 * Tests of `Drawer`: its title and description name and describe it, and its close button is
 * named.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Drawer from './Drawer.svelte';

describe('Drawer', () => {
	it('is named by its title and described by its description', async () => {
		const { findByRole } = render(Drawer, {
			open: true,
			title: 'Filters',
			description: 'Narrow the list of games.',
			closeLabel: 'Close'
		});
		const drawer = await findByRole('dialog', { name: 'Filters' });
		const describedBy = drawer.getAttribute('aria-describedby') ?? '';
		expect(document.getElementById(describedBy)?.textContent?.trim()).toBe(
			'Narrow the list of games.'
		);
		expect(await findByRole('button', { name: 'Close' })).toBeTruthy();
	});
});
