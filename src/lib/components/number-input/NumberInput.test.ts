/**
 * Tests of `NumberInput`: Ark's `defaultValue` sets the first value, and an `onValueChange` of the
 * app runs without breaking the bound `value`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import NumberInput from './NumberInput.svelte';

describe('NumberInput', () => {
	it('starts from defaultValue when no value is bound', () => {
		const { getByRole } = render(NumberInput, {
			label: 'Quantity',
			defaultValue: '5',
			translations: { incrementLabel: 'Increase', decrementLabel: 'Decrease' }
		});
		expect((getByRole('spinbutton', { name: 'Quantity' }) as HTMLInputElement).value).toBe('5');
	});

	it('keeps the value in step with an onValueChange of the app', async () => {
		const onValueChange = vi.fn();
		let bound = '5';
		const { getByRole } = render(NumberInput, {
			label: 'Quantity',
			// An accessor pair is how Svelte passes `bind:value`.
			get value() {
				return bound;
			},
			set value(next: string) {
				bound = next;
			},
			onValueChange,
			translations: { incrementLabel: 'Increase', decrementLabel: 'Decrease' }
		});
		await fireEvent.pointerDown(getByRole('button', { name: 'Increase' }), { button: 0 });
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: '6' }));
		expect(bound).toBe('6');
	});
});
