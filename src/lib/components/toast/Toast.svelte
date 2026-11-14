<!--
@component
One toast message: an info, success, warning or error tint, a title, a description and a close
button named by `closeLabel`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Toast } from '@ark-ui/svelte';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title,
		description,
		type = 'info',
		closeLabel,
		children,
		...rest
	}: {
		class?: string;
		title?: string;
		description?: string;
		type?: 'info' | 'success' | 'warning' | 'error';
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const typeStyles: Record<string, string> = {
		info: 'border-info-border bg-info-subtle',
		success: 'border-success-border bg-success-subtle',
		warning: 'border-warning-border bg-warning-subtle',
		error: 'border-danger-border bg-danger-subtle'
	};
</script>

<Toast.Root
	class={cn(
		// Ark positions and stacks toasts through these variables.
		'z-(--z-index,auto) [height:var(--height,auto)] [translate:0_var(--y,0)] [scale:var(--scale,1)] opacity-(--opacity,1) transition-[translate,opacity,scale,height] duration-400 ease-emphasized',
		'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border bg-raised p-4 shadow-md',
		typeStyles[type],
		className
	)}
	data-slot="toast"
	{...rest}
>
	<div class="flex flex-1 flex-col gap-1">
		{#if title}
			<Toast.Title class="text-sm leading-none font-semibold tracking-tight">
				{title}
			</Toast.Title>
		{/if}
		{#if description}
			<Toast.Description class="text-sm text-muted">
				{description}
			</Toast.Description>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	<Toast.CloseTrigger
		aria-label={closeLabel}
		class="absolute top-2 right-2 rounded p-1 text-muted opacity-0 transition-opacity outline-none group-hover:opacity-70 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary"
	>
		<MingcuteCloseLine class="size-3.5" aria-hidden="true" />
	</Toast.CloseTrigger>
</Toast.Root>
