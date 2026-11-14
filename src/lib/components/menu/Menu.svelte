<!--
@component
A dropdown menu opened by its trigger (Ark Menu); `frosted` for a translucent surface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		trigger,
		triggerClass = '',
		children,
		contentClass = '',
		frosted = false,
		open = $bindable(false),
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		children?: Snippet;
		contentClass?: string;
		/** A translucent, blurred surface: for overlays above busy content only. */
		frosted?: boolean;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Menu.Trigger class={triggerClass || undefined} data-slot="menu-trigger">
			{@render trigger()}
		</Menu.Trigger>
	{/if}
	<Portal>
		<Menu.Positioner>
			<Menu.Content
				class={cn(
					'z-50 min-w-36 overflow-hidden rounded-lg border border-border-strong p-1 text-fg shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised',
					contentClass
				)}
				data-slot="menu-content"
			>
				{@render children?.()}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>
