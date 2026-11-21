/**
 * Test helper for tooltips: moves the keyboard focus to a trigger, as Ark opens a tooltip on
 * keyboard focus only, and waits for the tooltip that describes it.
 * @module
 */
import { expect } from 'vitest';
import { waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

/** Tabs to `trigger` and resolves once the tooltip it is described by shows `text`. */
export async function expectTooltip(trigger: HTMLElement, text: string): Promise<void> {
	const user = userEvent.setup();
	for (let step = 0; step < 50 && document.activeElement !== trigger; step++) await user.tab();
	expect(document.activeElement).toBe(trigger);
	await waitFor(() => {
		const id = trigger.getAttribute('aria-describedby');
		expect(id && document.getElementById(id)?.textContent?.trim()).toBe(text);
	});
}
