<!--
@component
A multi-line text field on a sunken field.
-->
<script lang="ts">
	import { Field } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Field.Textarea
	class={cn(
		'flex min-h-20 w-full resize-y rounded-lg border border-border bg-sunken px-3 py-2 text-sm text-fg shadow-sm transition-colors outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	data-slot="textarea"
	{...rest}
/>
