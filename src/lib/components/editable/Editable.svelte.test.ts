/**
 * Tests of `Editable`: its parts take the accessible names passed in `translations` rather than
 * Ark's English defaults, and the bound value follows the typing alongside `onValueChange`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Editable from './Editable.svelte';

const translations = { input: 'Display name', edit: 'Edit display name' };

describe('Editable', () => {
	it('names the text and the field from its translations', () => {
		const { container } = render(Editable, { translations, defaultValue: 'Sam' });
		const preview = container.querySelector('[data-slot="editable-preview"]');
		const input = container.querySelector('input');
		expect(preview?.getAttribute('aria-label')).toBe('Edit display name');
		expect(preview?.textContent).toBe('Sam');
		expect(input?.getAttribute('aria-label')).toBe('Display name');
	});

	it('updates the bound value and calls onValueChange', async () => {
		const bound = $state({ value: 'Sam' });
		const onValueChange = vi.fn();
		const { container } = render(Editable, {
			props: {
				translations,
				onValueChange,
				get value() {
					return bound.value;
				},
				set value(next: string) {
					bound.value = next;
				}
			}
		});
		const input = container.querySelector('input');
		if (!input) throw new Error('Editable renders no input');
		await fireEvent.input(input, { target: { value: 'Samira' } });
		expect(bound.value).toBe('Samira');
		expect(onValueChange).toHaveBeenLastCalledWith({ value: 'Samira' });
	});
});
