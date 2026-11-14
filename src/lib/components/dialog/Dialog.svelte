<!--
@component
A modal dialog (Ark Dialog): a title, a description, the content and a footer, on the raised
surface over a scrim; `closeLabel` names its close button; `frosted` for a translucent surface.
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
		showClose?: boolean;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		class?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Dialog.Trigger data-slot="dialog-trigger">
			{#snippet asChild(getProps)}
				<div {...getProps()} class={triggerClass || 'contents'}>
					{@render trigger()}
				</div>
			{/snippet}
		</Dialog.Trigger>
	{/if}
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-60 bg-scrim data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Dialog.Positioner class="fixed inset-0 z-70 flex items-center justify-center p-4">
			<Dialog.Content
				class={cn(
					'relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border-strong shadow-lg inset-shadow-highlight data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					className
				)}
				data-slot="dialog-content"
			>
				{#if showClose}
					<Dialog.CloseTrigger
						class="absolute top-3.5 right-3.5 inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
						aria-label={closeLabel}
						data-slot="dialog-close"
					>
						<MingcuteCloseLine class="size-4" aria-hidden="true" />
					</Dialog.CloseTrigger>
				{/if}
				{#if title || description}
					<div class="flex flex-col gap-1 px-4.5 pt-4 pr-12 pb-3" data-slot="dialog-header">
						{#if title}
							<Dialog.Title class="text-[1.0625rem] font-bold" data-slot="dialog-title">
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description class="text-sm text-muted" data-slot="dialog-description">
								{description}
							</Dialog.Description>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="min-h-0 overflow-auto px-4.5 pb-4" data-slot="dialog-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div
						class="flex items-center justify-end gap-2 border-t border-border bg-surface px-4.5 py-3"
						data-slot="dialog-footer"
					>
						{@render footer()}
					</div>
				{/if}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>
