/**
 * Tests of `Sheet`: its trigger is a button, its title names the open panel, its close button is
 * named by `closeLabel` and shows it as a tooltip, and an icon-only trigger is named by its
 * `triggerLabel`, shown as a tooltip.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Sheet from './Sheet.svelte';

/** Hovers `button` and returns the text of the tooltip that opens and describes it. */
async function hoverTooltip(button: HTMLElement): Promise<string | undefined> {
	await fireEvent.pointerMove(button, { pointerType: 'mouse' });
	await waitFor(() => expect(button.getAttribute('aria-describedby')).toBeTruthy());
	return document
		.getElementById(button.getAttribute('aria-describedby') ?? '')
		?.textContent?.trim();
}

describe('Sheet', () => {
	it('opens from a button, named by its title, with a named close button', async () => {
		const { getByRole, findByRole } = render(Sheet, {
			title: 'Filters',
			closeLabel: 'Close',
			trigger: createRawSnippet(() => ({ render: () => '<span>Show filters</span>' }))
		});
		const trigger = getByRole('button', { name: 'Show filters' });
		expect(trigger.tagName).toBe('BUTTON');
		await fireEvent.click(trigger);
		const sheet = await findByRole('dialog', { name: 'Filters' });
		expect(sheet.querySelector('[aria-label="Close"]')).toBeTruthy();
	});

	it('shows the close button and an icon-only trigger by their names as tooltips', async () => {
		const { getByRole, findByRole } = render(Sheet, {
			title: 'Menu',
			closeLabel: 'Close the menu',
			triggerLabel: 'Open the menu',
			trigger: createRawSnippet(() => ({ render: () => '<span aria-hidden="true">=</span>' }))
		});
		const trigger = getByRole('button', { name: 'Open the menu' });
		expect(await hoverTooltip(trigger)).toBe('Open the menu');

		await fireEvent.click(trigger);
		const sheet = await findByRole('dialog', { name: 'Menu' });
		const close = getByRole('button', { name: 'Close the menu' });
		expect(sheet.contains(close)).toBe(true);
		expect(await hoverTooltip(close)).toBe('Close the menu');
	});
});
