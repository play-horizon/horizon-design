/**
 * Tests of `Drawer`: its title and description name and describe it, its close button is named,
 * and it is swiped toward the right edge it slides in from.
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

	it('is swiped toward the right edge it slides in from', async () => {
		const { findByRole } = render(Drawer, { open: true, title: 'Filters', closeLabel: 'Close' });
		const drawer = await findByRole('dialog', { name: 'Filters' });
		expect(drawer.dataset.swipeDirection).toBe('right');
	});
});
