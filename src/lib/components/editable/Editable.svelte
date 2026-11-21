<!--
@component
Text that turns into a field when edited, then back (Ark Editable); `translations` name the text
and, without a visible `label`, the field for assistive technology (a `label` names the field).
-->
<script lang="ts">
	import { Editable, type EditableValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		translations,
		defaultValue,
		value = $bindable(),
		placeholder,
		onValueChange,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The visible label above the text, which also names the field. */
		label?: string;
		/**
		 * The accessible names Ark gives its parts: `input` the field's while editing, when there is
		 * no `label` (such as "Display name"), `edit` the text's before it is edited (such as "Edit
		 * display name").
		 */
		translations: { input: string; edit: string };
		/** The first value, when `value` is unset. */
		defaultValue?: string;
		/** The value (bindable), updated as the user types. */
		value?: string;
		/** Shown while the value is empty. */
		placeholder?: string;
		/** Called with the new value as the user types. */
		onValueChange?: (details: EditableValueChangeDetails) => void;
		/** Other props of Ark's `Editable.Root`, such as `onValueCommit`, `maxLength` or `disabled`. */
		[key: string]: unknown;
	} = $props();
</script>

<Editable.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="editable"
	{translations}
	{defaultValue}
	{value}
	{placeholder}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	{#if label}
		<Editable.Label class="text-sm font-medium text-fg" data-slot="editable-label">
			{label}
		</Editable.Label>
	{/if}
	<!-- Ark marks the preview `aria-readonly`, which ARIA forbids on its generic element; the field
	     carries the read-only state, and a read-only preview isn't focusable. -->
	<Editable.Preview
		aria-readonly={null}
		class="flex min-h-8 cursor-text items-center rounded-lg border border-transparent px-3 py-1.5 text-sm transition-colors hover:border-border hover:bg-sunken"
		data-slot="editable-preview"
	/>
	<Editable.Input
		class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 text-sm text-fg outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
		data-slot="editable-input"
	/>
</Editable.Root>
