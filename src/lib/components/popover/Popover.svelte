<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover } from '@ark-ui/svelte';
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
		open = $bindable(false),
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
		contentClass?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Popover.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Popover.Trigger data-slot="popover-trigger">
			{#snippet asChild(getProps)}
				<div {...getProps()} class={triggerClass || 'contents'}>
					{@render trigger()}
				</div>
			{/snippet}
		</Popover.Trigger>
	{/if}
	<Portal>
		<Popover.Positioner>
			<Popover.Content
				class={cn(
					'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border text-popover-foreground bg-popover z-50 w-72 rounded-xl border shadow-xl backdrop-blur-xl outline-none',
					contentClass
				)}
				data-slot="popover-content"
			>
				{#if title || description}
					<div class="flex flex-col space-y-1 p-4 pb-0" data-slot="popover-header">
						{#if title}
							<h4 class="text-sm leading-none font-semibold" data-slot="popover-title">{title}</h4>
						{/if}
						{#if description}
							<p class="text-muted-foreground text-xs" data-slot="popover-description">
								{description}
							</p>
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
