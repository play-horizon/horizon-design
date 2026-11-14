/**
 * Tests of `Combobox`: typing keeps the options whose label contains the text, ignoring case
 * and accents, and shows `emptyText` when none does.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Combobox from './Combobox.svelte';

const items = [
	{ label: 'Café racer', value: 'cafe' },
	{ label: 'Rally', value: 'rally' },
	{ label: 'Drift', value: 'drift' }
];

function setup() {
	const view = render(Combobox, {
		items,
		label: 'Mode',
		emptyText: 'No match',
		translations: { triggerLabel: 'Show modes' }
	});
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
});
