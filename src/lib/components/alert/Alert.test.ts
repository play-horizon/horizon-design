/**
 * Tests of `Alert`: warnings and errors interrupt assistive technology, other messages don't.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Alert from './Alert.svelte';

describe('Alert', () => {
	it('is an alert for an error and a status for information', () => {
		const error = render(Alert, { variant: 'error', title: 'Upload failed' });
		expect(error.getByRole('alert').textContent).toContain('Upload failed');
		const info = render(Alert, { variant: 'info', title: 'Saving' });
		expect(info.getByRole('status').textContent).toContain('Saving');
	});
});
