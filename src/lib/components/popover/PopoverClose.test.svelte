<!--
@component
Test fixture of `PopoverClose`: an open `Popover` whose panel holds a close button named by its
`label`.
-->
<script lang="ts">
	import Popover from './Popover.svelte';
	import PopoverClose from './PopoverClose.svelte';
</script>

<Popover title="Layer size" defaultOpen>
	<PopoverClose label="Close the layer size">Done</PopoverClose>
</Popover>
