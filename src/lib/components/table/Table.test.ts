/**
 * Tests of `Table`: a header per column, and each row's cells as the field's text or as the
 * column's `cell` snippet rendered with the row.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import TableFixture from './Table.test.svelte';

describe('Table', () => {
	it('shows each field as text, or through the column snippet', () => {
		const { getByRole, getAllByRole } = render(TableFixture);
		expect(getByRole('table', { name: 'Scores' })).toBeTruthy();
		expect(getAllByRole('columnheader').map((header) => header.textContent?.trim())).toEqual([
			'Name',
			'Score'
		]);
		const cells = getAllByRole('cell').map((cell) =>
			cell.innerHTML.replaceAll('<!---->', '').trim()
		);
		expect(cells).toEqual([
			'Alice',
			'<strong>3 points</strong>',
			'Bob',
			'<strong>5 points</strong>'
		]);
	});
});
