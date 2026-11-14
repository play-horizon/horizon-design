/**
 * Tests of `AvatarStack` and of the avatar tones: the people shown, the overflow chip, the names
 * given to assistive technology, and the stable tone of a person.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import AvatarStack from './AvatarStack.svelte';
import { toneOf } from '../avatar/tone';

const people = ['Sam', 'Kofi', 'Rayan', 'Lena', 'Ada'].map((name) => ({
	id: name,
	name,
	initials: name.slice(0, 2).toUpperCase()
}));

describe('AvatarStack', () => {
	it('shows up to max people, names them, and sums up the rest', () => {
		const { getByRole, getAllByRole, getByText } = render(AvatarStack, {
			people,
			max: 3,
			label: 'Editing now',
			overflowText: (n: number) => `+${n}`
		});
		expect(getByRole('group', { name: 'Editing now' })).toBeTruthy();
		expect(getAllByRole('img').map((img) => img.getAttribute('aria-label'))).toEqual([
			'Sam',
			'Kofi',
			'Rayan'
		]);
		expect(getByText('+2')).toBeTruthy();
	});

	it('has no overflow chip when everyone fits', () => {
		const { queryByText } = render(AvatarStack, {
			people: people.slice(0, 2),
			label: 'Editing now',
			overflowText: (n: number) => `+${n}`
		});
		expect(queryByText(/^\+/)).toBeNull();
	});
});

describe('toneOf', () => {
	it('gives the same tone for the same initials', () => {
		// 'R' is 82 and 'M' 77: (82 + 77) % 5 + 1 = 5.
		expect(toneOf('RM')).toBe(5);
		expect(toneOf('RM')).toBe(toneOf('RM'));
		expect(toneOf('')).toBe(1);
	});
});
