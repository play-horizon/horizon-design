<!--
@component
A confirmation dialog for a destructive or irreversible action: a title, a description, Cancel and
the confirming action, whose labels the app passes translated. Cancel takes the focus when it
opens, so Enter never confirms by accident; the confirming button calls `onAction` and closes it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type DialogOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../button/button-variants';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		cancelLabel,
		actionLabel,
		onAction,
		frosted = false,
		cancelClass = '',
		actionClass = '',
		open = $bindable(false),
		onOpenChange,
		children,
		...rest
	}: {
		/** The element that opens the dialog, such as a Delete button's content. */
		trigger?: Snippet;
		/** Classes of the trigger's wrapper, such as `buttonVariants(…)`; `contents` when empty. */
		triggerClass?: string;
		/** The question the dialog asks, such as "Delete this game?". */
		title?: string;
		/** What the action does and that it can't be undone. */
		description?: string;
		/** The cancel button's text, such as "Cancel". */
		cancelLabel: string;
		/** The confirming button's text, which names the action, such as "Delete game". */
		actionLabel: string;
		/** Called when the action is confirmed, just before the dialog closes. */
		onAction: () => void;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Classes merged onto the cancel button. */
		cancelClass?: string;
		/** Classes merged onto the confirming button. */
		actionClass?: string;
		/** Whether the dialog is open (bindable). */
		open?: boolean;
		/** Called with the new state when the dialog opens or closes. */
		onOpenChange?: (details: DialogOpenChangeDetails) => void;
		/** More content between the description and the buttons. */
		children?: Snippet;
		/** Other props of Ark's `Dialog.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.Root
	role="alertdialog"
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<Dialog.Trigger data-slot="alert-dialog-trigger">
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
					'relative w-full max-w-md overflow-hidden rounded-xl border border-border-strong shadow-lg inset-shadow-highlight data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised'
				)}
				data-slot="alert-dialog-content"
			>
				<div class="flex flex-col gap-1 px-4.5 pt-4 pb-3" data-slot="alert-dialog-header">
					{#if title}
						<Dialog.Title class="text-[1.0625rem] font-bold" data-slot="alert-dialog-title">
							{title}
						</Dialog.Title>
					{/if}
					{#if description}
						<Dialog.Description class="text-sm text-muted" data-slot="alert-dialog-description">
							{description}
						</Dialog.Description>
					{/if}
				</div>
				{#if children}
					<div class="px-4.5 pb-4" data-slot="alert-dialog-body">
						{@render children()}
					</div>
				{/if}
				<div
					class="flex items-center justify-end gap-2 border-t border-border bg-surface px-4.5 py-3"
					data-slot="alert-dialog-footer"
				>
					<Dialog.CloseTrigger
						class={cn(buttonVariants({ variant: 'default' }), cancelClass)}
						data-slot="alert-dialog-cancel"
					>
						{cancelLabel}
					</Dialog.CloseTrigger>
					<Dialog.Context>
						{#snippet children(dialog)}
							<button
								type="button"
								class={cn(buttonVariants({ variant: 'danger-solid' }), actionClass)}
								data-slot="alert-dialog-action"
								onclick={() => {
									onAction();
									dialog().setOpen(false);
								}}
							>
								{actionLabel}
							</button>
						{/snippet}
					</Dialog.Context>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>
