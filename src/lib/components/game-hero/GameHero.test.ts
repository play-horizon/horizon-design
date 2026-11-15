/**
 * Tests of `GameHero`: it heads the page with the game's name, with its byline and tags.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import GameHero from './GameHero.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('GameHero', () => {
	it('heads the page with the game name and shows its byline and tags', () => {
		const { getByRole, getByText } = render(GameHero, {
			name: 'Skyline Obby',
			byline: text('by lena_n'),
			tags: text('obby')
		});
		expect(getByRole('heading', { level: 1, name: 'Skyline Obby' })).toBeTruthy();
		expect(getByText('by lena_n')).toBeTruthy();
		expect(getByText('obby')).toBeTruthy();
	});
});
