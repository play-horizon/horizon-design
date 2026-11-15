/**
 * Tests of `SignaturePad`: the pad is named by `label`, announced as `roleDescription`, and the
 * clear button named by `clearLabel`, rather than by Ark's English defaults; the drawing, which Ark
 * titles in English, is hidden from assistive technology; and the clear button stays hidden until
 * something is drawn.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SignaturePad from './SignaturePad.svelte';

describe('SignaturePad', () => {
	it('announces only the strings of its props', () => {
		const { getByRole, getByText, container } = render(SignaturePad, {
			label: 'Signature',
			roleDescription: 'drawing area',
			clearLabel: 'Erase'
		});
		const pad = getByRole('application', { name: 'Signature' });
		expect(pad.getAttribute('aria-roledescription')).toBe('drawing area');
		expect(document.querySelectorAll('[aria-roledescription]')).toHaveLength(1);
		expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
		const clear = getByText('Erase');
		expect(clear.tagName).toBe('BUTTON');
		expect(clear.getAttribute('aria-label')).toBe('Erase');
		expect(clear.hidden).toBe(true);
		expect(getByText('Signature', { selector: 'label' })).toBeTruthy();
	});
});
