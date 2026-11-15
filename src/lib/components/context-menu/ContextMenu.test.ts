/**
 * Tests of `ContextMenu`: a titled group is a menu group named by its title and holding its items,
 * an untitled group's items sit in the menu itself, and a line separates the groups.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render, within } from '@testing-library/svelte';
import ContextMenu from './ContextMenu.svelte';

const groups = [
	{
		id: 'actions',
		label: 'Actions',
		items: [
			{ id: 'edit', label: 'Edit' },
			{ id: 'copy', label: 'Copy', disabled: true }
		]
	},
	{ id: 'danger', items: [{ id: 'delete', label: 'Delete' }] }
];

describe('ContextMenu', () => {
	it('names each titled group by its title and separates the groups', async () => {
		const { findByRole } = render(ContextMenu, { groups, open: true });
		const menu = await findByRole('menu');
		const actions = within(menu).getByRole('group', { name: 'Actions' });
		expect(
			within(actions)
				.getAllByRole('menuitem')
				.map((item) => item.textContent?.trim())
		).toEqual(['Edit', 'Copy']);
		expect(within(actions).getByRole('menuitem', { name: 'Copy' }).dataset.disabled).toBe('');
		expect(within(menu).getAllByRole('group')).toHaveLength(1);
		expect(within(menu).getAllByRole('separator')).toHaveLength(1);
		const remove = within(menu).getByRole('menuitem', { name: 'Delete' });
		expect(remove.parentElement).toBe(menu);
	});
});
