/**
 * Tests of `ThumbCard`: a link with `href`, a button with `onclick`, and a plain display with
 * neither (no hover).
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import ThumbCard from './ThumbCard.svelte';

describe('ThumbCard', () => {
	it('is a link with href, and a button with onclick', async () => {
		const link = render(ThumbCard, { label: 'Buttons', href: '/button' });
		expect(link.getByRole('link', { name: 'Buttons' }).getAttribute('href')).toBe('/button');
		link.unmount();
		const onclick = vi.fn();
		const { getByRole } = render(ThumbCard, { label: 'Buttons', onclick });
		await fireEvent.click(getByRole('button', { name: 'Buttons' }));
		expect(onclick).toHaveBeenCalledOnce();
	});

	it('is a plain display with neither', () => {
		const { container, queryByRole } = render(ThumbCard, { label: 'Buttons' });
		expect(queryByRole('link')).toBeNull();
		expect(queryByRole('button')).toBeNull();
		const card = container.querySelector('[data-slot="thumb-card"]');
		expect(card?.hasAttribute('data-interactive')).toBe(false);
		expect(card?.className).not.toContain('hover:shadow-lg');
	});
});
