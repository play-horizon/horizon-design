<!--
@component
A row of one-character fields for a code, such as the sign-up code (Ark PinInput). `value` binds
the characters; without it, Ark's `defaultValue` sets the first ones. Ark's
`translations.inputLabel` names each field ("Digit 2 of 6").
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		PinInput,
		type PinInputRootProps,
		type PinInputValueChangeDetails
	} from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		children,
		count = 4,
		value = $bindable(),
		onValueChange,
		translations,
		...rest
	}: {
		/** Classes added to the root, around the label and the fields. */
		class?: string;
		/** The code's label. */
		label?: string;
		/** Content between the label and the fields, such as a hint. */
		children?: Snippet;
		/** How many characters the code has: one field each. */
		count?: number;
		/** The characters, one per field (`""` for an empty one). */
		value?: string[];
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: PinInputValueChangeDetails) => void;
		/** `inputLabel(index, length)` names each field, such as "Digit 2 of 6". */
		translations: Required<Pick<NonNullable<PinInputRootProps['translations']>, 'inputLabel'>> &
			NonNullable<PinInputRootProps['translations']>;
		/** Other props of Ark's `PinInput.Root`. */
		[key: string]: unknown;
	} = $props();

	const indexes = $derived(Array.from({ length: count }, (_, index) => index));
</script>

<PinInput.Root
	{translations}
	class={cn('flex flex-col gap-2', className)}
	data-slot="pin-input"
	{count}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	{#if label}
		<PinInput.Label class="text-sm leading-none font-medium" data-slot="pin-input-label">
			{label}
		</PinInput.Label>
	{/if}
	{@render children?.()}
	<PinInput.Control class="flex items-center gap-2">
		{#each indexes as index (index)}
			<PinInput.Input
				{index}
				class="flex size-10 items-center justify-center rounded-lg border border-border bg-sunken text-center text-sm font-medium text-fg transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
			/>
		{/each}
	</PinInput.Control>
	<PinInput.HiddenInput />
</PinInput.Root>
