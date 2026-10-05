<script lang="ts">
	import { Select, createListCollection } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		items = [],
		label,
		placeholder = 'Select an option',
		triggerClass = '',
		contentClass = '',
		value = $bindable([]),
		...rest
	}: {
		class?: string;
		items?: Array<{ label: string; value: string; disabled?: boolean }>;
		label?: string;
		placeholder?: string;
		triggerClass?: string;
		contentClass?: string;
		value?: string[];
		[key: string]: unknown;
	} = $props();

	const collection = $derived(createListCollection({ items }));
</script>

<Select.Root
	{collection}
	{value}
	onValueChange={(details) => (value = details.value)}
	class={cn('flex flex-col gap-1', className)}
	{...rest}
>
	{#if label}
		<Select.Label class="text-sm leading-none font-medium" data-slot="select-label">
			{label}
		</Select.Label>
	{/if}
	<Select.Control class="isolate">
		<Select.Trigger
			class={cn(
				'data-placeholder:text-muted-foreground focus-visible:ring-ring border-border bg-input text-foreground focus-visible:border-primary flex h-9 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
				triggerClass
			)}
			data-slot="select-trigger"
		>
			<Select.ValueText {placeholder} />
			<Select.Indicator>
				<MingcuteDownLine class="size-4 opacity-50" />
			</Select.Indicator>
		</Select.Trigger>
	</Select.Control>
	<Portal>
		<Select.Positioner>
			<Select.Content
				class={cn(
					'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border text-popover-foreground bg-popover z-50 min-w-(--reference-width) rounded-xl border p-1 shadow-xl backdrop-blur-xl outline-none',
					contentClass
				)}
				data-slot="select-content"
			>
				{#each items as item (item.value)}
					<Select.Item
						{item}
						class="hover:bg-accent hover:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center rounded-lg px-2 py-1.5 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50"
						data-slot="select-item"
					>
						<span class="absolute right-2 flex size-3.5 items-center justify-center">
							<Select.ItemIndicator>
								<MingcuteCheckLine class="size-4" />
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
