/**
 * Tests of `CircularSlider`: its accessible name, its `defaultValue` and its written value.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import CircularSlider from './CircularSlider.svelte';

describe('CircularSlider', () => {
	it('starts at its default value, named by its label', () => {
		const { getByRole, getByText } = render(CircularSlider, {
			label: 'Hue',
			defaultValue: 120,
			suffix: '°'
		});
		expect(getByRole('slider', { name: 'Hue' }).getAttribute('aria-valuenow')).toBe('120');
		expect(getByText('120°')).toBeTruthy();
	});
});
