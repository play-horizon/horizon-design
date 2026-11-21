/**
 * Tests of `PopoverClose`: the button is named by its `label`, never by Ark's English default, and
 * closes its popover; an icon-only one shows its `label` as a tooltip.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Fixture from './PopoverClose.test.svelte';

/** Hovers `button` and returns the text of the tooltip that opens and describes it. */
async function hoverTooltip(button: HTMLElement): Promise<string | undefined> {
	await fireEvent.pointerMove(button, { pointerType: 'mouse' });
	await waitFor(() => expect(button.getAttribute('aria-describedby')).toBeTruthy());
	return document
		.getElementById(button.getAttribute('aria-describedby') ?? '')
		?.textContent?.trim();
}

describe('PopoverClose', () => {
	it('is named by its label and closes the popover', async () => {
		const { findByRole } = render(Fixture);
		const panel = await findByRole('dialog', { name: 'Layer size' });
		const close = await findByRole('button', { name: 'Close the layer size' });
		await fireEvent.click(close);
		await waitFor(() => expect(panel.dataset.state).toBe('closed'));
	});

	it('shows the label of an icon-only button as a tooltip', async () => {
		const { findByRole } = render(Fixture);
		const close = await findByRole('button', { name: 'Close' });
		expect(await hoverTooltip(close)).toBe('Close');
	});
});
