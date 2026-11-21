/**
 * Tests of `Sheet`: its trigger is a button, its title names the open panel, its close button is
 * named by `closeLabel` and shows it as a tooltip, and an icon-only trigger is named by its
 * `triggerLabel`, shown as a tooltip.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Sheet from './Sheet.svelte';
import { expectTooltip } from '../../../test/tooltip';

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
		await expectTooltip(trigger, 'Open the menu');

		await fireEvent.click(trigger);
		const sheet = await findByRole('dialog', { name: 'Menu' });
		const close = getByRole('button', { name: 'Close the menu' });
		expect(sheet.contains(close)).toBe(true);
		await expectTooltip(close, 'Close the menu', 'pointer');
	});
});
