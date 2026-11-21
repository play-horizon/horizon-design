<!--
@component
Test fixture of `Toggle.svelte.test.ts`: an icon-only toggle inside a `Tooltip` with its name.
-->
<script lang="ts">
	import Tooltip from '../tooltip/Tooltip.svelte';
	import Toggle from './Toggle.svelte';
</script>

<Tooltip content="Bold">
	{#snippet trigger(props)}
		<Toggle {...props} aria-label="Bold"><span aria-hidden="true">B</span></Toggle>
	{/snippet}
</Tooltip>
