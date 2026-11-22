/**
 * Tests of `GameCard`: the card's link or button carries the game's name, its controls stay
 * outside the link, and with neither `href` nor `onclick` it is a plain display.
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

	it('is a plain display with neither href nor onclick, in both variants', () => {
		for (const variant of ['default', 'feature'] as const) {
			const { container, getByText, unmount } = render(GameCard, {
				name: 'Quiet Woods',
				variant,
				meta: text('Developer')
			});
			expect(getByText('Quiet Woods').tagName).toBe('SPAN');
			expect(getByText('Developer')).toBeTruthy();
			expect(container.querySelector('a, button, [tabindex]')).toBeNull();
			expect(container.innerHTML).not.toContain('group-hover:');
			expect(container.querySelector('[data-interactive]')).toBeNull();
			unmount();
		}
	});

	it('lifts on hover, and is marked interactive, when it leads somewhere', () => {
		for (const target of [{ href: '/games/neon' }, { onclick: vi.fn() }]) {
			const { container, unmount } = render(GameCard, { name: 'Neon Drift', ...target });
			expect(container.innerHTML).toContain('group-hover:-translate-y-0.5');
			expect(container.querySelector('[data-interactive]')).not.toBeNull();
			unmount();
		}
	});
});
