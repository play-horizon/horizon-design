/**
 * Tests of `ToggleGroup`: its items' names, and pressing one updates the bound value alongside
 * an `onValueChange` callback.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import ToggleGroup from './ToggleGroup.svelte';

const icon = createRawSnippet(() => ({ render: () => '<span aria-hidden="true"></span>' }));

const items = [
	{ value: 'bold', label: 'Bold', content: icon },
	{ value: 'italic', label: 'Italic', content: icon }
];

describe('ToggleGroup', () => {
	it('names icon items by their label and updates the bound value', async () => {
		const bound = $state({ value: [] as string[] });
		const onValueChange = vi.fn();
		const { getByRole } = render(ToggleGroup, {
			props: {
				items,
				multiple: true,
				'aria-label': 'Text style',
				onValueChange,
				get value() {
					return bound.value;
				},
				set value(next: string[]) {
					bound.value = next;
				}
			}
		});
		expect(getByRole('group', { name: 'Text style' })).toBeTruthy();

		await fireEvent.click(getByRole('button', { name: 'Italic' }));
		expect(bound.value).toEqual(['italic']);
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['italic'] }));
		expect(getByRole('button', { name: 'Italic' }).getAttribute('aria-pressed')).toBe('true');
	});
});
