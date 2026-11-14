<!--
@component
Docs: Dialog. Live examples of the Dialog component.
-->
<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Dialog, DialogClose } from '$lib/components/dialog';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteWindowsLine from '~icons/mingcute/windows-line';
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
				<MingcuteWindowsLine class="size-4" />
				Open Dialog
			{/snippet}
			<p class="text-sm text-muted">
				This will permanently delete the item and all associated data from our servers.
			</p>
			{#snippet footer()}
				<DialogClose class={buttonVariants({ variant: 'default' })}>Cancel</DialogClose>
				<Button variant="danger">
					<MingcuteDelete2Line class="size-4" />
					Delete
				</Button>
			{/snippet}
		</Dialog>
	</Card>
</section>
