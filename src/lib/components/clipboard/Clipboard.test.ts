/**
 * Tests of `Clipboard`: the copy button copies the value, and its accessible name and its tooltip
 * are the same `triggerLabel`, before and after the copy.
 * @module
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Clipboard from './Clipboard.svelte';

describe('Clipboard', () => {
	afterEach(() => vi.unstubAllGlobals());

	it('names the copy button in its tooltip, before and after the copy', async () => {
		const writeText = vi.fn(() => Promise.resolve());
		vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
		const { getByRole } = render(Clipboard, {
			value: 'https://horizon.example/invite/42',
			translations: { triggerLabel: (copied: boolean) => (copied ? 'Link copied' : 'Copy link') }
		});
		const openTooltip = () =>
			getByRole('tooltip', { hidden: true }).dataset.state === 'open'
				? getByRole('tooltip', { hidden: true }).textContent?.trim()
				: undefined;

		const button = getByRole('button', { name: 'Copy link' });
		await fireEvent.pointerMove(button, { pointerType: 'mouse' });
		await waitFor(() => expect(openTooltip()).toBe('Copy link'));

		await fireEvent.click(button);
		expect(writeText).toHaveBeenCalledWith('https://horizon.example/invite/42');
		await waitFor(() => expect(getByRole('button', { name: 'Link copied' })).toBe(button));
		expect(openTooltip()).toBe('Link copied');
	});
});
