/**
 * Tests of `DialogClose`: its icon form is named by its `label`, shows it as a tooltip, closes its
 * dialog, and keeps the id the dialog gives its close button.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Fixture from './DialogClose.test.svelte';

describe('DialogClose', () => {
	it('is named by its label, shows it as a tooltip and closes the dialog', async () => {
		const { findByRole, getByRole } = render(Fixture);
		const dialog = await findByRole('dialog', { name: 'Paused' });
		const close = await findByRole('button', { name: 'Close the pause menu' });

		await fireEvent.focus(close);
		await waitFor(() =>
			expect(getByRole('tooltip', { hidden: true }).textContent?.trim()).toBe(
				'Close the pause menu'
			)
		);

		await fireEvent.click(close);
		await waitFor(() => expect(dialog.dataset.state).toBe('closed'));
	});

	it("keeps the dialog's close-button id, which an alert dialog focuses first", async () => {
		// jsdom can't run Ark's initial focus: the id, `<dialog>-close` as Dialog sets it, is what Ark
		// finds the button by.
		const { findByRole } = render(Fixture, { role: 'alertdialog' });
		const close = await findByRole('button', { name: 'Close the pause menu' });
		expect(close.id).toMatch(/-close$/);
	});
});
