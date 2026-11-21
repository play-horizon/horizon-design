<!--
@component
A number field with increment and decrement buttons (Ark NumberInput). `value` binds the text of
the field; without it, Ark's `defaultValue` sets the first value. `translations` names the two
buttons (`incrementLabel`, `decrementLabel`), which show their names as tooltips too, and gives the
field's announced role (`roleDescription`). Ark's `invalid` turns the border danger.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		NumberInput,
		type NumberInputRootProps,
		type NumberInputValueChangeDetails
	} from '@ark-ui/svelte';
	import MingcuteUpLine from '~icons/mingcute/up-line';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		class: className = '',
		label,
		children,
		value = $bindable(),
		onValueChange,
		translations,
		...rest
	}: {
		/** Classes added to the root, around the label and the field. */
		class?: string;
		/** The field's label, tied to the input. */
		label?: string;
		/** Content between the label and the field, such as a hint. */
		children?: Snippet;
		/** The field's text, such as `"5"`. */
		value?: string;
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: NumberInputValueChangeDetails) => void;
		/**
		 * Names of the step buttons (`incrementLabel`, `decrementLabel`), the role the field is
		 * announced as (`roleDescription`, such as "number field"), and optionally `valueText`, the
		 * value as announced.
		 */
		translations: Required<
			Pick<NonNullable<NumberInputRootProps['translations']>, 'incrementLabel' | 'decrementLabel'>
		> &
			NonNullable<NumberInputRootProps['translations']> & { roleDescription: string };
		/** Other props of Ark's `NumberInput.Root`. */
		[key: string]: unknown;
	} = $props();

	const { roleDescription, ...arkTranslations } = $derived(translations);
	// Each step button is also its tooltip's trigger, so both must know it by the same id.
	const id = $props.id();
	const ids = { incrementTrigger: `${id}-increment`, decrementTrigger: `${id}-decrement` };
</script>

<NumberInput.Root
	{ids}
	translations={arkTranslations}
	class={cn('flex min-w-12 flex-col gap-1.5', className)}
	data-slot="number-input"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	{#if label}
		<NumberInput.Label class="text-sm leading-none font-medium" data-slot="number-input-label">
			{label}
		</NumberInput.Label>
	{/if}
	{@render children?.()}
	<NumberInput.Control
		class="flex h-9 w-full overflow-hidden rounded-lg border border-border bg-sunken transition-all has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-primary/20 data-disabled:opacity-50 data-invalid:border-danger data-invalid:has-[input:focus-visible]:border-danger data-invalid:has-[input:focus-visible]:ring-danger/20"
	>
		<NumberInput.Input
			aria-roledescription={roleDescription}
			class="min-w-0 flex-1 bg-transparent pl-2 text-sm text-fg outline-none placeholder:text-muted disabled:cursor-not-allowed"
		/>
		<div class="flex shrink-0 flex-col border-l border-border">
			<Tooltip
				content={translations.incrementLabel}
				triggerId={ids.incrementTrigger}
				positioning={{ placement: 'right' }}
			>
				{#snippet trigger(props)}
					<NumberInput.IncrementTrigger
						{...props}
						class="flex flex-1 items-center justify-center px-1.5 text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none"
					>
						<MingcuteUpLine class="size-3" aria-hidden="true" />
					</NumberInput.IncrementTrigger>
				{/snippet}
			</Tooltip>
			<Tooltip
				content={translations.decrementLabel}
				triggerId={ids.decrementTrigger}
				positioning={{ placement: 'right' }}
			>
				{#snippet trigger(props)}
					<NumberInput.DecrementTrigger
						{...props}
						class="flex flex-1 items-center justify-center border-t border-border px-1.5 text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none"
					>
						<MingcuteDownLine class="size-3" aria-hidden="true" />
					</NumberInput.DecrementTrigger>
				{/snippet}
			</Tooltip>
		</div>
	</NumberInput.Control>
</NumberInput.Root>
