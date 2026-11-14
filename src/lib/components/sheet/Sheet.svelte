<!--
@component
A modal panel that slides in from one side of the window (Ark Dialog); `closeLabel` names its
close button; `frosted` for a translucent surface. The trigger is a button holding the `trigger`
snippet, styled by `triggerClass`; the title and description name and describe the panel. `open`
binds whether it is open; without it, Ark's `defaultOpen` sets the first state.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type DialogOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	type Side = 'top' | 'bottom' | 'left' | 'right';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		children,
		footer,
		side = 'right',
		showClose = true,
		closeLabel,
		frosted = false,
		class: className = '',
		open = $bindable(),
		onOpenChange,
		...rest
	}: {
		/** The trigger button's content; without it, the sheet opens only through `open`. */
		trigger?: Snippet;
		/** Classes of the trigger button, such as `buttonVariants(...)`. */
		triggerClass?: string;
		/** The panel's title, which names it. */
		title?: string;
		/** A line under the title, which describes the panel. */
		description?: string;
		/** The panel's content, which scrolls. */
		children?: Snippet;
		/** Buttons at the bottom of the panel. */
		footer?: Snippet;
		/** The side of the window the panel slides in from. */
		side?: Side;
		/** Shows the close button in the top corner. */
		showClose?: boolean;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Classes added to the panel. */
		class?: string;
		/** Whether the panel is open (bindable); unset, Ark's `defaultOpen` gives the first state. */
		open?: boolean;
		/** Called when the panel opens or closes, after `open` is updated. */
		onOpenChange?: (details: DialogOpenChangeDetails) => void;
		/** Other props of Ark's `Dialog.Root`. */
		[key: string]: unknown;
	} = $props();

	const sides: Record<Side, string> = {
		top: 'inset-x-0 top-0 border-b data-[state=open]:animate-sheet-enter-top data-[state=closed]:animate-sheet-exit-top max-h-[80vh] w-full rounded-b-xl',
		bottom:
			'inset-x-0 bottom-0 border-t data-[state=open]:animate-sheet-enter-bottom data-[state=closed]:animate-sheet-exit-bottom max-h-[80vh] w-full rounded-t-xl',
		left: 'inset-y-0 left-0 border-r data-[state=open]:animate-sheet-enter-left data-[state=closed]:animate-sheet-exit-left h-full w-full max-w-sm rounded-r-xl',
		right:
			'inset-y-0 right-0 border-l data-[state=open]:animate-sheet-enter-right data-[state=closed]:animate-sheet-exit-right h-full w-full max-w-sm rounded-l-xl'
	};
</script>

<Dialog.Root
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<Dialog.Trigger class={triggerClass || undefined} data-slot="sheet-trigger">
			{@render trigger()}
		</Dialog.Trigger>
	{/if}
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-60 bg-scrim data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Dialog.Positioner class="fixed inset-0 z-70 overflow-hidden">
			<Dialog.Content
				class={cn(
					'absolute flex flex-col border-border-strong shadow-lg inset-shadow-highlight',
					sides[side],
					frosted ? 'frosted' : 'bg-raised',
					className
				)}
				data-slot="sheet-content"
			>
				{#if showClose}
					<Dialog.CloseTrigger
						class="absolute top-3.5 right-3.5 inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
						aria-label={closeLabel}
						data-slot="sheet-close"
					>
						<MingcuteCloseLine class="size-4" aria-hidden="true" />
					</Dialog.CloseTrigger>
				{/if}
				{#if title || description}
					<div
						class={cn('flex flex-col space-y-1.5 p-6 pb-0', showClose && 'pr-12')}
						data-slot="sheet-header"
					>
						{#if title}
							<Dialog.Title class="text-[1.0625rem] font-bold" data-slot="sheet-title">
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description class="text-sm text-muted" data-slot="sheet-description">
								{description}
							</Dialog.Description>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="flex-1 overflow-auto p-6" data-slot="sheet-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center gap-2 p-6 pt-0" data-slot="sheet-footer">
						{@render footer()}
					</div>
				{/if}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>
