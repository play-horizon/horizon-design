<!--
@component
A multi-line text field on a sunken field; `value` binds its text. Focus turns the border primary
with a soft ring; an invalid value (`invalid`, or an invalid `Field` around it) turns it danger
and sets `aria-invalid`. Inside a `Field`, it takes the field's label, description and error.
-->
<script lang="ts">
	import { Field } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		value = $bindable(),
		invalid = false,
		...rest
	}: {
		/** Classes merged onto Ark's `Field.Textarea`. */
		class?: string;
		/** The text (bindable). */
		value?: string;
		/** Marks the value as invalid: a danger border and `aria-invalid`. */
		invalid?: boolean;
		/** Other props of Ark's `Field.Textarea`, such as `placeholder`, `rows` or `autoresize`. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- The danger state follows the textarea's `aria-invalid`, which an invalid `Field` sets too. -->
<Field.Textarea
	class={cn(
		'flex min-h-20 w-full resize-y rounded-lg border border-border bg-sunken px-3 py-2 text-sm text-fg shadow-sm transition-colors outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20',
		className
	)}
	data-slot="textarea"
	aria-invalid={invalid || undefined}
	bind:value
	{...rest}
/>
