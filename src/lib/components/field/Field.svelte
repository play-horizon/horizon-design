<!--
@component
A form field: its label, the control, a help text and an error message, wired together for
assistive technology (Ark Field).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Field } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		helperText,
		errorText,
		children,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The label, tied to the control. */
		label?: string | Snippet;
		/** A help text under the control, which describes it. */
		helperText?: string | Snippet;
		/** The error message, shown while the field is `invalid`. */
		errorText?: string | Snippet;
		/** The control: an `Input`, a `Textarea` or another field of the library. */
		children?: Snippet;
		/** Other props of Ark's `Field.Root`, such as `invalid`, `required` or `disabled`. */
		[key: string]: unknown;
	} = $props();

	function isSnippet(v: string | Snippet | undefined): v is Snippet {
		return typeof v === 'function';
	}
</script>

<Field.Root class={cn('flex flex-col gap-1.5', className)} data-slot="field" {...rest}>
	{#if label}
		<Field.Label class="text-sm leading-none font-medium" data-slot="field-label">
			{#if isSnippet(label)}{@render label()}{:else}{label}{/if}
		</Field.Label>
	{/if}
	{@render children?.()}
	{#if helperText}
		<Field.HelperText class="text-xs text-muted" data-slot="field-helper-text">
			{#if isSnippet(helperText)}{@render helperText()}{:else}{helperText}{/if}
		</Field.HelperText>
	{/if}
	{#if errorText}
		<Field.ErrorText class="text-xs text-danger" data-slot="field-error-text">
			{#if isSnippet(errorText)}{@render errorText()}{:else}{errorText}{/if}
		</Field.ErrorText>
	{/if}
</Field.Root>
