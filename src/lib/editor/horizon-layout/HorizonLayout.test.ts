/**
 * Tests of `HorizonLayout`'s own part: the restore button, shown only while a view is maximised,
 * named by `restoreLabel`, restoring the layout when pressed, and replaced by `restoreButton`; and
 * the `translations` it passes on, which name the split handles, the tab lists and the floating
 * panels.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { fireEvent, render } from '@testing-library/svelte';
import type { Id, LayoutConfig, LayoutTranslations, View } from 'horizon-layout';
import HorizonLayout from './HorizonLayout.svelte';

/** A view whose body is its title, for `views`. */
function view(title: string): View {
	return { title, snippet: createRawSnippet(() => ({ render: () => `<p>${title} body</p>` })) };
}

function setup(
	config: LayoutConfig,
	extra: { restoreButton?: ReturnType<typeof createRawSnippet<[Id]>> } = {}
) {
	return render(HorizonLayout, {
		config,
		views: new SvelteMap<Id, View>([
			['scene', view('Scene')],
			['console', view('Console')]
		]),
		restoreLabel: 'Restore view',
		translations,
		...extra
	});
}

/** Text unlike horizon-layout's English, to tell it apart. */
const translations: LayoutTranslations = {
	resizePane: (pane) => `Redimensionner le panneau ${pane}`,
	floatingPanel: (title) => `${title}, panneau flottant`,
	tabList: (title) => `Onglets, ${title} affiché`
};

const split: LayoutConfig['root'] = {
	direction: 'horizontal',
	views: [
		{ tabs: ['scene'], activeTabIndex: 0 },
		{ tabs: ['console'], activeTabIndex: 0 }
	],
	splitPoints: [0.5]
};

describe('HorizonLayout', () => {
	it('shows no restore button while no view is maximised', () => {
		const { queryByRole } = setup({ root: split });
		expect(queryByRole('button', { name: 'Restore view' })).toBeNull();
	});

	it('restores a maximised view with its restore button', async () => {
		const { getByRole, queryByRole } = setup({ root: split, maximizedView: 'scene' });
		await fireEvent.click(getByRole('button', { name: 'Restore view' }));
		expect(queryByRole('button', { name: 'Restore view' })).toBeNull();
	});

	it('renders restoreButton instead, with the maximised view', () => {
		const restoreButton = createRawSnippet<[Id]>((id) => ({
			render: () => `<button type="button">Restore ${id()}</button>`
		}));
		const { getByRole, queryByRole } = setup(
			{ root: split, maximizedView: 'console' },
			{ restoreButton }
		);
		expect(getByRole('button', { name: 'Restore console' })).toBeTruthy();
		expect(queryByRole('button', { name: 'Restore view' })).toBeNull();
	});

	it('names the split handles and tab lists with its translations', () => {
		const { getByRole } = setup({ root: split });
		expect(getByRole('separator', { name: 'Redimensionner le panneau 1' })).toBeTruthy();
		expect(getByRole('tablist', { name: 'Onglets, Scene affiché' })).toBeTruthy();
		expect(getByRole('tablist', { name: 'Onglets, Console affiché' })).toBeTruthy();
	});

	it('names a floating panel with its translations', () => {
		const { getByRole } = setup({
			root: { tabs: ['scene'], activeTabIndex: 0 },
			floating: [
				{ tabs: ['console'], activeTabIndex: 0, rect: { x: 10, y: 10, width: 200, height: 120 } }
			]
		});
		expect(getByRole('dialog', { name: 'Console, panneau flottant' })).toBeTruthy();
	});
});
