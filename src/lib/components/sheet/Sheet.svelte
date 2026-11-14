<!--
@component
A modal panel that slides in from one side of the window (Ark Dialog); `closeLabel` names its
close button; `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

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
		open = $bindable(false),
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
		side?: 'top' | 'bottom' | 'left' | 'right';
		showClose?: boolean;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		class?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();

	const sides: Record<string, string> = {
		top: 'inset-x-0 top-0 border-b data-[state=open]:animate-sheet-enter-top data-[state=closed]:animate-sheet-exit-top max-h-[80vh] w-full rounded-b-xl',
		bottom:
			'inset-x-0 bottom-0 border-t data-[state=open]:animate-sheet-enter-bottom data-[state=closed]:animate-sheet-exit-bottom max-h-[80vh] w-full rounded-t-xl',
		left: 'inset-y-0 left-0 border-r data-[state=open]:animate-sheet-enter-left data-[state=closed]:animate-sheet-exit-left h-full w-full max-w-sm rounded-r-xl',
		right:
			'inset-y-0 right-0 border-l data-[state=open]:animate-sheet-enter-right data-[state=closed]:animate-sheet-exit-right h-full w-full max-w-sm rounded-l-xl'
	};
</script>

<Dialog.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
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
					'absolute flex flex-col border-border-strong bg-raised shadow-lg inset-shadow-highlight',
					sides[side],
					frosted && 'frosted',
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
					<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="sheet-header">
						{#if title}
							<h2 class="text-[1.0625rem] font-bold" data-slot="sheet-title">
								{title}
							</h2>
						{/if}
						{#if description}
							<p class="text-sm text-muted" data-slot="sheet-description">
								{description}
							</p>
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
