/**
 * Tests of `Listbox`: the list is named by its label, and choosing an option updates the bound
 * value alongside `onValueChange`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Listbox from './Listbox.svelte';

const items = [
	{ label: 'Obby', value: 'obby' },
	{ label: 'Racing', value: 'racing' }
];

describe('Listbox', () => {
	it('binds the chosen option and calls onValueChange', async () => {
		const bound = $state({ value: [] as string[] });
		const onValueChange = vi.fn();
		const { getByRole } = render(Listbox, {
			props: {
				label: 'Genre',
				items,
				onValueChange,
				get value() {
					return bound.value;
				},
				set value(next: string[]) {
					bound.value = next;
				}
			}
		});
		expect(getByRole('listbox', { name: 'Genre' })).toBeTruthy();

		await fireEvent.click(getByRole('option', { name: 'Racing' }));
		expect(bound.value).toEqual(['racing']);
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['racing'] }));
		expect(getByRole('option', { name: 'Racing' }).getAttribute('aria-selected')).toBe('true');
	});
});
