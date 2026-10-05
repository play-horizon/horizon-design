<script lang="ts">
	import { AlertDialog } from '$lib/components/alert-dialog';
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
</script>

<section id="alert-dialog">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Alert Dialog</h2>
	<Card>
		<div>
			{#snippet alertDialogTrigger()}
				<MingcuteDelete2Line class="size-4" />
				Alert Dialog
			{/snippet}
			<AlertDialog
				trigger={alertDialogTrigger}
				triggerClass={buttonVariants({ variant: 'destructive' })}
				title="Are you absolutely sure?"
				description="This action cannot be undone."
				cancelLabel="Cancel"
				actionLabel="Delete"
			/>
		</div>
	</Card>
</section>
