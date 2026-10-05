<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Dialog, DialogClose } from '$lib/components/dialog';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteWindowsLine from '~icons/mingcute/windows-line';
</script>

<section id="dialog">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Dialog</h2>
	<Card>
		<Dialog
			title="Confirm Deletion"
			description="Are you sure you want to proceed? This action cannot be undone."
			triggerClass={buttonVariants({ variant: 'outline' })}
		>
			{#snippet trigger()}
				<MingcuteWindowsLine class="size-4" />
				Open Dialog
			{/snippet}
			<p class="text-muted-foreground text-sm">
				This will permanently delete the item and all associated data from our servers.
			</p>
			{#snippet footer()}
				<DialogClose class={buttonVariants({ variant: 'outline' })}>Cancel</DialogClose>
				<Button variant="destructive">
					<MingcuteDelete2Line class="size-4" />
					Delete
				</Button>
			{/snippet}
		</Dialog>
	</Card>
</section>
