<!--
@component
Docs: AlertDialog. Live examples of the AlertDialog component.
-->
<script lang="ts">
	import { AlertDialog } from '$lib/components/alert-dialog';
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
</script>

<section id="alert-dialog">
	<Card>
		<div>
			{#snippet alertDialogTrigger()}
				<MingcuteDelete2Line class="size-4" />
				Alert Dialog
			{/snippet}
			<AlertDialog
				trigger={alertDialogTrigger}
				triggerClass={buttonVariants({ variant: 'danger' })}
				title="Are you absolutely sure?"
				description="This action cannot be undone."
				cancelLabel="Cancel"
				actionLabel="Delete"
			/>
		</div>
	</Card>
</section>
