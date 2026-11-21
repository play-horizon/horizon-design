<!--
@component
Test fixture of `DialogClose`: an open `Dialog` (of `role`) without its own close button, holding
the icon form of `DialogClose`, named by its `label`.
-->
<script lang="ts">
	import Dialog from './Dialog.svelte';
	import DialogClose from './DialogClose.svelte';

	let { role = 'dialog' }: { role?: 'dialog' | 'alertdialog' } = $props();
</script>

<Dialog open {role} title="Paused" closeLabel="Close" showClose={false}>
	<DialogClose label="Close the pause menu" />
</Dialog>
