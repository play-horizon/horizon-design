<!--
@component
Content that a trigger shows and hides (Ark Collapsible); disabled, the trigger is turned off and
faded.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Collapsible, type CollapsibleOpenChangeDetails } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		trigger,
		children,
		open = $bindable(),
		onOpenChange,
		disabled = false,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The trigger's content; Ark's `data-state` (`open` or `closed`) is on the trigger. */
		trigger?: Snippet;
		/** The content shown while open. */
		children?: Snippet;
		/** Whether the content is shown (bindable); unset, Ark's `defaultOpen` gives the first state. */
		open?: boolean;
		/** Called with the new state when the content is shown or hidden. */
		onOpenChange?: (details: CollapsibleOpenChangeDetails) => void;
		/** Turns the trigger off (faded), so the content stays shown or hidden as it is. */
		disabled?: boolean;
		/** Other props of Ark's `Collapsible.Root`, such as `defaultOpen` and `lazyMount`. */
		[key: string]: unknown;
	} = $props();
</script>

<Collapsible.Root
	class={cn('flex flex-col', className)}
	data-slot="collapsible"
	{open}
	{disabled}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<!-- Zag only marks the trigger data-disabled: the attribute takes it out of the tab order too. -->
		<Collapsible.Trigger
			{disabled}
			class="flex items-center gap-2 text-sm font-medium outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
			data-slot="collapsible-trigger"
		>
			{@render trigger()}
		</Collapsible.Trigger>
	{/if}
	<Collapsible.Content
		class="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down"
		data-slot="collapsible-content"
	>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>
