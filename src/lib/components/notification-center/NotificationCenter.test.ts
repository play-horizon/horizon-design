/**
 * Tests of `NotificationCenter`: the empty state, unread notifications and "mark all as read",
 * and each notification's actions.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import NotificationCenter, { type NotificationEntry } from './NotificationCenter.svelte';

const texts = {
	heading: 'Notifications',
	emptyText: 'You are all caught up.',
	markAllLabel: 'Mark all as read',
	unreadLabel: 'unread'
};

const items: NotificationEntry[] = [
	{ id: 'i', title: 'sam_j invites you to Neon Drift', time: '5 minutes ago', unread: true },
	{ id: 'p', title: 'Harbor Tycoon was published', time: 'Yesterday', unread: false, href: '/g/h' }
];

describe('NotificationCenter', () => {
	it('says so when there is no notification', () => {
		const { getByText, queryByRole } = render(NotificationCenter, { ...texts, items: [] });
		expect(getByText('You are all caught up.')).toBeTruthy();
		expect(queryByRole('button', { name: 'Mark all as read' })).toBeNull();
	});

	it('lists notifications, marks the unread ones, and offers to mark all read', async () => {
		const onMarkAllRead = vi.fn();
		const actions = createRawSnippet((item: () => NotificationEntry) => ({
			render: () => `<button type="button">Accept ${item().id}</button>`
		}));
		const { getByRole, getAllByRole, getByText } = render(NotificationCenter, {
			...texts,
			items,
			onMarkAllRead,
			actions
		});
		expect(getByRole('region', { name: 'Notifications' })).toBeTruthy();
		expect(getAllByRole('listitem')).toHaveLength(2);
		expect(getByText('(unread)')).toBeTruthy();
		expect(getByRole('link', { name: 'Harbor Tycoon was published' }).getAttribute('href')).toBe(
			'/g/h'
		);
		expect(getByRole('button', { name: 'Accept i' })).toBeTruthy();
		await fireEvent.click(getByRole('button', { name: 'Mark all as read' }));
		expect(onMarkAllRead).toHaveBeenCalledOnce();
	});
});
