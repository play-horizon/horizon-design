<!--
@component
A vertical stack of collapsible sections (Ark Accordion); `AccordionItem` is one section with its
trigger. `value` binds the open items.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Accordion, type AccordionValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		collapsible = true,
		lazyMount = true,
		unmountOnExit = true,
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes merged onto the accordion. */
		class?: string;
		/** The sections, `AccordionItem`s. */
		children?: Snippet;
		/** Whether the open section can be closed again, leaving none open. */
		collapsible?: boolean;
		/** Renders a section's content only once it is first opened. */
		lazyMount?: boolean;
		/** Removes a section's content when it closes. */
		unmountOnExit?: boolean;
		/** The `value`s of the open sections (bindable). */
		value?: string[];
		/** Called with the open sections when they change. */
		onValueChange?: (details: AccordionValueChangeDetails) => void;
		/** Other props of Ark's `Accordion.Root`, such as `multiple`. */
		[key: string]: unknown;
	} = $props();
</script>

<Accordion.Root
	{collapsible}
	{lazyMount}
	{unmountOnExit}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	class={cn('flex flex-col', className)}
	data-slot="accordion"
	{...rest}
>
	{@render children?.()}
</Accordion.Root>
