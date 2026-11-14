/**
 * Tests of `ColorPicker`: every control takes its accessible name from `labels`, and the area and
 * sliders announce their role and values from `labels` rather than from Ark's English.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { parseColor } from '@ark-ui/svelte';
import ColorPicker from './ColorPicker.svelte';

const labels = {
	trigger: 'Choose a colour',
	area: 'Saturation and brightness',
	areaRoleDescription: 'colour field',
	areaValue: (saturation: number, brightness: number) => `S ${saturation} B ${brightness}`,
	hue: 'Hue',
	hueValue: (hue: number) => `${hue} degrees`,
	alpha: 'Opacity',
	alphaValue: (alpha: number) => `${alpha * 100} percent`,
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
		expect(getByRole('dialog', { name: 'Choose a colour' })).toBeTruthy();
	});

	it('announces the area and the sliders from labels', async () => {
		const { getByRole } = render(ColorPicker, {
			labels,
			defaultValue: parseColor('hsba(200, 50%, 40%, 0.5)')
		});
		await fireEvent.click(getByRole('button', { name: 'Choose a colour' }));
		const area = await waitFor(() => getByRole('slider', { name: 'Saturation and brightness' }));
		expect(area.getAttribute('aria-roledescription')).toBe('colour field');
		expect(area.getAttribute('aria-valuetext')).toBe('S 50 B 40');
		expect(getByRole('slider', { name: 'Hue' }).getAttribute('aria-valuetext')).toBe('200 degrees');
		expect(getByRole('slider', { name: 'Opacity' }).getAttribute('aria-valuetext')).toBe(
			'50 percent'
		);
		expect(document.querySelectorAll('[aria-roledescription]')).toHaveLength(1);
	});

	it('announces lightness as the second value of the area under an HSL format', async () => {
		const { getByRole } = render(ColorPicker, {
			labels,
			format: 'hsla',
			defaultValue: parseColor('hsla(200, 50%, 40%, 1)')
		});
		await fireEvent.click(getByRole('button', { name: 'Choose a colour' }));
		const area = await waitFor(() => getByRole('slider', { name: 'Saturation and brightness' }));
		expect(area.getAttribute('aria-valuetext')).toBe('S 50 B 40');
	});
});
