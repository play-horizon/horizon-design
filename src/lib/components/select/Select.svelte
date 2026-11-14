<!--
@component
A select field with a dropdown list of options (Ark Select); `value` binds the chosen values
(without it, Ark's `defaultValue` sets the first ones) and `placeholder` shows while none is
chosen. `label`, required, names the field.
-->
<script lang="ts">
	import { Select, createListCollection, type SelectValueChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';
	import { cn } from '$lib/utils';

	/** One option: its text, its value, and whether it can be chosen. */
	type Item = { label: string; value: string; disabled?: boolean };

	let {
		class: className = '',
		items = [],
		label,
		placeholder = '',
		triggerClass = '',
		contentClass = '',
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes added to the root, around the label and the field. */
		class?: string;
		/** The options, in order. */
		items?: Item[];
		/** The field's visible label, which names it. */
		label: string;
		/** The text shown while nothing is selected. */
		placeholder?: string;
		/** Classes added to the field's button. */
		triggerClass?: string;
		/** Classes added to the dropdown list. */
		contentClass?: string;
		/** The chosen options' values (one, unless Ark's `multiple` is set). */
		value?: string[];
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: SelectValueChangeDetails<Item>) => void;
		/** Other props of Ark's `Select.Root`. */
		[key: string]: unknown;
	} = $props();

	const collection = $derived(createListCollection({ items }));
</script>

<Select.Root
	{collection}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	class={cn('flex flex-col gap-1', className)}
	{...rest}
>
	<Select.Label class="text-sm leading-none font-medium" data-slot="select-label">
		{label}
	</Select.Label>
	<Select.Control class="isolate">
		<Select.Trigger
			class={cn(
				'flex h-9 w-full items-center justify-between rounded-lg border border-border bg-sunken px-3 py-2 text-sm text-fg shadow-sm transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted',
				triggerClass
			)}
			data-slot="select-trigger"
		>
			<Select.ValueText {placeholder} />
			<Select.Indicator>
				<MingcuteDownLine class="size-4 opacity-50" aria-hidden="true" />
			</Select.Indicator>
		</Select.Trigger>
	</Select.Control>
	<Portal>
		<Select.Positioner>
			<Select.Content
				class={cn(
					'z-50 min-w-(--reference-width) rounded-xl border border-border bg-raised p-1 text-fg shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					contentClass
				)}
				data-slot="select-content"
			>
				{#each items as item (item.value)}
					<Select.Item
						{item}
						class="relative flex w-full cursor-default items-center rounded-lg px-2 py-1.5 text-sm transition-colors outline-none hover:bg-hover hover:text-fg data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-hover data-highlighted:text-fg"
						data-slot="select-item"
					>
						<span class="absolute right-2 flex size-3.5 items-center justify-center">
							<Select.ItemIndicator>
								<MingcuteCheckLine class="size-4" aria-hidden="true" />
							</Select.ItemIndicator>
						</span>
						<Select.ItemText>{item.label}</Select.ItemText>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Positioner>
	</Portal>
	<Select.HiddenSelect />
</Select.Root>
