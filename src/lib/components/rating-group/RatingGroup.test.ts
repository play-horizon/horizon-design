/**
 * Tests of `RatingGroup`: the label names the group, Ark's translations name each star, and Ark's
 * `defaultValue` sets the first rating.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import RatingGroup from './RatingGroup.svelte';

describe('RatingGroup', () => {
	it('names the group and its stars, starting from defaultValue', () => {
		const { getByRole, getAllByRole } = render(RatingGroup, {
			label: 'Your rating',
			count: 4,
			defaultValue: 3,
			translations: { ratingValueText: (index: number) => `${index} of 4` }
		});
		expect(getByRole('radiogroup', { name: 'Your rating' })).toBeTruthy();
		const stars = getAllByRole('radio');
		expect(stars.map((star) => star.getAttribute('aria-label'))).toEqual([
			'1 of 4',
			'2 of 4',
			'3 of 4',
			'4 of 4'
		]);
		expect(getByRole('radio', { name: '3 of 4' }).getAttribute('aria-checked')).toBe('true');
	});
});
