<!--
@component
Docs: Dialog. A confirmation dialog, and a frosted one over game art.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Dialog, DialogClose } from '#lib/components/dialog/index.js';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteWindowsLine from '~icons/mingcute/windows-line';
	import { art } from '../examples';
</script>

<section id="dialog">
	<Card>
		<Dialog
			closeLabel="Close"
			title="Confirm Deletion"
			description="Are you sure you want to proceed? This action cannot be undone."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}
				<MingcuteWindowsLine class="size-4" aria-hidden="true" />
				Open Dialog
			{/snippet}
			<p class="text-sm text-muted">
				This will permanently delete the item and all associated data from our servers.
			</p>
			{#snippet footer()}
				<DialogClose class={buttonVariants({ variant: 'default' })}>Cancel</DialogClose>
				<Button variant="danger">
					<MingcuteDelete2Line class="size-4" aria-hidden="true" />
					Delete
				</Button>
			{/snippet}
		</Dialog>
	</Card>
	<Card
		class="mt-4"
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
</section>
