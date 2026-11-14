/**
 * Tests of `Input`: the bound value follows what the user types, and `invalid` marks the input
 * for assistive technology.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Input from './Input.svelte';

describe('Input', () => {
	it('binds the typed text', async () => {
		const bound = $state({ value: 'sam' });
		const { getByRole } = render(Input, {
			props: {
				'aria-label': 'Username',
				get value() {
					return bound.value;
				},
				set value(next: string) {
					bound.value = next;
				}
			}
		});
		const input = getByRole('textbox', { name: 'Username' });
		if (!(input instanceof HTMLInputElement)) throw new Error('Input renders no <input>');
		expect(input.value).toBe('sam');
		await fireEvent.input(input, { target: { value: 'samira' } });
		expect(bound.value).toBe('samira');
	});

	it('marks an invalid value', () => {
		const { getByRole } = render(Input, { 'aria-label': 'Email', invalid: true });
		expect(getByRole('textbox', { name: 'Email' }).getAttribute('aria-invalid')).toBe('true');
	});
});
