/**
 * Tests of `PopoverClose`: the button is named by its `label`, never by Ark's English default, and
 * closes its popover; an icon-only one shows its `label` as a tooltip.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Fixture from './PopoverClose.test.svelte';
import { expectTooltip } from '../../../test/tooltip';

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
		await expectTooltip(close, 'Close');
	});
});
