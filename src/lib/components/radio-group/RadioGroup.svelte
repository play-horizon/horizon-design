<!--
@component
A group of radio buttons to choose one option (Ark RadioGroup).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { RadioGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	type Item = { value: string; label: string | Snippet; disabled?: boolean };

	type SizeConfig = { control: string; dot: string; label: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: { control: 'size-3.5', dot: 'size-1.5', label: 'text-xs' },
		md: { control: 'size-4', dot: 'size-2', label: 'text-sm' },
		lg: { control: 'size-5', dot: 'size-2.5', label: 'text-base' }
	};

	let {
		class: className = '',
		size = 'md',
		label,
		items,
		children,
		value = $bindable(''),
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		items?: Item[];
		children?: Snippet;
		value?: string | null;
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);
</script>

<RadioGroup.Root
	class={cn('flex flex-col gap-3', className)}
	data-slot="radio-group"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<RadioGroup.Label class={cn('leading-none font-medium', sz.label)} data-slot="radio-group-label"
			>{label}</RadioGroup.Label
		>
	{/if}
	{#if items}
		{#each items as item (item.value)}
			<RadioGroup.Item
				value={item.value}
				disabled={item.disabled}
				class="flex items-center gap-2"
				data-slot="radio-group-item"
			>
				<RadioGroup.ItemControl
					class={cn(
						'group relative aspect-square rounded-full border border-border bg-sunken transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background data-[state=checked]:border-primary data-[state=checked]:bg-primary',
						sz.control
					)}
				>
					<div
						class={cn(
							'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-paper transition-transform group-data-[state=checked]:scale-100',
							sz.dot
						)}
					></div>
				</RadioGroup.ItemControl>
				{#if typeof item.label === 'string'}
					<span class={sz.label}>{item.label}</span>
				{:else}
					{@render item.label()}
				{/if}
				<RadioGroup.ItemHiddenInput />
			</RadioGroup.Item>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</RadioGroup.Root>
