<!--
@component
Docs: Menu. Live examples of the Menu component.
-->
<script lang="ts">
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import {
		Menu,
		MenuGroup,
		MenuGroupLabel,
		MenuItem,
		MenuSeparator
	} from '#lib/components/menu/index.js';
	import MingcuteCardPayLine from '~icons/mingcute/card-pay-line';
	import MingcuteExitDoorLine from '~icons/mingcute/exit-door-line';
	import MingcuteMore2Line from '~icons/mingcute/more-2-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import MingcuteUser2Line from '~icons/mingcute/user-2-line';
</script>

<section id="menu">
	<Card>
		<Menu triggerClass={buttonVariants({ variant: 'default' })}>
			{#snippet trigger()}
				<MingcuteMore2Line class="size-4" aria-hidden="true" />
				Open Menu
			{/snippet}
			<MenuGroup>
				<MenuGroupLabel>Account</MenuGroupLabel>
				<MenuItem value="profile">
					<MingcuteUser2Line class="size-4" aria-hidden="true" />
					Profile
				</MenuItem>
				<MenuItem value="settings">
					<MingcuteSettings3Line class="size-4" aria-hidden="true" />
					Settings
				</MenuItem>
				<MenuItem value="billing">
					<MingcuteCardPayLine class="size-4" aria-hidden="true" />
					Billing
				</MenuItem>
			</MenuGroup>
			<MenuSeparator />
			<MenuItem value="logout">
				<MingcuteExitDoorLine class="size-4" aria-hidden="true" />
				Log out
			</MenuItem>
		</Menu>
	</Card>
</section>
