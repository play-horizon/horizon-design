<!--
@component
A group of radio buttons to choose one option (Ark RadioGroup): from `items`, or Ark's
`RadioGroup.Item` parts in `children`. `value` binds the chosen option; without it, Ark's
`defaultValue` sets the first one. Without `label`, name the group with an `aria-label`. Ark's
`orientation="horizontal"` lays the options out in a row, and its `invalid` turns the circles
danger.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { RadioGroup, type RadioGroupValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	/** One option: its value, its label (text or a snippet) and whether it can be chosen. */
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
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes added to the group. */
		class?: string;
		/** The size of the circles and of the text. */
		size?: 'sm' | 'md' | 'lg';
		/** The group's label, which names it. */
		label?: string;
		/** The options; without them, `children` renders Ark's parts. */
		items?: Item[];
		/** Ark's `RadioGroup.Item` parts, used when there are no `items`. */
		children?: Snippet;
		/** The chosen option's value; `null` when none is. */
		value?: string | null;
		/** Called on every change of the value, after `value` is updated. */
		onValueChange?: (details: RadioGroupValueChangeDetails) => void;
		/** Other props of Ark's `RadioGroup.Root`. */
		[key: string]: unknown;
	} = $props();

	const sizeClasses = $derived(sizes[size]);
</script>

<RadioGroup.Root
	class={cn('group/radio-group flex flex-col gap-3', className)}
	data-slot="radio-group"
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	{...rest}
>
	{#if label}
		<RadioGroup.Label
			class={cn('leading-none font-medium', sizeClasses.label)}
			data-slot="radio-group-label">{label}</RadioGroup.Label
		>
	{/if}
	<div
		class="flex flex-col gap-3 group-data-[orientation=horizontal]/radio-group:flex-row group-data-[orientation=horizontal]/radio-group:flex-wrap group-data-[orientation=horizontal]/radio-group:gap-x-5"
	>
		{#if items}
			{#each items as item (item.value)}
				<RadioGroup.Item
					value={item.value}
					disabled={item.disabled}
					class="flex items-center gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-50"
					data-slot="radio-group-item"
				>
					<RadioGroup.ItemControl
						class={cn(
							'group relative aspect-square rounded-full border border-border bg-sunken transition-colors outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background data-invalid:border-danger data-[state=checked]:border-primary data-[state=checked]:bg-primary data-invalid:data-[state=checked]:bg-danger',
							sizeClasses.control
						)}
					>
						<div
							class={cn(
								'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-paper transition-transform group-data-[state=checked]:scale-100',
								sizeClasses.dot
							)}
						></div>
					</RadioGroup.ItemControl>
					{#if typeof item.label === 'string'}
						<span class={sizeClasses.label}>{item.label}</span>
					{:else}
						{@render item.label()}
					{/if}
					<RadioGroup.ItemHiddenInput />
				</RadioGroup.Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</div>
</RadioGroup.Root>
