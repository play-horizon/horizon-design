<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Item } from '$lib/components/item';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteSettings1Line from '~icons/mingcute/settings-1-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
</script>

<section id="item">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Item</h2>
	<Card>
		<div class="flex flex-col gap-0.5">
			<Item>
				<MingcuteUser1Line class="text-muted-foreground size-4" />
				<span class="text-sm">Profile</span>
			</Item>
			<Item>
				<MingcuteSettings1Line class="text-muted-foreground size-4" />
				<span class="text-sm">Settings</span>
			</Item>
			<Item>
				<MingcuteNotificationLine class="text-muted-foreground size-4" />
				<span class="text-sm">Notifications</span>
			</Item>
		</div>
	</Card>
</section>
