<!--
@component
Tabs and their panels (Ark Tabs): a segmented or an underlined tab list.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabs } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	/** One tab and its panel. */
	interface TabConfig {
		/** The tab's stable, unique value. */
		value: string;
		/** The tab's label: text, translated, or a snippet. */
		label: string | Snippet;
		/** The panel shown while the tab is selected. */
		content: Snippet;
	}

	type SizeConfig = { list: string; trigger: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: {
			list: 'h-7',
			trigger: 'px-2 py-0.5 text-xs'
		},
		md: {
			list: 'h-9',
			trigger: 'px-3 py-1 text-sm'
		},
		lg: {
			list: 'h-11',
			trigger: 'px-4 py-1.5 text-base'
		}
	};

	let {
		tabs = [],
		variant = 'default',
		size = 'md',
		defaultValue,
		value = $bindable(undefined),
		class: className = '',
		...rest
	}: {
		/** The tabs, in order. */
		tabs?: TabConfig[];
		/** A segmented tab list, or tabs underlined by a sliding indicator. */
		variant?: 'default' | 'underline';
		/** The control's size. */
		size?: 'sm' | 'md' | 'lg';
		/** The tab selected at first, when `value` isn't bound. */
		defaultValue?: string;
		/** The selected tab's value (bindable). */
		value?: string;
		/** Classes merged onto Ark's `Tabs.Root`. */
		class?: string;
		/** Other props of Ark's `Tabs.Root`, such as `onValueChange`. */
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<Tabs.Root
	class={cn('flex flex-col gap-2', className)}
	data-slot="tabs"
	{defaultValue}
	bind:value
	{...rest}
>
	<Tabs.List
		class={cn(
			'flex w-fit items-center gap-1',
			variant === 'default' && cn('rounded-lg bg-hover p-1 text-muted', sz.list),
			variant === 'underline' &&
				'relative gap-4 rounded-none border-b border-border bg-transparent p-0 text-muted',
			variant === 'underline' && sz.list
		)}
		data-slot="tabs-list"
		data-variant={variant}
	>
		{#if variant === 'underline'}
			<Tabs.Indicator class="bottom-0 h-0.5 w-(--width) bg-primary" data-slot="tabs-indicator" />
		{/if}
		{#each tabs as tab (tab.value)}
			<Tabs.Trigger
				value={tab.value}
				class={cn(
					'inline-flex items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
					sz.trigger,
					variant === 'default' &&
						'rounded-md data-selected:bg-background data-selected:text-fg data-selected:shadow-sm',
					variant === 'underline' && cn('rounded-none pb-3 data-selected:text-fg', sz.list)
				)}
				data-slot="tabs-trigger"
			>
				{#if isSnippet(tab.label)}
					{@render tab.label()}
				{:else}
					{tab.label}
				{/if}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each tabs as tab (tab.value)}
		<Tabs.Content
			value={tab.value}
			class="mt-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-primary"
			data-slot="tabs-content"
		>
			{@render tab.content()}
		</Tabs.Content>
	{/each}
</Tabs.Root>
