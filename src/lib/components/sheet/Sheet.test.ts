/**
 * Tests of `Sheet`: its trigger is a button, its title names the open panel, and its close button
 * is named by `closeLabel`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Sheet from './Sheet.svelte';

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
});
