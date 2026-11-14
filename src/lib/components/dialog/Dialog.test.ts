/**
 * Tests of `Dialog`: its named close button, and the frosted surface replacing the opaque one.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Dialog from './Dialog.svelte';

describe('Dialog', () => {
	it('is opaque by default, with a named close button', async () => {
		const { findByRole } = render(Dialog, { open: true, title: 'Paused', closeLabel: 'Close' });
		const dialog = await findByRole('dialog');
		expect(dialog.className).toContain('bg-raised');
		expect(dialog.className).not.toContain('frosted');
		expect(await findByRole('button', { name: 'Close' })).toBeTruthy();
	});

	it('takes the frosted surface instead of the opaque fill', async () => {
		const { findByRole } = render(Dialog, {
			open: true,
			title: 'Paused',
			closeLabel: 'Close',
			frosted: true
		});
		const dialog = await findByRole('dialog');
		expect(dialog.className).toContain('frosted');
		expect(dialog.className).not.toContain('bg-raised');
	});
});
