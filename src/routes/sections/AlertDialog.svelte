<!--
@component
Docs: AlertDialog. Live examples of the AlertDialog component.
-->
<script lang="ts">
	import { AlertDialog } from '#lib/components/alert-dialog/index.js';
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';

	let deleted = $state(false);
</script>

<section id="alert-dialog">
	<Card>
		<div>
			{#snippet alertDialogTrigger()}
				<MingcuteDelete2Line class="size-4" aria-hidden="true" />
				Delete game
			{/snippet}
			<AlertDialog
				trigger={alertDialogTrigger}
				triggerClass={buttonVariants({ variant: 'danger' })}
				title="Delete this game?"
				description="This action cannot be undone."
				cancelLabel="Cancel"
				actionLabel="Delete game"
				onAction={() => (deleted = true)}
			/>
			{#if deleted}
				<p class="mt-2 text-sm text-muted" role="status">The game was deleted.</p>
			{/if}
		</div>
	</Card>
</section>
