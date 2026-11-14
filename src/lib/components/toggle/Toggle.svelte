<!--
@component
A button that stays pressed or not (Ark Toggle); `pressed` binds its state. An icon-only toggle
takes its accessible name through `aria-label`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Toggle } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		variant = 'default',
		size = 'md',
		pressed = $bindable(false),
		...rest
	}: {
		/** Classes merged onto Ark's `Toggle.Root`. */
		class?: string;
		/** The toggle's content: an icon, a label, or both. */
		children?: Snippet;
		/** Borderless, or outlined. */
		variant?: 'default' | 'outline';
		/** The control's size. */
		size?: 'sm' | 'md' | 'lg';
		/** Whether it is pressed (bindable). */
		pressed?: boolean;
		/** Other props of Ark's `Toggle.Root`, such as `aria-label`, `disabled` or `onPressedChange`. */
		[key: string]: unknown;
	} = $props();

	const sizes: Record<string, string> = {
		sm: 'h-7 px-2.5 text-xs',
		md: 'h-9 px-3',
		lg: 'h-10 px-4 text-base'
	};
</script>

<Toggle.Root
	class={cn(
		'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium text-muted transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
		variant === 'default' &&
			'bg-transparent hover:bg-active hover:text-fg data-[state=on]:bg-primary data-[state=on]:text-on-primary',
		variant === 'outline' &&
			'border border-border bg-transparent hover:bg-active hover:text-fg data-[state=on]:border-primary/50 data-[state=on]:bg-primary data-[state=on]:text-on-primary',
		sizes[size],
		className
	)}
	data-slot="toggle"
	bind:pressed
	{...rest}
>
	{@render children?.()}
</Toggle.Root>
