/**
 * Tests of `FacetedSearch`: choosing facet options, searching, sorting and clearing, each
 * reported through `onChange`, and focus kept when the clear button goes.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import FacetedSearch from './FacetedSearch.svelte';

const facets = [
	{
		id: 'tags',
		label: 'Tags',
		options: [
			{ id: 'obby', label: 'Obby', count: '12' },
			{ id: 'racing', label: 'Racing' }
		]
	}
];
const sorts = [
	{ id: 'players', label: 'Players now' },
	{ id: 'newest', label: 'Newest' }
];

function setup() {
	const onChange = vi.fn();
	const view = render(FacetedSearch, {
		facets,
		sorts,
		sort: 'players',
		searchLabel: 'Search games',
		sortLabel: 'Sort by',
		clearLabel: 'Clear filters',
		onChange
	});
	return { ...view, onChange };
}

describe('FacetedSearch', () => {
	it('reports the chosen options and clears them', async () => {
		const { getByRole, getByLabelText, getByText, onChange } = setup();
		expect(getByRole('group', { name: 'Tags' })).toBeTruthy();
		expect(getByText('12')).toBeTruthy();

		await fireEvent.click(getByLabelText('Obby'));
		expect(onChange).toHaveBeenLastCalledWith(
			expect.objectContaining({ selected: { tags: ['obby'] } })
		);

		await fireEvent.click(getByRole('button', { name: 'Clear filters' }));
		expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ selected: {} }));
		expect(document.activeElement).toBe(getByLabelText('Obby'));
	});

	it('reports the query and the sort', async () => {
		const { getByRole, onChange } = setup();
		await fireEvent.input(getByRole('searchbox', { name: 'Search games' }), {
			target: { value: 'sky' }
		});
		expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ query: 'sky' }));

		await fireEvent.change(getByRole('combobox', { name: 'Sort by' }), {
			target: { value: 'newest' }
		});
		expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ sort: 'newest' }));
	});
});
