<!--
@component
Docs: AlertDialog. A playground over every prop (its texts, the frosted surface, extra content,
closing on Escape or on a click outside), then the solid and frosted dialogs, one with extra
content, and one opened from the app's own button through `open`.
-->
<script lang="ts">
	import { AlertDialog } from '#lib/components/alert-dialog/index.js';
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	let confirmed = $state('');
	let open = $state(false);
</script>

{#snippet deleteTrigger()}
	<MingcuteDelete2Line aria-hidden="true" />
	Delete game
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			title: text('Delete this game?'),
			description: text('Its places, assets and saves are deleted too. This cannot be undone.'),
			cancelLabel: text('Cancel'),
			actionLabel: text('Delete game'),
			frosted: boolean(),
			body: boolean(),
			closeOnEscape: boolean(true),
			closeOnInteractOutside: boolean(true)
		}}
	>
		{#snippet example(values)}
			<AlertDialog
				trigger={deleteTrigger}
				triggerClass={buttonVariants({ variant: 'danger' })}
				title={values.title}
				description={values.description}
				cancelLabel={values.cancelLabel}
				actionLabel={values.actionLabel}
				frosted={values.frosted}
				closeOnEscape={values.closeOnEscape}
				closeOnInteractOutside={values.closeOnInteractOutside}
				onAction={() => (confirmed = values.actionLabel)}
			>
				{#if values.body}
					<p class="text-sm">Sky Racer has 1,204 players this week.</p>
				{/if}
			</AlertDialog>
		{/snippet}
	</Playground>
	<Card title="Variants" description="Cancel takes the focus, so Enter never confirms by accident.">
		<div class="flex flex-wrap items-center gap-2">
			<AlertDialog
				trigger={deleteTrigger}
				triggerClass={buttonVariants({ variant: 'danger' })}
				title="Delete this game?"
				description="This cannot be undone."
				cancelLabel="Cancel"
				actionLabel="Delete game"
				onAction={() => (confirmed = 'Delete game')}
			/>
			{#snippet frostedTrigger()}Frosted{/snippet}
			<AlertDialog
				trigger={frostedTrigger}
				triggerClass={buttonVariants()}
				frosted
				title="Leave the session?"
				description="Your unsaved changes are lost."
				cancelLabel="Stay"
				actionLabel="Leave"
				onAction={() => (confirmed = 'Leave')}
			/>
			{#snippet bodyTrigger()}With content{/snippet}
			<AlertDialog
				trigger={bodyTrigger}
				triggerClass={buttonVariants()}
				title="Remove 3 members?"
				description="They lose access to the game's places at once."
				cancelLabel="Cancel"
				actionLabel="Remove members"
				onAction={() => (confirmed = 'Remove members')}
			>
				<ul class="list-inside list-disc text-sm">
					<li>Sam Ito</li>
					<li>Kofi Owusu</li>
					<li>Lena Novak</li>
				</ul>
			</AlertDialog>
			<Button onclick={() => (open = true)}>Opened by the app</Button>
			<AlertDialog
				bind:open
				title="Reset the layout?"
				description="Every panel goes back to its default place."
				cancelLabel="Cancel"
				actionLabel="Reset"
				onAction={() => (confirmed = 'Reset')}
			/>
		</div>
		<p class="mt-3 text-sm text-muted" role="status">
			{confirmed ? `Confirmed: ${confirmed}` : 'Nothing confirmed yet.'}
		</p>
	</Card>
</div>
