/**
 * Tests of `Combobox`: typing keeps the options whose label contains the text, ignoring case
 * and accents, and shows `emptyText` when none does; Ark announces the options found only in
 * the messages `translations` gives.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { ComponentProps } from 'svelte';
import Combobox from './Combobox.svelte';

const items = [
	{ label: 'Café racer', value: 'cafe' },
	{ label: 'Rally', value: 'rally' },
	{ label: 'Drift', value: 'drift' }
];

function setup(
	translations: ComponentProps<typeof Combobox>['translations'] = { triggerLabel: 'Show modes' }
) {
	const view = render(Combobox, { items, label: 'Mode', emptyText: 'No match', translations });
	return { ...view, input: view.getByRole('combobox', { name: 'Mode' }) as HTMLInputElement };
}

async function type(input: HTMLInputElement, text: string) {
	input.focus();
	input.value = text;
	await fireEvent.input(input);
}

describe('Combobox', () => {
	it('filters the options by their label, ignoring case and accents', async () => {
		const { input, getAllByRole } = setup();
		await type(input, 'CAFE');
		await waitFor(() =>
			expect(getAllByRole('option').map((option) => option.textContent?.trim())).toEqual([
				'Café racer'
			])
		);
	});

	it('shows the empty text when nothing matches', async () => {
		const { input, queryAllByRole, getByText } = setup();
		await type(input, 'kart');
		await waitFor(() => expect(queryAllByRole('option')).toEqual([]));
		expect(getByText('No match')).toBeTruthy();
	});

	/** The text of Ark's live regions once its announcement delay (1 s) has passed. */
	async function announcements(): Promise<string[]> {
		await new Promise((resolve) => setTimeout(resolve, 1200));
		return [...document.querySelectorAll<HTMLElement>('[data-live-announcer]')]
			.map((region) => region.textContent ?? '')
			.filter((text) => text !== '');
	}

	it('announces nothing when translations gives no announcement', async () => {
		const { input } = setup();
		await type(input, 'r');
		expect(await announcements()).toEqual([]);
	});

	it('announces the options found in the messages translations gives', async () => {
		const { input } = setup({
			triggerLabel: 'Show modes',
			resultsCount: (count) => `${count} modes`,
			noResults: 'No mode',
			loading: 'Looking for modes'
		});
		await type(input, 'ra');
		expect(await announcements()).toEqual(['2 modes']);
	});
});
