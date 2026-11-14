<!--
@component
A text field that filters a list of options to choose from (Ark Combobox).
-->
<script lang="ts">
	import { Combobox, createListCollection } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteSelectorVerticalLine from '~icons/mingcute/selector-vertical-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		items = [],
		label,
		placeholder = '',
		emptyText,
		class: className = '',
		...rest
	}: {
		items?: Array<{ label: string; value: string }>;
		label?: string;
		/** The field's placeholder, such as "Search…". */
		placeholder?: string;
		/** Shown when no option matches, such as "No results found." */
		emptyText: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const collection = $derived(createListCollection({ items }));
</script>

<Combobox.Root
	{collection}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="combobox"
	{...rest}
>
	{#if label}
		<Combobox.Label class="mb-1 block text-sm font-medium text-fg" data-slot="combobox-label">
			{label}
		</Combobox.Label>
	{/if}
	<Combobox.Control class="relative">
		<Combobox.Input
			{placeholder}
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 text-sm text-fg shadow-sm outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
			data-slot="combobox-input"
		/>
		<Combobox.Trigger class="absolute top-1/2 right-2 -translate-y-1/2 text-muted">
			<MingcuteSelectorVerticalLine class="size-4" />
		</Combobox.Trigger>
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner>
			<Combobox.Content
				class="z-50 min-w-32 overflow-hidden rounded-xl border border-border bg-raised p-1 text-fg shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
				data-slot="combobox-content"
			>
				<Combobox.Empty class="px-2.5 py-4 text-center text-sm text-muted">
					{emptyText}
				</Combobox.Empty>
				{#each items as item (item.value)}
					<Combobox.Item
						{item}
						class="relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors select-none hover:bg-hover data-highlighted:bg-hover data-highlighted:text-fg data-[state=checked]:bg-hover"
						data-slot="combobox-item"
					>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator class="ml-auto">
							<MingcuteCheckLine class="size-4" />
						</Combobox.ItemIndicator>
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox.Root>
