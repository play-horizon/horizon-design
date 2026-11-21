/**
 * Tests of `AssetCard`: its name, its kind and its separate actions; a link with `href`, a button
 * with `onclick`, a toggle only when `selectable`, and a plain display with none of them.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import AssetCard from './AssetCard.svelte';

const add = createRawSnippet(() => ({
	render: () => '<button type="button">Add to my assets</button>'
}));

describe('AssetCard', () => {
	it('shows the kind and reports a choice, with its action apart', async () => {
		const onclick = vi.fn();
		const { getByRole, getByText } = render(AssetCard, {
			name: 'Sunset sky',
			kind: 'Sky',
			onclick,
			selectable: true,
			selected: true,
			actions: add
		});
		const card = getByRole('button', { name: 'Sunset sky' });
		expect(card.getAttribute('aria-pressed')).toBe('true');
		expect(getByText('Sky')).toBeTruthy();
		expect(card.contains(getByRole('button', { name: 'Add to my assets' }))).toBe(false);
		await fireEvent.click(card);
		expect(onclick).toHaveBeenCalledOnce();
	});

	it('is a toggle that says when it is not chosen, only when selectable', () => {
		const toggle = render(AssetCard, {
			name: 'Ice floor',
			kind: 'Texture',
			onclick: vi.fn(),
			selectable: true
		});
		expect(toggle.getByRole('button', { name: 'Ice floor' }).getAttribute('aria-pressed')).toBe(
			'false'
		);
		toggle.unmount();
		const action = render(AssetCard, { name: 'Ice floor', kind: 'Texture', onclick: vi.fn() });
		expect(action.getByRole('button', { name: 'Ice floor' }).hasAttribute('aria-pressed')).toBe(
			false
		);
	});

	it('is a link with href', () => {
		const { getByRole, container } = render(AssetCard, {
			name: 'Sunset sky',
			kind: 'Sky',
			href: '/store/sunset-sky'
		});
		expect(getByRole('link', { name: 'Sunset sky' }).getAttribute('href')).toBe(
			'/store/sunset-sky'
		);
		expect(
			container.querySelector('[data-slot="asset-card"]')?.hasAttribute('data-interactive')
		).toBe(true);
	});

	it('is a plain display without href or onclick: no link, no button, no hover', () => {
		const { queryByRole, getByText, container } = render(AssetCard, {
			name: 'Sunset sky',
			kind: 'Sky'
		});
		expect(queryByRole('button')).toBeNull();
		expect(queryByRole('link')).toBeNull();
		expect(getByText('Sunset sky')).toBeTruthy();
		const card = container.querySelector('[data-slot="asset-card"]');
		expect(card?.hasAttribute('data-interactive')).toBe(false);
		expect(card?.classList.contains('hover:bg-hover')).toBe(false);
	});
});
