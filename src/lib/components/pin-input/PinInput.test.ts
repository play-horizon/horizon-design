/**
 * Tests of `PinInput`: one field per character of `count`, each named by Ark's translations, and
 * Ark's `defaultValue` filling the first ones.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import PinInput from './PinInput.svelte';

describe('PinInput', () => {
	it('shows one named field per character, filled from defaultValue', () => {
		const { getAllByRole } = render(PinInput, {
			label: 'Code',
			count: 5,
			defaultValue: ['1', '2'],
			translations: {
				inputLabel: (index: number, length: number) => `Digit ${index + 1} of ${length}`
			}
		});
		const fields = getAllByRole('textbox') as HTMLInputElement[];
		expect(fields.map((field) => field.getAttribute('aria-label'))).toEqual([
			'Digit 1 of 5',
			'Digit 2 of 5',
			'Digit 3 of 5',
			'Digit 4 of 5',
			'Digit 5 of 5'
		]);
		expect(fields.map((field) => field.value)).toEqual(['1', '2', '', '', '']);
	});
});
