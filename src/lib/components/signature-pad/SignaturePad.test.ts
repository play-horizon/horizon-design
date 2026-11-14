/**
 * Tests of `SignaturePad`: the pad is named by `label` and the clear button by `clearLabel`,
 * rather than by Ark's English defaults, and the clear button stays hidden until something is drawn.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SignaturePad from './SignaturePad.svelte';

describe('SignaturePad', () => {
	it('names the pad and the clear button from its props', () => {
		const { getByRole, getByText } = render(SignaturePad, {
			label: 'Signature',
			clearLabel: 'Erase'
		});
		expect(getByRole('application', { name: 'Signature' })).toBeTruthy();
		const clear = getByText('Erase');
		expect(clear.tagName).toBe('BUTTON');
		expect(clear.getAttribute('aria-label')).toBe('Erase');
		expect(clear.hidden).toBe(true);
		expect(getByText('Signature', { selector: 'label' })).toBeTruthy();
	});
});
