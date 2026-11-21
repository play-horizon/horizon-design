/**
 * Tests of `IconButton`: its label is both its accessible name and its tooltip.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import { expectTooltip } from '../../../test/tooltip';
import IconButton from './IconButton.svelte';

const icon = createRawSnippet(() => ({ render: () => '<span aria-hidden="true">x</span>' }));

describe('IconButton', () => {
	it('is named by its label, shows it as a tooltip and runs its action', async () => {
		const onclick = vi.fn();
		const { getByRole } = render(IconButton, {
			props: { label: 'Delete', onclick, children: icon }
		});
		const button = getByRole('button', { name: 'Delete' });
		expect(button.getAttribute('type')).toBe('button');

		await fireEvent.click(button);
		expect(onclick).toHaveBeenCalledOnce();

		await expectTooltip(button, 'Delete');
	});
});
