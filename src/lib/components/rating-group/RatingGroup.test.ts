/**
 * Tests of `RatingGroup`: the label names the group, `translations` name each star and give the
 * role it is announced as, and Ark's `defaultValue` sets the first rating.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import RatingGroup from './RatingGroup.svelte';

describe('RatingGroup', () => {
	it('names the group and its stars, starting from defaultValue', () => {
		const { getByRole, getAllByRole } = render(RatingGroup, {
			label: 'Your score',
			count: 4,
			defaultValue: 3,
			translations: {
				ratingValueText: (index: number) => `${index} of 4`,
				roleDescription: 'score'
			}
		});
		expect(getByRole('radiogroup', { name: 'Your score' })).toBeTruthy();
		const stars = getAllByRole('radio');
		expect(stars.map((star) => star.getAttribute('aria-label'))).toEqual([
			'1 of 4',
			'2 of 4',
			'3 of 4',
			'4 of 4'
		]);
		expect(stars.map((star) => star.getAttribute('aria-roledescription'))).toEqual([
			'score',
			'score',
			'score',
			'score'
		]);
		expect(document.querySelectorAll('[aria-roledescription]')).toHaveLength(4);
		expect(getByRole('radio', { name: '3 of 4' }).getAttribute('aria-checked')).toBe('true');
	});
});
