<script lang="ts">
	import { Combobox, createListCollection } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteSelectorVerticalLine from '~icons/mingcute/selector-vertical-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		items = [],
		label,
		placeholder = 'Search…',
		class: className = '',
		...rest
	}: {
		items?: Array<{ label: string; value: string }>;
		label?: string;
		placeholder?: string;
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
		<Combobox.Label
			class="text-foreground mb-1 block text-sm font-medium"
			data-slot="combobox-label"
		>
			{label}
		</Combobox.Label>
	{/if}
	<Combobox.Control class="relative">
		<Combobox.Input
			{placeholder}
			class="border-border bg-input text-foreground focus-visible:ring-ring focus-visible:border-primary placeholder:text-muted-foreground flex h-8 w-full rounded-lg border px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2"
			data-slot="combobox-input"
		/>
		<Combobox.Trigger class="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2">
			<MingcuteSelectorVerticalLine class="size-4" />
		</Combobox.Trigger>
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner>
			<Combobox.Content
				class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-xl outline-none"
				data-slot="combobox-content"
			>
				<Combobox.Empty class="text-muted-foreground px-2.5 py-4 text-center text-sm">
					No results found.
				</Combobox.Empty>
				{#each items as item (item.value)}
					<Combobox.Item
						{item}
						class="hover:bg-accent data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:bg-accent relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors select-none"
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
