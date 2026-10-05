<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuSeparator } from '$lib/components/menu';
	import MingcuteCardPayLine from '~icons/mingcute/card-pay-line';
	import MingcuteExitDoorLine from '~icons/mingcute/exit-door-line';
	import MingcuteMore2Line from '~icons/mingcute/more-2-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import MingcuteUser2Line from '~icons/mingcute/user-2-line';
</script>

<section id="menu">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Menu</h2>
	<Card>
		<Menu triggerClass={buttonVariants({ variant: 'outline' })}>
			{#snippet trigger()}
				<MingcuteMore2Line class="size-4" />
				Open Menu
			{/snippet}
			<MenuGroup>
				<MenuGroupLabel>Account</MenuGroupLabel>
				<MenuItem value="profile">
					<MingcuteUser2Line class="size-4" />
					Profile
				</MenuItem>
				<MenuItem value="settings">
					<MingcuteSettings3Line class="size-4" />
					Settings
				</MenuItem>
				<MenuItem value="billing">
					<MingcuteCardPayLine class="size-4" />
					Billing
				</MenuItem>
			</MenuGroup>
			<MenuSeparator />
			<MenuItem value="logout">
				<MingcuteExitDoorLine class="size-4" />
				Log out
			</MenuItem>
		</Menu>
	</Card>
</section>
