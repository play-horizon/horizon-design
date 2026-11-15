/**
 * Tests of `AssetCard`: its name, its kind, its selected state and its separate actions.
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

	it('is a toggle that says when it is not chosen', () => {
		const { getByRole } = render(AssetCard, {
			name: 'Ice floor',
			kind: 'Texture',
			onclick: vi.fn()
		});
		expect(getByRole('button', { name: 'Ice floor' }).getAttribute('aria-pressed')).toBe('false');
	});
});
