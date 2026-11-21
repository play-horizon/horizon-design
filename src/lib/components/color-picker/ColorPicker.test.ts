/**
 * Tests of `ColorPicker`: every control takes its accessible name from `labels`, the area and
 * sliders announce their role and values from `labels` rather than from Ark's English, the hex
 * fields show and take 8 digits (FF when no alpha is typed), the colour is written in each of
 * `formats`, and the presets sit on one line, or nowhere when there are none.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
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
	swatch: (color: string) => `Use ${color}`,
	formats: 'Colour values'
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

	it('shows 8 hex digits and reads a typed 6-digit hex as opaque', async () => {
		const onValueChange = vi.fn();
		const { getAllByLabelText } = render(ColorPicker, {
			labels,
			defaultValue: parseColor('#3b82f680'),
			onValueChange
		});
		const [field] = getAllByLabelText('Hex') as HTMLInputElement[];
		expect(field.value).toBe('#3B82F680');

		field.value = '22c55e';
		await fireEvent.change(field);
		expect(onValueChange.mock.lastCall?.[0].value.toString('hexa')).toBe('#22C55EFF');
		expect(field.value).toBe('#22C55EFF');

		field.value = 'not a colour';
		await fireEvent.change(field);
		expect(field.value).toBe('#22C55EFF');
	});

	it('writes the colour in each format, and offers its presets on one line', async () => {
		const { getByRole } = render(ColorPicker, {
			labels,
			defaultValue: parseColor('#ff000080'),
			swatches: ['#000000', '#ffffff']
		});
		await fireEvent.click(getByRole('button', { name: 'Choose a colour' }));
		const values = await waitFor(() => getByRole('list', { name: 'Colour values' }));
		expect([...values.querySelectorAll('li')].map((item) => item.textContent)).toEqual([
			'#FF000080',
			'rgba(255, 0, 0, 0.5)',
			'hsla(0, 100%, 50%, 0.5)'
		]);
		const swatches = document.querySelector('[data-slot="color-picker-swatches"]');
		expect(swatches?.classList.contains('grid-flow-col')).toBe(true);
	});

	it('leaves out the values and the presets when given none', async () => {
		const { getByRole, queryByRole } = render(ColorPicker, { labels, formats: [] });
		await fireEvent.click(getByRole('button', { name: 'Choose a colour' }));
		await waitFor(() => getByRole('dialog', { name: 'Choose a colour' }));
		expect(queryByRole('list', { name: 'Colour values' })).toBeNull();
		expect(document.querySelector('[data-slot="color-picker-swatches"]')).toBeNull();
	});
});
