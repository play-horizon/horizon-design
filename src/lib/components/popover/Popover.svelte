<!--
@component
A non-modal panel anchored to its trigger (Ark Popover), with a title, content and footer;
`frosted` for a translucent surface. The trigger is a button holding the `trigger` snippet, styled
by `triggerClass`; the title and description name and describe the panel. `open` binds whether it
is open; without it, Ark's `defaultOpen` sets the first state.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover, type PopoverOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		children,
		footer,
		contentClass = '',
		frosted = false,
		open = $bindable(),
		onOpenChange,
		...rest
	}: {
		/** The trigger button's content; without it, the popover opens only through `open`. */
		trigger?: Snippet;
		/** Classes of the trigger button, such as `buttonVariants(...)`. */
		triggerClass?: string;
		/** The panel's title, which names it. */
		title?: string;
		/** A line under the title, which describes the panel. */
		description?: string;
		/** The panel's content. */
		children?: Snippet;
		/** Buttons at the bottom of the panel. */
		footer?: Snippet;
		/** Classes added to the panel. */
		contentClass?: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Whether the panel is open. */
		open?: boolean;
		/** Called when the panel opens or closes, after `open` is updated. */
		onOpenChange?: (details: PopoverOpenChangeDetails) => void;
		[key: string]: unknown;
	} = $props();
</script>

<Popover.Root
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<Popover.Trigger class={triggerClass || undefined} data-slot="popover-trigger">
			{@render trigger()}
		</Popover.Trigger>
	{/if}
	<Portal>
		<Popover.Positioner>
			<Popover.Content
				class={cn(
					'z-50 w-72 rounded-lg border border-border-strong text-fg shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					contentClass
				)}
				data-slot="popover-content"
			>
				{#if title || description}
					<div class="flex flex-col space-y-1 p-4 pb-0" data-slot="popover-header">
						{#if title}
							<Popover.Title class="text-sm leading-none font-semibold" data-slot="popover-title">
								{title}
							</Popover.Title>
						{/if}
						{#if description}
							<Popover.Description class="text-xs text-muted" data-slot="popover-description">
								{description}
							</Popover.Description>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="p-4" data-slot="popover-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center gap-2 p-4 pt-0" data-slot="popover-footer">
						{@render footer()}
					</div>
				{/if}
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover.Root>
