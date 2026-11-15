/**
 * Tests of `Popover`: its trigger is a real button, and its title and description name and
 * describe the open panel.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Popover from './Popover.svelte';

describe('Popover', () => {
	it('opens from a button and names the panel by its title', async () => {
		const { getByRole, findByRole } = render(Popover, {
			title: 'Layer size',
			description: 'Width and height of the layer.',
			trigger: createRawSnippet(() => ({ render: () => '<span>Resize</span>' }))
		});
		const trigger = getByRole('button', { name: 'Resize' });
		expect(trigger.tagName).toBe('BUTTON');
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		await fireEvent.click(trigger);
		const panel = await findByRole('dialog', { name: 'Layer size' });
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		const descriptionId = panel.getAttribute('aria-describedby') ?? '';
		expect(document.getElementById(descriptionId)?.textContent?.trim()).toBe(
			'Width and height of the layer.'
		);
	});

	it('starts open from defaultOpen when open is not bound', async () => {
		const { findByRole } = render(Popover, { title: 'Layer size', defaultOpen: true });
		expect(await findByRole('dialog', { name: 'Layer size' })).toBeTruthy();
	});
});
