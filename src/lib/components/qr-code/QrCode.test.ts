/**
 * Tests of `QrCode`: the code is an image named by `label`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import QrCode from './QrCode.svelte';

describe('QrCode', () => {
	it('is an image named by its label', () => {
		const { getByRole } = render(QrCode, { value: 'https://example.com', label: 'Invite link' });
		const image = getByRole('img', { name: 'Invite link' });
		expect(image.getAttribute('style')).toContain('width: 160px');
	});
});
