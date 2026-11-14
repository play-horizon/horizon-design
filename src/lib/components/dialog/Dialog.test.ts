/**
 * Tests of `Dialog`: its trigger button, its named close button, and the frosted surface
 * replacing the opaque one.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Dialog from './Dialog.svelte';

describe('Dialog', () => {
	it('opens from a trigger that is a real button', async () => {
		const { getByRole, findByRole } = render(Dialog, {
			title: 'Delete the game',
			closeLabel: 'Close',
			trigger: createRawSnippet(() => ({ render: () => '<span>Delete</span>' }))
		});
		const trigger = getByRole('button', { name: 'Delete' });
		expect(trigger.tagName).toBe('BUTTON');
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		await fireEvent.click(trigger);
		expect(await findByRole('dialog', { name: 'Delete the game' })).toBeTruthy();
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
	});

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
