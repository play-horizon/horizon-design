/**
 * Tests of `RatingGroup`: the label names the group, `translations` name each star and give the
 * role it is announced as, Ark's `defaultValue` sets the first rating, and a half rating marks
 * its star half filled.
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

	it('marks the star of a half rating', () => {
		const { getAllByRole } = render(RatingGroup, {
			label: 'Your score',
			allowHalf: true,
			defaultValue: 2.5,
			translations: { ratingValueText: (index: number) => `${index}`, roleDescription: 'score' }
		});
		expect(getAllByRole('radio').map((star) => star.hasAttribute('data-half'))).toEqual([
			false,
			false,
			true,
			false,
			false
		]);
	});
});
