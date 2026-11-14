/**
 * Tests of `HorizonLayout`'s own part, the restore button: shown only while a view is maximised,
 * named by `restoreLabel`, restoring the layout when pressed, and replaced by `restoreButton`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { fireEvent, render } from '@testing-library/svelte';
import type { Id, LayoutConfig, View } from 'horizon-layout';
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
		...extra
	});
}

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
});
