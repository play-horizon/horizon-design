/**
 * Tests of `AlertDialog`: Cancel closes it without acting, and the confirming button calls
 * `onAction` once and closes it.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import AlertDialog from './AlertDialog.svelte';

const trigger = createRawSnippet(() => ({ render: () => '<button type="button">Delete</button>' }));

function open(onAction = vi.fn(), onOpenChange = vi.fn()) {
	const view = render(AlertDialog, {
		trigger,
		title: 'Delete this game?',
		cancelLabel: 'Cancel',
		actionLabel: 'Delete game',
		onAction,
		onOpenChange
	});
	return { ...view, onAction, onOpenChange };
}

describe('AlertDialog', () => {
	it('confirms the action once and closes', async () => {
		const { getByRole, onAction, onOpenChange } = open();
		await fireEvent.click(getByRole('button', { name: 'Delete' }));
		const dialog = await waitFor(() => getByRole('alertdialog', { name: 'Delete this game?' }));
		await fireEvent.click(getByRole('button', { name: 'Delete game' }));
		expect(onAction).toHaveBeenCalledOnce();
		await waitFor(() => expect(dialog.dataset.state).toBe('closed'));
		expect(onOpenChange).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }));
	});

	it('cancels without acting', async () => {
		const { getByRole, onAction } = open();
		await fireEvent.click(getByRole('button', { name: 'Delete' }));
		const dialog = await waitFor(() => getByRole('alertdialog'));
		await fireEvent.click(getByRole('button', { name: 'Cancel' }));
		await waitFor(() => expect(dialog.dataset.state).toBe('closed'));
		expect(onAction).not.toHaveBeenCalled();
	});
});
