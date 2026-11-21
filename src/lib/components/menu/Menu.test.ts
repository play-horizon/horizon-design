/**
 * Tests of `Menu`: an icon-only trigger is named by its `triggerLabel`, shows it as a tooltip, and
 * still opens the menu it names.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Menu from './Menu.svelte';

/** Hovers `button` and returns the text of the tooltip that opens and describes it. */
async function hoverTooltip(button: HTMLElement): Promise<string | undefined> {
	await fireEvent.pointerMove(button, { pointerType: 'mouse' });
	await waitFor(() => expect(button.getAttribute('aria-describedby')).toBeTruthy());
	return document
		.getElementById(button.getAttribute('aria-describedby') ?? '')
		?.textContent?.trim();
}

const icon = createRawSnippet(() => ({ render: () => '<span aria-hidden="true">…</span>' }));

describe('Menu', () => {
	it('names an icon-only trigger by its triggerLabel, shown as a tooltip', async () => {
		const { getByRole } = render(Menu, { triggerLabel: 'More actions', trigger: icon });
		const trigger = getByRole('button', { name: 'More actions' });

		expect(await hoverTooltip(trigger)).toBe('More actions');

		await fireEvent.click(trigger);
		await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'));
		expect(getByRole('menu', { hidden: true }).getAttribute('aria-labelledby')).toBe(trigger.id);
	});
});
