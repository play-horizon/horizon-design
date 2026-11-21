<!--
@component
A panel that slides in from the end edge of the window (Ark Drawer), with a title, content and
footer; `title` names it and `closeLabel` names its close button and is its tooltip. It is swiped toward that edge to
dismiss it.
-->
<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import { Drawer, type DrawerOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
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
		open = $bindable(),
		onOpenChange,
		ids: appIds,
		...rest
	}: {
		/** The content of the button that opens the drawer; no trigger when unset. */
		trigger?: Snippet;
		/** Classes of the trigger button, such as `buttonVariants(…)`. */
		triggerClass?: string;
		/** The drawer's heading, which names it for assistive technology. */
		title: string;
		/** A line under the title, which describes the drawer for assistive technology. */
		description?: string;
		/** The drawer's body. */
		children?: Snippet;
		/** The footer under the body, such as Save. */
		footer?: Snippet;
		/** Whether to show the close button at the top right. */
		showClose?: boolean;
		/** The close button's accessible name and tooltip, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Classes merged onto the drawer's panel. */
		class?: string;
		/** Whether the drawer is open (bindable); unset, Ark's `defaultOpen` gives the first state. */
		open?: boolean;
		/** Called with the new state when the drawer opens or closes. */
		onOpenChange?: (details: DrawerOpenChangeDetails) => void;
		/** Ark's `ids`, merged with the ids the kit gives the buttons it adds a tooltip to, which win. */
		ids?: ComponentProps<typeof Drawer.Root>['ids'];
		/** Other props of Ark's `Drawer.Root`, such as `onExitComplete`. */
		[key: string]: unknown;
	} = $props();

	// The close button's id, shared by Ark's dialog (which focuses it first in an alert dialog) and
	// its tooltip, which both find it by id.
	const uid = $props.id();
	const closeTriggerId = `${uid}-close`;
</script>

<Drawer.Root
	ids={{ ...appIds, closeTrigger: closeTriggerId }}
	swipeDirection="end"
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
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
					'relative flex h-full w-full max-w-sm flex-col border-l border-border-strong shadow-lg inset-shadow-highlight data-[state=closed]:animate-sheet-exit-right data-[state=open]:animate-sheet-enter-right',
					frosted ? 'frosted' : 'bg-raised',
					className
				)}
				data-slot="drawer-content"
			>
				{#if showClose}
					<Tooltip content={closeLabel} triggerId={closeTriggerId}>
						{#snippet trigger(props)}
							<Drawer.CloseTrigger
								{...props}
								class="absolute top-3.5 right-3.5 inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
								aria-label={closeLabel}
								data-slot="drawer-close"
							>
								<MingcuteCloseLine class="size-4" aria-hidden="true" />
							</Drawer.CloseTrigger>
						{/snippet}
					</Tooltip>
				{/if}
				<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="drawer-header">
					<Drawer.Title class="text-[1.0625rem] font-bold" data-slot="drawer-title">
						{title}
					</Drawer.Title>
					{#if description}
						<Drawer.Description class="text-sm text-muted" data-slot="drawer-description">
							{description}
						</Drawer.Description>
					{/if}
				</div>
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
