/**
 * Tests of `CircularSlider`: its accessible name, its `defaultValue`, its value text (written and
 * spoken) and its range.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import CircularSlider from './CircularSlider.svelte';

const degrees = (value: number) => `${value}°`;

describe('CircularSlider', () => {
	it('starts at its default value, named by its label, with its value text', () => {
		const { getByRole, getByText } = render(CircularSlider, {
			label: 'Hue',
			valueText: degrees,
			defaultValue: 120
		});
		const thumb = getByRole('slider', { name: 'Hue' });
		expect(thumb.getAttribute('aria-valuenow')).toBe('120');
		expect(thumb.getAttribute('aria-valuetext')).toBe('120°');
		expect(getByText('120°')).toBeTruthy();
	});

	it('announces the range zag clamps the value to', async () => {
		const { getByRole } = render(CircularSlider, { label: 'Hue', valueText: degrees });
		const thumb = getByRole('slider', { name: 'Hue' });
		expect(thumb.getAttribute('aria-valuemax')).toBe('359');
		thumb.focus();
		await fireEvent.keyDown(thumb, { key: 'End' });
		expect(thumb.getAttribute('aria-valuenow')).toBe('359');
		expect(thumb.getAttribute('aria-valuetext')).toBe('359°');
	});

	it('keeps its spoken value when the written one is hidden', () => {
		const { getByRole, queryByText } = render(CircularSlider, {
			label: 'Hue',
			valueText: degrees,
			defaultValue: 30,
			showValue: false
		});
		expect(getByRole('slider', { name: 'Hue' }).getAttribute('aria-valuetext')).toBe('30°');
		expect(queryByText('30°')).toBeNull();
	});
});
