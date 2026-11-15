/**
 * Tests of `Slider`: one thumb per value, so a range has two, each named by the label and starting
 * from Ark's `defaultValue`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Slider from './Slider.svelte';

describe('Slider', () => {
	it('has one thumb for one value', () => {
		const { getAllByRole } = render(Slider, { label: 'Volume', defaultValue: [40] });
		const thumbs = getAllByRole('slider', { name: 'Volume' });
		expect(thumbs.map((thumb) => thumb.getAttribute('aria-valuenow'))).toEqual(['40']);
	});

	it('has two thumbs for a range', () => {
		const { getAllByRole } = render(Slider, { label: 'Price', defaultValue: [20, 80] });
		const thumbs = getAllByRole('slider', { name: 'Price' });
		expect(thumbs.map((thumb) => thumb.getAttribute('aria-valuenow'))).toEqual(['20', '80']);
	});
});
