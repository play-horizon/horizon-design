/**
 * Tests of `Menu`: an icon-only trigger is named by its `triggerLabel`, shows it as a tooltip, and
 * still opens the menu it names.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Menu from './Menu.svelte';
import { expectTooltip } from '../../../test/tooltip';

const icon = createRawSnippet(() => ({ render: () => '<span aria-hidden="true">…</span>' }));

describe('Menu', () => {
	it('names an icon-only trigger by its triggerLabel, shown as a tooltip', async () => {
		const { getByRole } = render(Menu, { triggerLabel: 'More actions', trigger: icon });
		const trigger = getByRole('button', { name: 'More actions' });

		await expectTooltip(trigger, 'More actions');

		await fireEvent.click(trigger);
		await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'));
		expect(getByRole('menu', { hidden: true }).getAttribute('aria-labelledby')).toBe(trigger.id);
	});
});
