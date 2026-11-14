/**
 * Tests of `ColorPicker`: every control takes its accessible name from `labels`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import ColorPicker from './ColorPicker.svelte';

const labels = {
	trigger: 'Choose a colour',
	area: 'Saturation and brightness',
	hue: 'Hue',
	alpha: 'Opacity',
	hex: 'Hex',
	swatch: (color: string) => `Use ${color}`
};

describe('ColorPicker', () => {
	it('names its controls from labels', async () => {
		const { getByRole, getAllByLabelText, getByLabelText } = render(ColorPicker, {
			labels,
			swatches: ['#ff0000']
		});
		await fireEvent.click(getByRole('button', { name: 'Choose a colour' }));
		await waitFor(() => expect(getAllByLabelText('Hex')).toHaveLength(2));
		expect(getAllByLabelText('Opacity')).toHaveLength(2);
		expect(getByLabelText('Hue')).toBeTruthy();
		expect(getByLabelText('Saturation and brightness')).toBeTruthy();
		expect(getByLabelText('Use #ff0000')).toBeTruthy();
	});
});
