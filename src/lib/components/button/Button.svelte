<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import Spinner from '../spinner/Spinner.svelte';

	const variants = {
		default:
			'bg-primary-subtle-bg text-primary border border-ring shadow-glass hover:bg-primary/15 focus-visible:border-primary',
		outline:
			'bg-transparent text-foreground border border-border shadow-glass hover:bg-accent hover:text-accent-foreground focus-visible:border-primary',
		destructive:
			'bg-destructive-subtle-bg text-destructive border border-destructive-ring shadow-glass hover:bg-destructive/15 focus-visible:ring-destructive-ring',
		secondary:
			'bg-secondary text-secondary-foreground border border-border shadow-glass hover:opacity-80 focus-visible:border-primary',
		ghost:
			'hover:bg-accent hover:text-accent-foreground border border-transparent focus-visible:border-primary',
		link: 'text-primary underline-offset-4 border border-transparent hover:underline focus-visible:border-primary',
		success:
			'bg-success-subtle-bg text-success border border-success-ring shadow-glass hover:bg-success/15 focus-visible:ring-success-ring',
		warning:
			'bg-warning-subtle-bg text-warning border border-warning-ring shadow-glass hover:bg-warning/15 focus-visible:ring-warning-ring',
		info: 'bg-info-subtle-bg text-info border border-info-ring shadow-glass hover:bg-info/15 focus-visible:ring-info-ring'
	} as const;

	const sizes = {
		xs: 'inline-flex items-center justify-center h-6 gap-1.5 px-2 text-xs rounded-md [&_svg:not([class*="size-"])]:size-2.5',
		sm: 'inline-flex items-center justify-center h-7 px-2.5 gap-1.5 rounded-md [&_svg:not([class*="size-"])]:size-3.5',
		md: 'inline-flex items-center justify-center h-8 px-3 py-2 rounded-md',
		lg: 'inline-flex items-center justify-center h-9 px-3.5 rounded-lg',
		xl: 'inline-flex items-center justify-center h-10 text-base px-4 rounded-lg',
		'icon-xs': 'inline-grid place-content-center size-6 rounded-md',
		'icon-sm': 'inline-grid place-content-center size-7 rounded-md',
		'icon-md': 'inline-grid place-content-center size-8 rounded-md',
		'icon-lg': 'inline-grid place-content-center size-9 rounded-lg',
		'icon-xl':
			'inline-grid place-content-center size-10 rounded-lg [&_svg:not([class*="size-"])]:size-5'
	};

	type Variant = keyof typeof variants;
	type Size = keyof typeof sizes;

	interface ButtonProps {
		variant?: Variant;
		size?: Size;
		isLoading?: boolean;
		clickEffect?: boolean;
		pill?: boolean;
		class?: string;
		children?: Snippet;
		disabled?: boolean;
		[key: string]: unknown;
	}

	const base =
		'shrink-0 whitespace-nowrap font-medium text-sm transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-200 ease-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0';

	let {
		variant = 'default',
		size = 'md',
		isLoading = false,
		clickEffect = true,
		pill = false,
		class: className = '',
		children,
		disabled,
		...rest
	}: ButtonProps = $props();
</script>

<button
	class={cn(
		base,
		variants[variant],
		sizes[size],
		{
			'active:scale-98': clickEffect,
			'rounded-full': pill
		},
		className
	)}
	data-slot="button"
	data-variant={variant}
	data-size={size}
	type="button"
	aria-busy={isLoading}
	disabled={isLoading || disabled}
	{...rest}
>
	<span class="flex w-full items-center justify-center gap-2">
		{#if isLoading}
			<Spinner aria-hidden="true" />
		{/if}
		{@render children?.()}
	</span>
</button>
