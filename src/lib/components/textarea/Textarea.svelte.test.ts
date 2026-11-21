/**
 * Tests of `Textarea`: typing updates the bound value, and `invalid`, or an invalid `Field`
 * around it, marks the textarea for assistive technology.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Textarea from './Textarea.svelte';
import TextareaInField from './Textarea.test.svelte';

describe('Textarea', () => {
	it('updates the bound value as the user types', async () => {
		const bound = $state({ value: 'Hello' });
		const { getByRole } = render(Textarea, {
			props: {
				'aria-label': 'Message',
				get value() {
					return bound.value;
				},
				set value(next: string) {
					bound.value = next;
				}
			}
		});
		const textarea = getByRole('textbox', { name: 'Message' }) as HTMLTextAreaElement;
		expect(textarea.value).toBe('Hello');

		await fireEvent.input(textarea, { target: { value: 'Hello there' } });
		expect(bound.value).toBe('Hello there');
	});

	it('marks an invalid value', () => {
		const { getByRole } = render(Textarea, { 'aria-label': 'Message', invalid: true });
		expect(getByRole('textbox', { name: 'Message' }).getAttribute('aria-invalid')).toBe('true');
	});

	it('is invalid inside an invalid field', () => {
		const { getByRole } = render(TextareaInField);
		expect(getByRole('textbox', { name: 'Message' }).getAttribute('aria-invalid')).toBe('true');
	});
});
