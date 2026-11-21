/**
 * Tests of `FloatingPanel`: no trigger button without a `trigger`, the panel named by its title,
 * the close button tooltipped by its label, and closing reported through `onOpenChange`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import FloatingPanel from './FloatingPanel.svelte';

describe('FloatingPanel', () => {
	it('opens without a trigger, named by its title, and closes', async () => {
		const onOpenChange = vi.fn();
		const { findByRole, getAllByRole } = render(FloatingPanel, {
			open: true,
			title: 'Settings',
			closeLabel: 'Close',
			onOpenChange
		});
		expect(await findByRole('dialog', { name: 'Settings' })).toBeTruthy();
		const buttons = getAllByRole('button');
		expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual(['Close']);
		await fireEvent.click(buttons[0]);
		expect(onOpenChange).toHaveBeenLastCalledWith({ open: false });
	});

	it('shows the close label as the close button tooltip', async () => {
		const { findByRole, getByRole } = render(FloatingPanel, {
			open: true,
			title: 'Settings',
			closeLabel: 'Close the settings'
		});
		await fireEvent.focus(await findByRole('button', { name: 'Close the settings' }));
		await waitFor(() =>
			expect(getByRole('tooltip', { hidden: true }).textContent?.trim()).toBe('Close the settings')
		);
	});
});
