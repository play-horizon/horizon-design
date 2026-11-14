<!--
@component
A row of toggles of which one or several stay pressed (Ark ToggleGroup).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface ToggleItem {
		value: string;
		content: Snippet;
	}

	let {
		items = [],
		class: className = '',
		value = $bindable([]),
		...rest
	}: {
		items?: ToggleItem[];
		class?: string;
		value?: string[];
		[key: string]: unknown;
	} = $props();
</script>

<ToggleGroup.Root
	class={cn(
		'inline-flex items-center gap-1 rounded-lg border border-border bg-hover p-1',
		className
	)}
	data-slot="toggle-group"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#each items as item (item.value)}
		<ToggleGroup.Item
			value={item.value}
			class="inline-flex h-7 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium text-muted transition-colors hover:text-fg data-[state=on]:border-border data-[state=on]:bg-background data-[state=on]:text-fg data-[state=on]:shadow-sm"
			data-slot="toggle-group-item"
		>
			{@render item.content()}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
