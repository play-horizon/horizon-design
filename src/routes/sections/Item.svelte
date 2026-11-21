<!--
@component
Docs: Item. A playground over every prop, a menu of rows that are buttons or links, and a list of
plain rows that only display.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Item } from '#lib/components/item/index.js';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteSettings1Line from '~icons/mingcute/settings-1-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
	import Playground from '../playground/Playground.svelte';
	import { choice, text } from '../playground/controls';

	const rows = [
		{ id: 'profile', label: 'Profile', Icon: MingcuteUser1Line },
		{ id: 'settings', label: 'Settings', Icon: MingcuteSettings1Line },
		{ id: 'notifications', label: 'Notifications', Icon: MingcuteNotificationLine }
	];

	let pressed = $state('');
</script>

<div class="grid gap-4">
	<Playground controls={{ label: text('Profile'), action: choice(['none', 'href', 'onclick']) }}>
		{#snippet example(values)}
			<Item
				class="w-64"
				href={values.action === 'href' ? '#top' : undefined}
				onclick={values.action === 'onclick' ? () => {} : undefined}
			>
				<MingcuteUser1Line class="size-4 text-muted" aria-hidden="true" />
				<span class="text-sm">{values.label}</span>
			</Item>
		{/snippet}
	</Playground>
	<div class="grid gap-4 sm:grid-cols-2">
		<Card title="Interactive" description="Buttons (the first two) and a link.">
			<div class="flex flex-col gap-0.5">
				{#each rows as row (row.id)}
					{#if row.id === 'notifications'}
						<Item href="#top">
							<row.Icon class="size-4 text-muted" aria-hidden="true" />
							<span class="text-sm">{row.label}</span>
						</Item>
					{:else}
						<Item onclick={() => (pressed = row.label)}>
							<row.Icon class="size-4 text-muted" aria-hidden="true" />
							<span class="text-sm">{row.label}</span>
						</Item>
					{/if}
				{/each}
			</div>
			<p class="mt-2 text-xs text-muted">Pressed: {pressed || 'none'}</p>
		</Card>
		<Card title="Display only" description="No href, no onclick: no hover, no pointer.">
			<div class="flex flex-col gap-0.5" role="list">
				{#each rows as row (row.id)}
					<Item role="listitem">
						<row.Icon class="size-4 text-muted" aria-hidden="true" />
						<span class="text-sm">{row.label}</span>
					</Item>
				{/each}
			</div>
		</Card>
	</div>
</div>
