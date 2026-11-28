/**
 * Tests of `Combobox`: typing keeps the options whose label contains the text, ignoring case
 * and accents, and shows `emptyText` when none does; Ark announces the options found only in
 * the messages `translations` gives, and, on an Apple device, the option the keyboard moves to
 * by its label alone or in the text `highlightedItem` gives; the open button shows its name in
 * a tooltip; and
 * `openOnClick` opens the options from a press on the field, which keeps the focus for typing.
 * @module
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { ComponentProps } from 'svelte';
import userEvent from '@testing-library/user-event';
import Combobox from './Combobox.svelte';
import { expectTooltip } from '../../../test/tooltip';

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

	it('announces nothing for a message translations leaves undefined', async () => {
		const { input } = setup({ triggerLabel: 'Show modes', resultsCount: undefined });
		await type(input, 'ra');
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

	describe('on an Apple device', () => {
		beforeEach(() => {
			vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
		});
		afterEach(() => {
			vi.restoreAllMocks();
		});

		/**
		 * Renders the combobox with Rally chosen, opens it, which highlights the chosen option, and
		 * moves down to the next one, Drift: what was announced after each.
		 */
		async function highlightChosenThenNext(
			translations: ComponentProps<typeof Combobox>['translations']
		): Promise<string[][]> {
			const view = render(Combobox, {
				items,
				label: 'Mode',
				emptyText: 'No match',
				translations,
				defaultValue: ['rally']
			});
			const user = userEvent.setup();
			await user.click(view.getByRole('button', { name: 'Show modes' }));
			const first = await announcements();
			await user.keyboard('{ArrowDown}');
			return [first, await announcements()];
		}

		it('announces the highlighted option by its label alone without highlightedItem', async () => {
			expect(await highlightChosenThenNext({ triggerLabel: 'Show modes' })).toEqual([
				['Rally'],
				['Drift']
			]);
		});

		it('announces the highlighted option in the text highlightedItem gives', async () => {
			expect(
				await highlightChosenThenNext({
					triggerLabel: 'Show modes',
					highlightedItem: ({ label, selected }) => (selected ? `${label}, choisi` : label)
				})
			).toEqual([['Rally, choisi'], ['Drift']]);
		});
	});

	it('names the open button in its tooltip', async () => {
		const { getByRole } = setup();
		await expectTooltip(getByRole('button', { name: 'Show modes' }), 'Show modes');
	});

	it('opens the options from a press on the field only with openOnClick', async () => {
		const content = () => document.querySelector('[data-slot="combobox-content"]');
		const user = userEvent.setup();
		const closed = setup();
		await user.click(closed.input);
		expect(content()?.getAttribute('data-state')).toBe('closed');
		closed.unmount();

		const { getByRole } = render(Combobox, {
			items,
			label: 'Mode',
			emptyText: 'No match',
			translations: { triggerLabel: 'Show modes' },
			openOnClick: true
		});
		const input = getByRole('combobox', { name: 'Mode' }) as HTMLInputElement;
		await user.click(input);
		await waitFor(() => expect(content()?.getAttribute('data-state')).toBe('open'));
		expect(document.querySelectorAll('[data-slot="combobox-item"]')).toHaveLength(3);
		await user.keyboard('ral');
		expect(document.activeElement).toBe(input);
		expect(
			[...document.querySelectorAll('[data-slot="combobox-item"]')].map((item) =>
				item.textContent?.trim()
			)
		).toEqual(['Rally']);
	});

	it('keeps its open button its own: Ark finds it and opens the options from it', async () => {
		const { getByRole } = setup();
		const button = getByRole('button', { name: 'Show modes' });
		expect(button.getAttribute('data-scope')).toBe('combobox');
		expect(button.getAttribute('data-part')).toBe('trigger');
		await fireEvent.click(button);
		await waitFor(() =>
			expect(
				document.querySelector('[data-slot="combobox-content"]')?.getAttribute('data-state')
			).toBe('open')
		);
	});
});
