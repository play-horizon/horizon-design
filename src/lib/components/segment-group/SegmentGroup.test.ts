/**
 * Tests of `SegmentGroup`: Ark's `defaultValue` chooses the first segment, and an `onValueChange`
 * of the app runs without breaking the bound `value`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import SegmentGroup from './SegmentGroup.svelte';

const items = [
	{ value: 'day', label: 'Day' },
	{ value: 'week', label: 'Week' }
];

describe('SegmentGroup', () => {
	it('starts from defaultValue when no value is bound', () => {
		const { getByRole } = render(SegmentGroup, {
			items,
			defaultValue: 'week',
			'aria-label': 'Period'
		});
		expect(getByRole('radiogroup', { name: 'Period' })).toBeTruthy();
		expect((getByRole('radio', { name: 'Week' }) as HTMLInputElement).checked).toBe(true);
	});

	it('keeps the value in step with an onValueChange of the app', async () => {
		const onValueChange = vi.fn();
		let bound: string | null = 'day';
		const { getByRole } = render(SegmentGroup, {
			items,
			// An accessor pair is how Svelte passes `bind:value`.
			get value() {
				return bound;
			},
			set value(next: string | null) {
				bound = next;
			},
			onValueChange
		});
		await fireEvent.click(getByRole('radio', { name: 'Week' }));
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 'week' }));
		expect(bound).toBe('week');
	});
});
