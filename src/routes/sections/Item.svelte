<!--
@component
Docs: Item. Live examples of the Item component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Item } from '$lib/components/item';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteSettings1Line from '~icons/mingcute/settings-1-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
</script>

<section id="item">
	<Card>
		<div class="flex flex-col gap-0.5">
			<Item>
				<MingcuteUser1Line class="size-4 text-muted" aria-hidden="true" />
				<span class="text-sm">Profile</span>
			</Item>
			<Item>
				<MingcuteSettings1Line class="size-4 text-muted" aria-hidden="true" />
				<span class="text-sm">Settings</span>
			</Item>
			<Item>
				<MingcuteNotificationLine class="size-4 text-muted" aria-hidden="true" />
				<span class="text-sm">Notifications</span>
			</Item>
		</div>
	</Card>
</section>
