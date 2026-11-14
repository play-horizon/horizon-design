<!--
@component
A panel that slides in from the edge of the window (Ark Drawer), with a title, content and footer;
`closeLabel` names its close button.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer } from '@ark-ui/svelte';
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

<Drawer.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Drawer.Trigger class={triggerClass || undefined} data-slot="drawer-trigger">
			{@render trigger()}
		</Drawer.Trigger>
	{/if}
	<Portal>
		<Drawer.Backdrop
			class="fixed inset-0 z-60 bg-scrim data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Drawer.Positioner class="fixed inset-0 z-70 flex justify-end overflow-hidden">
			<Drawer.Content
				class={cn(
					'flex h-full w-full max-w-sm flex-col border-l border-border-strong shadow-lg inset-shadow-highlight data-[state=closed]:animate-sheet-exit-right data-[state=open]:animate-sheet-enter-right',
					frosted ? 'frosted' : 'bg-raised',
					className
				)}
				data-slot="drawer-content"
			>
				{#if showClose}
					<Drawer.CloseTrigger
						class="absolute top-3.5 right-3.5 inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
						aria-label={closeLabel}
						data-slot="drawer-close"
					>
						<MingcuteCloseLine class="size-4" aria-hidden="true" />
					</Drawer.CloseTrigger>
				{/if}
				{#if title || description}
					<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="drawer-header">
						{#if title}
							<h2 class="text-[1.0625rem] font-bold" data-slot="drawer-title">
								{title}
							</h2>
						{/if}
						{#if description}
							<p class="text-sm text-muted" data-slot="drawer-description">
								{description}
							</p>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="flex-1 overflow-auto p-6" data-slot="drawer-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center gap-2 p-6 pt-0" data-slot="drawer-footer">
						{@render footer()}
					</div>
				{/if}
			</Drawer.Content>
		</Drawer.Positioner>
	</Portal>
</Drawer.Root>
