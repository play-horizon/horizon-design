/**
 * Tests of `SegmentGroup`: Ark's `defaultValue` chooses the first segment, an `onValueChange` of
 * the app runs without breaking the bound `value`, the underline variant draws a bar and no track,
 * and a disabled segment can't be chosen.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
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

	it('draws the underline variant as a bar under the chosen segment, with no track', () => {
		const { container } = render(SegmentGroup, {
			items,
			variant: 'underline',
			defaultValue: 'day',
			'aria-label': 'Views'
		});
		const root = container.querySelector('[data-slot="segment-group"]');
		expect(root?.getAttribute('data-variant')).toBe('underline');
		expect(root?.classList.contains('bg-hover')).toBe(false);
		expect(root?.classList.contains('border-b')).toBe(true);
		const indicator = container.querySelector('[data-slot="segment-group-indicator"]');
		expect(indicator?.classList.contains('h-0.5')).toBe(true);
		expect(indicator?.classList.contains('bg-primary')).toBe(true);
		expect((indicator as HTMLElement).style.top).toBe('auto');
	});

	it('never chooses a disabled segment', async () => {
		let bound: string | null = 'day';
		const { getByRole } = render(SegmentGroup, {
			items: [items[0], { ...items[1], disabled: true }],
			'aria-label': 'Period',
			get value() {
				return bound;
			},
			set value(next: string | null) {
				bound = next;
			}
		});
		const week = getByRole('radio', { name: 'Week' }) as HTMLInputElement;
		expect(week.disabled).toBe(true);
		await userEvent.click(getByRole('radio', { name: 'Week' }).closest('label') ?? week);
		expect(bound).toBe('day');
	});
});
