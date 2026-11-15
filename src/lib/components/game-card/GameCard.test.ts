/**
 * Tests of `GameCard`: the card's link or button carries the game's name, and its controls stay
 * outside the link.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import GameCard from './GameCard.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
const play = createRawSnippet(() => ({ render: () => '<button type="button">Play</button>' }));

describe('GameCard', () => {
	it('links to the game by its name, with the meta line', () => {
		const { getByRole, getByText } = render(GameCard, {
			name: 'Skyline Obby',
			href: '/games/skyline',
			meta: text('obby · platformer')
		});
		expect(getByRole('link', { name: 'Skyline Obby' }).getAttribute('href')).toBe('/games/skyline');
		expect(getByText('obby · platformer')).toBeTruthy();
	});

	it('keeps its action outside the link, as its own button', async () => {
		const onclick = vi.fn();
		const { getByRole } = render(GameCard, {
			name: 'Neon Drift',
			variant: 'feature',
			onclick,
			action: play
		});
		const card = getByRole('button', { name: 'Neon Drift' });
		const action = getByRole('button', { name: 'Play' });
		expect(card.contains(action)).toBe(false);
		await fireEvent.click(card);
		expect(onclick).toHaveBeenCalledOnce();
	});
});
