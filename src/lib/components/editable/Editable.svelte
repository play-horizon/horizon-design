<!--
@component
Text that turns into a field when edited, then back (Ark Editable).
-->
<script lang="ts">
	import { Editable } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		defaultValue,
		value = $bindable(undefined),
		placeholder,
		...rest
	}: {
		class?: string;
		label?: string;
		defaultValue?: string;
		value?: string;
		placeholder?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Editable.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="editable"
	{defaultValue}
	{value}
	{placeholder}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<Editable.Label class="text-sm font-medium text-fg" data-slot="editable-label">
			{label}
		</Editable.Label>
	{/if}
	<Editable.Preview
		class="flex min-h-8 cursor-text items-center rounded-lg border border-transparent px-3 py-1.5 text-sm transition-colors hover:border-border hover:bg-sunken"
		data-slot="editable-preview"
	/>
	<Editable.Input
		class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 text-sm text-fg outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
		data-slot="editable-input"
	/>
</Editable.Root>
