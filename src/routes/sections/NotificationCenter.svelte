<!--
@component
Docs: NotificationCenter. A playground over every prop (its texts, "mark all as read", the
notifications' actions and the empty state), then an invitation with Accept and Decline, a
publish status with a link, a read notification, and the empty state.
-->
<script lang="ts">
	import {
		NotificationCenter,
		type NotificationEntry
	} from '#lib/components/notification-center/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	const sample: NotificationEntry[] = [
		{
			id: 'invite',
			title: 'sam_j invites you to Neon Drift as a developer',
			time: '5 minutes ago',
			unread: true,
			image: art.icon
		},
		{
			id: 'publish',
			title: 'Harbor Tycoon was published',
			body: 'Release 18 is live.',
			time: 'Yesterday',
			unread: true,
			href: '#top'
		},
		{ id: 'role', title: 'You are now a playtester of Lab Rats', time: '3 days ago', unread: false }
	];

	let items = $state<NotificationEntry[]>(sample);
	let playgroundItems = $state<NotificationEntry[]>(sample);

	function markAllRead(list: NotificationEntry[]): NotificationEntry[] {
		return list.map((item) => ({ ...item, unread: false }));
	}

	function answer(id: string) {
		items = items.filter((item) => item.id !== id);
	}
</script>

{#snippet invitationButtons(item: NotificationEntry)}
	{#if item.id === 'invite'}
		<Button size="xs" variant="primary">Accept</Button>
		<Button size="xs">Decline</Button>
	{/if}
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			heading: text('Notifications'),
			emptyText: text('No notifications.'),
			markAllLabel: text('Mark all as read'),
			unreadLabel: text('unread'),
			markAll: boolean(true),
			actions: boolean(true),
			empty: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="w-full max-w-md overflow-hidden rounded-lg border border-border bg-surface">
				<NotificationCenter
					items={values.empty ? [] : playgroundItems}
					heading={values.heading}
					emptyText={values.emptyText}
					markAllLabel={values.markAllLabel}
					unreadLabel={values.unreadLabel}
					onMarkAllRead={values.markAll
						? () => (playgroundItems = markAllRead(playgroundItems))
						: undefined}
					actions={values.actions ? invitationButtons : undefined}
				/>
				<div class="border-t border-border p-2 text-right">
					<Button size="xs" variant="ghost" onclick={() => (playgroundItems = sample)}>
						Reset
					</Button>
				</div>
			</div>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card class="overflow-hidden [&>[data-slot=card-content]]:p-0">
			<NotificationCenter
				{items}
				heading="Inbox"
				emptyText="No notifications."
				markAllLabel="Mark all as read"
				unreadLabel="unread"
				onMarkAllRead={() => (items = markAllRead(items))}
			>
				{#snippet actions(item)}
					{#if item.id === 'invite'}
						<Button size="xs" variant="primary" onclick={() => answer(item.id)}>Accept</Button>
						<Button size="xs" onclick={() => answer(item.id)}>Decline</Button>
					{/if}
				{/snippet}
			</NotificationCenter>
		</Card>
		<Card class="overflow-hidden [&>[data-slot=card-content]]:p-0">
			<NotificationCenter
				items={[]}
				heading="Empty inbox"
				emptyText="No notifications."
				markAllLabel="Mark all as read"
				unreadLabel="unread"
			/>
		</Card>
	</div>
</div>
