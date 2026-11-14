<!--
@component
A panel that floats over the window and can be dragged by its header and resized by its edges
and corners (Ark FloatingPanel); `title` names it and `closeLabel` names its close button.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { FloatingPanel, type FloatingPanelOpenChangeDetails } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	let {
		trigger,
		triggerClass = '',
		title,
		children,
		closeLabel,
		frosted = false,
		class: className = '',
		open = $bindable(),
		onOpenChange,
		...rest
	}: {
		/** The content of the button that opens the panel; no trigger when unset. */
		trigger?: Snippet;
		/** Classes of the trigger button, such as `buttonVariants(…)`. */
		triggerClass?: string;
		/** The panel's heading, which names it for assistive technology. */
		title: string;
		/** The panel's body, which scrolls when the panel is smaller than it. */
		children?: Snippet;
		/** Classes merged onto the panel. */
		class?: string;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		/** Whether the panel is open (bindable); unset, Ark's `defaultOpen` gives the first state. */
		open?: boolean;
		/** Called with the new state when the panel opens or closes. */
		onOpenChange?: (details: FloatingPanelOpenChangeDetails) => void;
		/** Other props of Ark's `FloatingPanel.Root`, such as `defaultSize`, `minSize` or `resizable`. */
		[key: string]: unknown;
	} = $props();

	const resizeAxes = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'] as const;
</script>

<FloatingPanel.Root
	{open}
	onOpenChange={(details) => {
		open = details.open;
		onOpenChange?.(details);
	}}
	{...rest}
>
	{#if trigger}
		<FloatingPanel.Trigger class={triggerClass || undefined} data-slot="floating-panel-trigger">
			{@render trigger()}
		</FloatingPanel.Trigger>
	{/if}
	<Portal>
		<FloatingPanel.Positioner class="z-80">
			<FloatingPanel.Content
				class={cn(
					'relative flex flex-col overflow-hidden rounded-xl border border-border-strong shadow-lg inset-shadow-highlight data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					className
				)}
				data-slot="floating-panel-content"
			>
				<FloatingPanel.Header
					class="relative flex shrink-0 items-center justify-between border-b border-border px-4 py-3"
					data-slot="floating-panel-header"
				>
					<FloatingPanel.DragTrigger class="absolute inset-0 cursor-grab active:cursor-grabbing" />
					<FloatingPanel.Title
						class="relative z-10 text-sm font-semibold text-fg"
						data-slot="floating-panel-title"
					>
						{title}
					</FloatingPanel.Title>
					<FloatingPanel.CloseTrigger
						class="relative z-10 inline-flex size-6 items-center justify-center rounded-md text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
						aria-label={closeLabel}
						data-slot="floating-panel-close"
					>
						<MingcuteCloseLine class="size-3.5" aria-hidden="true" />
					</FloatingPanel.CloseTrigger>
				</FloatingPanel.Header>
				{#if children}
					<div class="min-h-0 flex-1 overflow-auto p-4" data-slot="floating-panel-body">
						{@render children()}
					</div>
				{/if}
				<!-- Ark places each handle on its edge or corner; only their thickness is ours. -->
				{#each resizeAxes as axis (axis)}
					<FloatingPanel.ResizeTrigger
						{axis}
						class={axis.length === 2 ? 'size-3' : axis === 'n' || axis === 's' ? 'h-1.5' : 'w-1.5'}
						data-slot="floating-panel-resize"
					/>
				{/each}
			</FloatingPanel.Content>
		</FloatingPanel.Positioner>
	</Portal>
</FloatingPanel.Root>
