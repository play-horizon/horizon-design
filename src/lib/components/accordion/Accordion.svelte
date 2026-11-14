<!--
@component
A vertical stack of collapsible sections (Ark Accordion); `AccordionItem` is one section with its
trigger. `value` binds the open items.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Accordion } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		collapsible = true,
		lazyMount = true,
		unmountOnExit = true,
		value = $bindable(undefined),
		...rest
	}: {
		class?: string;
		children?: Snippet;
		collapsible?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		value?: string[];
		[key: string]: unknown;
	} = $props();
</script>

<Accordion.Root
	{collapsible}
	{lazyMount}
	{unmountOnExit}
	{value}
	onValueChange={(details) => (value = details.value)}
	class={cn('flex flex-col', className)}
	data-slot="accordion"
	{...rest}
>
	{@render children?.()}
</Accordion.Root>
