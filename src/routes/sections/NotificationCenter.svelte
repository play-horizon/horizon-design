<!--
@component
Docs: NotificationCenter. An invitation with Accept and Decline, a publish status, and the empty
state.
-->
<script lang="ts">
	import {
		NotificationCenter,
		type NotificationEntry
	} from '#lib/components/notification-center/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { art } from '../examples';

	let items = $state<NotificationEntry[]>([
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
			unread: true
		},
		{ id: 'role', title: 'You are now a playtester of Lab Rats', time: '3 days ago', unread: false }
	]);

	function markAllRead() {
		items = items.map((item) => ({ ...item, unread: false }));
	}

	function answer(id: string) {
		items = items.filter((item) => item.id !== id);
	}
</script>

<div class="grid grid-cols-2 gap-4">
	<Card class="overflow-hidden [&>[data-slot=card-content]]:p-0">
		<NotificationCenter
			{items}
			heading="Notifications"
			emptyText="You're all caught up."
			markAllLabel="Mark all as read"
			unreadLabel="unread"
			onMarkAllRead={markAllRead}
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
			heading="Notifications"
			emptyText="You're all caught up."
			markAllLabel="Mark all as read"
			unreadLabel="unread"
		/>
	</Card>
</div>
