<!--
@component
Test fixture of `Textarea.svelte.test.ts`: a textarea inside an invalid field.
-->
<script lang="ts">
	import Field from '../field/Field.svelte';
	import Textarea from './Textarea.svelte';
</script>

<Field label="Message" invalid errorText="Write a message.">
	<Textarea />
</Field>
