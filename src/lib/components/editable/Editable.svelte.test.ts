/**
 * Tests of `Editable`: its parts take the accessible names passed in `translations` rather than
 * Ark's English defaults (the field its `label` when it has one), a read-only one leaves its state
 * to the field, and the bound value follows the typing alongside `onValueChange`.
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

	it('names the field (hidden until edited) by its label, or by its translation', () => {
		// The name of a hidden field isn't computed by the testing library: read its references.
		const nameOf = (input: HTMLInputElement | null) => {
			const labelId = input?.getAttribute('aria-labelledby');
			const label = labelId ? document.getElementById(labelId) : null;
			return label?.textContent?.trim() ?? input?.getAttribute('aria-label');
		};
		const labelled = render(Editable, { translations, label: 'Name', defaultValue: 'Sam' });
		expect(nameOf(labelled.container.querySelector('input'))).toBe('Name');
		labelled.unmount();

		const unlabelled = render(Editable, { translations, defaultValue: 'Sam' });
		expect(nameOf(unlabelled.container.querySelector('input'))).toBe('Display name');
	});

	it('marks the field read-only, not the preview, which ARIA forbids', () => {
		const { container } = render(Editable, { translations, defaultValue: 'Sam', readOnly: true });
		const preview = container.querySelector('[data-slot="editable-preview"]');
		expect(preview?.hasAttribute('aria-readonly')).toBe(false);
		expect(container.querySelector('input')?.readOnly).toBe(true);
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
