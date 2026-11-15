/**
 * Tests of `Textarea`: typing updates the bound value.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Textarea from './Textarea.svelte';

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
});
