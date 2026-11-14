<!--
@component
One section of an `Accordion`: its trigger (text or snippet) and its collapsible content.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Accordion } from '@ark-ui/svelte';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		value,
		trigger,
		children,
		...rest
	}: {
		/** Classes merged onto the section. */
		class?: string;
		/** The section's id among the accordion's items, the value `Accordion`'s `value` holds. */
		value: string;
		/** The trigger's content: its text, or a snippet. */
		trigger?: string | Snippet;
		/** The content shown while the section is open. */
		children?: Snippet;
		/** Other props of Ark's `Accordion.Item`, such as `disabled`. */
		[key: string]: unknown;
	} = $props();
</script>

<Accordion.Item
	{value}
	class={cn('border-b border-border', className)}
	data-slot="accordion-item"
	{...rest}
>
	<Accordion.ItemTrigger
		class="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary"
		data-slot="accordion-trigger"
	>
		{#if typeof trigger === 'string'}
			{trigger}
		{:else if trigger}
			{@render trigger()}
		{/if}
		<Accordion.ItemIndicator
			class="shrink-0 transition-transform duration-200 data-[state=open]:rotate-180"
		>
			<MingcuteDownLine class="size-4" aria-hidden="true" />
		</Accordion.ItemIndicator>
	</Accordion.ItemTrigger>
	<Accordion.ItemContent
		class="overflow-hidden text-sm data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down"
		data-slot="accordion-content"
	>
		<div class="pt-0 pb-4">
			{@render children?.()}
		</div>
	</Accordion.ItemContent>
</Accordion.Item>
