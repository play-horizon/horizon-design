<!--
@component
Test fixture of `DialogClose`: an open `Dialog` without its own close button, holding the icon
form of `DialogClose`, named by its `label`.
-->
<script lang="ts">
	import Dialog from './Dialog.svelte';
	import DialogClose from './DialogClose.svelte';
</script>

<Dialog open title="Paused" closeLabel="Close" showClose={false}>
	<DialogClose label="Close the pause menu" />
</Dialog>
