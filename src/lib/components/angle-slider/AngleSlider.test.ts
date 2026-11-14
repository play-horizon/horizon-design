/**
 * Tests of `AngleSlider`: its accessible name, its `defaultValue`, and a keyboard turn.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import AngleSlider from './AngleSlider.svelte';

describe('AngleSlider', () => {
	it('starts at its default angle and turns by a step on an arrow key', async () => {
		const onValueChange = vi.fn();
		const { getByRole, getByText } = render(AngleSlider, {
			label: 'Rotation',
			defaultValue: 45,
			onValueChange
		});
		const thumb = getByRole('slider', { name: 'Rotation' });
		expect(thumb.getAttribute('aria-valuenow')).toBe('45');
		expect(getByText('45°')).toBeTruthy();
		thumb.focus();
		await fireEvent.keyDown(thumb, { key: 'ArrowRight' });
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 46 }));
		expect(thumb.getAttribute('aria-valuenow')).toBe('46');
	});
});
