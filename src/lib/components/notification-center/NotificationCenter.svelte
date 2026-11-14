<!--
@component
The notification centre: a heading with "Mark all as read", then the account's notifications,
newest first, each with its image (a game's icon), its text, its time and, while unread, a dot.
`actions` renders a notification's buttons (Accept and Decline for an invitation); a notification
with an `href` is a link. With no notification, `emptyText` shows instead. The app passes every
text translated and every time formatted.
-->
<script lang="ts" module>
	/** One notification as the centre shows it. */
	export interface NotificationEntry {
		/** A stable, unique id. */
		id: string;
		/** The notification's text. */
		title: string;
		/** A second line of detail. */
		body?: string;
		/** When it arrived, formatted ("2 hours ago"). */
		time: string;
		/** Whether the user has yet to read it: bold text, a tint and a dot. */
		unread: boolean;
		/** The image's URL, such as the game's icon. */
		image?: string;
		/** Where the notification leads, if anywhere. */
		href?: string;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import Button from '../button/Button.svelte';

	let {
		items,
		heading,
		emptyText,
		markAllLabel,
		onMarkAllRead,
		unreadLabel,
		actions,
		class: className = ''
	}: {
		/** The notifications, newest first. */
		items: readonly NotificationEntry[];
		/** The centre's heading, such as "Notifications". */
		heading: string;
		/** Shown when there is no notification. */
		emptyText: string;
		/** The "mark all as read" button's text; the button shows while one is unread. */
		markAllLabel: string;
		/** Called by "mark all as read"; without it, the button doesn't show. */
		onMarkAllRead?: () => void;
		/** Announced for an unread notification, such as "Unread". */
		unreadLabel: string;
		/** A notification's buttons. */
		actions?: Snippet<[NotificationEntry]>;
		/** Classes added to the centre's `<section>`. */
		class?: string;
	} = $props();

	const anyUnread = $derived(items.some((item) => item.unread));
	const headingId = $props.id();
</script>

<section
	aria-labelledby={headingId}
	class={cn('flex min-h-0 flex-col', className)}
	data-slot="notification-center"
>
	<header class="flex items-center gap-2 border-b border-border px-4 py-3">
		<h2 id={headingId} class="text-md font-bold">{heading}</h2>
		{#if anyUnread && onMarkAllRead}
			<Button variant="ghost" size="sm" class="ml-auto" onclick={onMarkAllRead}>
				{markAllLabel}
			</Button>
		{/if}
	</header>
	{#if items.length === 0}
		<p class="px-4 py-10 text-center text-sm text-muted">{emptyText}</p>
	{:else}
		<ul class="min-h-0 overflow-y-auto">
			{#each items as item (item.id)}
				<li
					class={cn(
						'relative flex gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-hover',
						item.unread && 'bg-primary-subtle/50'
					)}
				>
					{#if item.image}
						<img src={item.image} alt="" class="size-8 shrink-0 rounded-md object-cover" />
					{:else}
						<span class="grid size-8 shrink-0 place-items-center rounded-md bg-sunken text-muted">
							<MingcuteNotificationLine class="size-4" aria-hidden="true" />
						</span>
					{/if}
					<div class="min-w-0 flex-1">
						<p class={cn('text-sm', item.unread ? 'font-semibold text-fg' : 'text-fg-2')}>
							{#if item.href}
								<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes an href it has already resolved -->
								<a
									href={item.href}
									class="outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:ring-inset"
								>
									{item.title}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							{:else}
								{item.title}
							{/if}
							{#if item.unread}<span class="sr-only">({unreadLabel})</span>{/if}
						</p>
						{#if item.body}<p class="mt-0.5 text-xs text-muted">{item.body}</p>{/if}
						<p class="mt-0.5 text-xs text-faint">{item.time}</p>
						{#if actions}
							<div class="relative z-1 mt-2 flex flex-wrap gap-1.5">{@render actions(item)}</div>
						{/if}
					</div>
					{#if item.unread}
						<span class="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</section>
