/**
 * Tests of `RadioGroup`: Ark's `defaultValue` chooses the first option, an `onValueChange` of the
 * app runs without breaking the bound `value`, and a disabled option is marked.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import RadioGroup from './RadioGroup.svelte';

const items = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'team', label: 'Team', disabled: true }
];

describe('RadioGroup', () => {
	it('starts from defaultValue when no value is bound', () => {
		const { getByRole } = render(RadioGroup, { label: 'Plan', items, defaultValue: 'pro' });
		expect(getByRole('radiogroup', { name: 'Plan' })).toBeTruthy();
		expect((getByRole('radio', { name: 'Pro' }) as HTMLInputElement).checked).toBe(true);
		expect((getByRole('radio', { name: 'Free' }) as HTMLInputElement).checked).toBe(false);
	});

	it('keeps the value in step with an onValueChange of the app', async () => {
		const onValueChange = vi.fn();
		let bound: string | null = 'free';
		const { getByRole } = render(RadioGroup, {
			label: 'Plan',
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
		await fireEvent.click(getByRole('radio', { name: 'Pro' }));
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 'pro' }));
		expect(bound).toBe('pro');
	});

	it('marks a disabled option', () => {
		const { getByRole } = render(RadioGroup, { label: 'Plan', items });
		const team = getByRole('radio', { name: 'Team' }) as HTMLInputElement;
		expect(team.disabled).toBe(true);
		expect(team.closest('label')?.hasAttribute('data-disabled')).toBe(true);
	});
});
