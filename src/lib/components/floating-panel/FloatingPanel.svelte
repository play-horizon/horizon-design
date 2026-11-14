<!--
@component
A panel that floats over the window and can be dragged and resized (Ark FloatingPanel);
`closeLabel` names its close button.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { FloatingPanel } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	let {
		trigger,
		triggerClass = '',
		title,
		children,
		closeLabel,
		frosted = false,
		class: className = '',
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		children?: Snippet;
		class?: string;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<FloatingPanel.Root {...rest}>
	<FloatingPanel.Trigger class={cn(triggerClass)} data-slot="floating-panel-trigger">
		{@render trigger?.()}
	</FloatingPanel.Trigger>
	<Portal>
		<FloatingPanel.Positioner class="z-80">
			<FloatingPanel.Content
				class={cn(
					'w-80 overflow-hidden rounded-xl border border-border-strong bg-raised shadow-lg inset-shadow-highlight data-[state=open]:animate-zoom-in',
					frosted && 'frosted',
					className
				)}
				data-slot="floating-panel-content"
			>
				<FloatingPanel.Header
					class="relative flex items-center justify-between border-b border-border px-4 py-3"
					data-slot="floating-panel-header"
				>
					<FloatingPanel.DragTrigger class="absolute inset-0 cursor-grab active:cursor-grabbing" />
					{#if title}
						<FloatingPanel.Title
							class="relative z-10 text-sm font-semibold text-fg"
							data-slot="floating-panel-title"
						>
							{title}
						</FloatingPanel.Title>
					{/if}
					<FloatingPanel.CloseTrigger
						class="relative z-10 inline-flex size-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-hover hover:text-fg"
						aria-label={closeLabel}
						data-slot="floating-panel-close"
					>
						<MingcuteCloseLine class="size-3.5" aria-hidden="true" />
					</FloatingPanel.CloseTrigger>
				</FloatingPanel.Header>
				{#if children}
					<div class="p-4" data-slot="floating-panel-body">
						{@render children()}
					</div>
				{/if}
			</FloatingPanel.Content>
		</FloatingPanel.Positioner>
	</Portal>
</FloatingPanel.Root>
