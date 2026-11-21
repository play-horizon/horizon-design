<!--
@component
Docs: Dialog. A playground over its texts, parts and closing behaviour, then a confirmation
dialog, a dialog opened from outside (`bind:open`), the icon form of `DialogClose`, and a frosted
dialog over game art.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Dialog, DialogClose } from '#lib/components/dialog/index.js';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteWindowsLine from '~icons/mingcute/windows-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
	import { art } from '../examples';

	let renameOpen = $state(false);
</script>

<div class="grid gap-4">
	<Playground
		description="Open the dialog after changing a control."
		controls={{
			title: text('Leave the game?'),
			description: text('Your progress since the last checkpoint is lost.'),
			closeLabel: text('Close'),
			showClose: boolean(true),
			body: boolean(true),
			footer: boolean(true),
			frosted: boolean(),
			role: choice(['dialog', 'alertdialog']),
			modal: boolean(true),
			closeOnEscape: boolean(true),
			closeOnInteractOutside: boolean(true)
		}}
	>
		{#snippet example(values)}
			{#snippet body()}
				<p class="text-sm text-muted">The other players keep playing without you.</p>
			{/snippet}
			{#snippet footer()}
				<DialogClose class={buttonVariants({ variant: 'ghost' })}>Stay</DialogClose>
				<DialogClose class={buttonVariants({ variant: 'danger' })}>Leave</DialogClose>
			{/snippet}
			<Dialog
				title={values.title}
				description={values.description}
				closeLabel={values.closeLabel}
				showClose={values.showClose}
				frosted={values.frosted}
				role={values.role}
				modal={values.modal}
				closeOnEscape={values.closeOnEscape}
				closeOnInteractOutside={values.closeOnInteractOutside}
				triggerClass={buttonVariants({ variant: 'default' })}
				children={values.body ? body : undefined}
				footer={values.footer ? footer : undefined}
			>
				{#snippet trigger()}
					<MingcuteWindowsLine class="size-4" aria-hidden="true" />
					Open the dialog
				{/snippet}
			</Dialog>
		{/snippet}
	</Playground>
	<Card title="Confirmation" description="A title, a description, a body and a footer.">
		<Dialog
			closeLabel="Close"
			title="Delete the game?"
			description="This can't be undone."
			triggerClass={buttonVariants({ variant: 'danger' })}
		>
			{#snippet trigger()}
				<MingcuteDelete2Line class="size-4" aria-hidden="true" />
				Delete
			{/snippet}
			<p class="text-sm text-muted">
				Neon Drift, its versions and its saved worlds are removed for every player.
			</p>
			{#snippet footer()}
				<DialogClose class={buttonVariants({ variant: 'default' })}>Cancel</DialogClose>
				<Button variant="danger-solid">
					<MingcuteDelete2Line class="size-4" aria-hidden="true" />
					Delete the game
				</Button>
			{/snippet}
		</Dialog>
	</Card>
	<Card
		title="Opened from outside"
		description="No trigger: the app opens it with bind:open, here from a button."
	>
		<Button onclick={() => (renameOpen = true)}>Rename the world</Button>
		<Dialog bind:open={renameOpen} closeLabel="Close" title="Rename the world">
			<p class="text-sm text-muted">The new name shows in the game's world list.</p>
			{#snippet footer()}
				<Button variant="primary" onclick={() => (renameOpen = false)}>Done</Button>
			{/snippet}
		</Dialog>
	</Card>
	<Card
		title="Its own close button"
		description="showClose off, with DialogClose's icon form placed in the body: its label is its name and tooltip."
	>
		<Dialog
			closeLabel="Close"
			showClose={false}
			title="Controls"
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}Show the controls{/snippet}
			<DialogClose label="Close the controls" />
			<p class="text-sm text-muted">Move with WASD, jump with Space.</p>
		</Dialog>
	</Card>
	<Card
		title="Frosted"
		description="For an overlay above busy content, such as a running game: a translucent, blurred surface."
	>
		<div class="relative overflow-hidden rounded-lg p-6">
			<img src={art.neon} alt="" class="absolute inset-0 size-full object-cover" />
			<Dialog
				frosted
				closeLabel="Close"
				title="Paused"
				description="The game keeps running for the other players."
				triggerClass="relative {buttonVariants({ variant: 'default' })}"
			>
				{#snippet trigger()}Open a frosted dialog{/snippet}
				{#snippet footer()}
					<DialogClose class={buttonVariants({ variant: 'primary' })}>Resume</DialogClose>
				{/snippet}
			</Dialog>
		</div>
	</Card>
</div>
