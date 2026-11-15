/**
 * Tests of `AngleSlider`: its accessible name, its `defaultValue`, its value text, its range, a
 * keyboard turn, and its needle drawn upward from the centre (angle 0 is at the top).
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import AngleSlider from './AngleSlider.svelte';

const degrees = (value: number) => `${value}°`;

describe('AngleSlider', () => {
	it('starts at its default angle and turns by a step on an arrow key', async () => {
		const onValueChange = vi.fn();
		const { getByRole, getByText } = render(AngleSlider, {
			label: 'Rotation',
			valueText: degrees,
			defaultValue: 45,
			onValueChange
		});
		const thumb = getByRole('slider', { name: 'Rotation' });
		expect(thumb.getAttribute('aria-valuenow')).toBe('45');
		expect(thumb.getAttribute('aria-valuetext')).toBe('45°');
		expect(getByText('45°')).toBeTruthy();
		thumb.focus();
		await fireEvent.keyDown(thumb, { key: 'ArrowRight' });
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 46 }));
		expect(thumb.getAttribute('aria-valuenow')).toBe('46');
		expect(thumb.getAttribute('aria-valuetext')).toBe('46°');
		expect(getByText('46°')).toBeTruthy();
	});

	it('announces the range zag clamps the angle to', async () => {
		const { getByRole } = render(AngleSlider, { label: 'Rotation', valueText: degrees });
		const thumb = getByRole('slider', { name: 'Rotation' });
		expect(thumb.getAttribute('aria-valuemin')).toBe('0');
		expect(thumb.getAttribute('aria-valuemax')).toBe('359');
		thumb.focus();
		await fireEvent.keyDown(thumb, { key: 'End' });
		expect(thumb.getAttribute('aria-valuenow')).toBe('359');
	});

	it('draws its needle from the centre to the top, where angle 0 is', () => {
		const { getByRole } = render(AngleSlider, {
			label: 'Rotation',
			valueText: degrees,
			size: 120
		});
		const needle = getByRole('slider', { name: 'Rotation' }).querySelector<HTMLElement>(
			'[data-slot="angle-slider-needle"]'
		);
		expect(needle?.style.bottom).toBe('50%');
		expect(needle?.style.top).toBe('');
		expect(needle?.style.height).toBe('calc(48px)');
	});
});
