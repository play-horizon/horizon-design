<!--
@component
A confirmation dialog for a destructive or irreversible action: a title, a description, Cancel and
the confirming action, whose labels the app passes translated.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../button/button-variants';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		cancelLabel,
		actionLabel,
		frosted = false,
		cancelClass = '',
		actionClass = '',
		children,
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		description?: string;
		/** The cancel button's text, such as "Cancel". */
		cancelLabel: string;
		/** The confirming button's text, which names the action, such as "Delete game". */
		actionLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		cancelClass?: string;
		actionClass?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.Root closeOnInteractOutside={false} {...rest}>
	<Dialog.Trigger data-slot="alert-dialog-trigger">
		{#snippet asChild(getProps)}
			<div {...getProps()} class={cn(triggerClass) || 'contents'}>
				{@render trigger?.()}
			</div>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Backdrop
		class="fixed inset-0 z-60 bg-scrim data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
	/>
	<Dialog.Positioner class="fixed inset-0 z-70 flex items-center justify-center p-4">
		<Dialog.Content
			role="alertdialog"
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
				<Dialog.CloseTrigger
					class={cn(buttonVariants({ variant: 'danger-solid' }), actionClass)}
					data-slot="alert-dialog-action"
				>
					{actionLabel}
				</Dialog.CloseTrigger>
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog.Root>
