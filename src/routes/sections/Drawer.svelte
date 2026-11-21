<!--
@component
Docs: Drawer. A playground over its texts, parts, surface and closing behaviour, then a filters
drawer with a footer, a drawer opened from outside (`bind:open`), and a frosted one.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Checkbox } from '#lib/components/checkbox/index.js';
	import { Drawer, DrawerClose } from '#lib/components/drawer/index.js';
	import MingcuteFilterLine from '~icons/mingcute/filter-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	let friendsOpen = $state(false);
</script>

<div class="grid gap-4">
	<Playground
		description="Open the drawer after changing a control. It is swiped right to dismiss."
		controls={{
			title: text('Settings'),
			description: text('Changes apply to this device only.'),
			closeLabel: text('Close'),
			showClose: boolean(true),
			body: boolean(true),
			footer: boolean(true),
			frosted: boolean(),
			modal: boolean(true),
			closeOnEscape: boolean(true),
			closeOnInteractOutside: boolean(true)
		}}
	>
		{#snippet example(values)}
			{#snippet body()}
				<p class="text-sm text-muted">Audio, graphics and controls.</p>
			{/snippet}
			{#snippet footer()}
				<DrawerClose class={buttonVariants({ variant: 'default' })}>Cancel</DrawerClose>
				<DrawerClose class={buttonVariants({ variant: 'primary' })}>Save</DrawerClose>
			{/snippet}
			<Drawer
				title={values.title}
				description={values.description}
				closeLabel={values.closeLabel}
				showClose={values.showClose}
				frosted={values.frosted}
				modal={values.modal}
				closeOnEscape={values.closeOnEscape}
				closeOnInteractOutside={values.closeOnInteractOutside}
				triggerClass={buttonVariants({ variant: 'default' })}
				children={values.body ? body : undefined}
				footer={values.footer ? footer : undefined}
			>
				{#snippet trigger()}Open the drawer{/snippet}
			</Drawer>
		{/snippet}
	</Playground>
	<Card title="Filters" description="A body and a footer with its actions.">
		<Drawer
			closeLabel="Close"
			title="Filters"
			description="Narrow the list of games."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}
				<MingcuteFilterLine class="size-4" aria-hidden="true" />
				Filters
			{/snippet}
			<div class="grid gap-3">
				<Checkbox label="Multiplayer" defaultChecked />
				<Checkbox label="Free to play" />
				<Checkbox label="Controller support" />
			</div>
			{#snippet footer()}
				<DrawerClose class={buttonVariants({ variant: 'default' })}>Cancel</DrawerClose>
				<DrawerClose class={buttonVariants({ variant: 'primary' })}>Apply</DrawerClose>
			{/snippet}
		</Drawer>
	</Card>
	<Card
		title="Opened from outside"
		description="No trigger: the app opens it with bind:open, here from a button."
	>
		<Button onclick={() => (friendsOpen = true)}>Show friends</Button>
		<Drawer bind:open={friendsOpen} closeLabel="Close" title="Friends">
			<p class="text-sm text-muted">3 friends are online.</p>
		</Drawer>
	</Card>
	<Card title="Frosted" description="A translucent, blurred surface, for overlays over a game.">
		<Drawer
			frosted
			closeLabel="Close"
			title="Players"
			description="12 players in this world."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}Open a frosted drawer{/snippet}
		</Drawer>
	</Card>
</div>
