/**
 * Test helper for tooltips: moves the keyboard focus to a trigger (Ark opens a tooltip on keyboard
 * focus, not on a programmatic one), or hovers it when it isn't in the tab order (such as a field's
 * open button), and waits for the tooltip that describes it.
 * @module
 */
import { expect } from 'vitest';
import { waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

/** Tabs to or hovers `trigger`, and resolves once the tooltip it is described by shows `text`. */
export async function expectTooltip(trigger: HTMLElement, text: string): Promise<void> {
	const user = userEvent.setup();
	if (trigger.tabIndex < 0) {
		await user.hover(trigger);
	} else {
		for (let step = 0; step < 50 && document.activeElement !== trigger; step++) await user.tab();
		expect(document.activeElement).toBe(trigger);
	}
	await waitFor(() => {
		const id = trigger.getAttribute('aria-describedby');
		expect(id && document.getElementById(id)?.textContent?.trim()).toBe(text);
	});
}
