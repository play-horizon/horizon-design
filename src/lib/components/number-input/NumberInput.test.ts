/**
 * Tests of `NumberInput`: Ark's `defaultValue` sets the first value, an `onValueChange` of the
 * app runs without breaking the bound `value`, and every string announced comes from the app.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import NumberInput from './NumberInput.svelte';

const translations = {
	incrementLabel: 'Increase',
	decrementLabel: 'Decrease',
	roleDescription: 'number field'
};

/** The values of `attribute` on every element of the document, in document order. */
function attributeValues(attribute: string): (string | null)[] {
	return [...document.querySelectorAll(`[${attribute}]`)].map((element) =>
		element.getAttribute(attribute)
	);
}

describe('NumberInput', () => {
	it('announces only the strings of the app', () => {
		render(NumberInput, { label: 'Quantity', translations });
		expect(attributeValues('aria-roledescription')).toEqual(['number field']);
		expect(attributeValues('aria-label')).toEqual(['Increase', 'Decrease']);
	});

	it('starts from defaultValue when no value is bound', () => {
		const { getByRole } = render(NumberInput, {
			label: 'Quantity',
			defaultValue: '5',
			translations
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
			translations
		});
		await fireEvent.pointerDown(getByRole('button', { name: 'Increase' }), { button: 0 });
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: '6' }));
		expect(bound).toBe('6');
	});
});
