<!--
@component
An on/off switch with its label (Ark Switch); `checked` binds its state.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Switch } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	type SizeConfig = {
		control: string;
		thumb: string;
		checkedTranslate: string;
		iconPx: number;
		label: string;
	};

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
		sm: {
			control: 'h-3.5 w-6',
			thumb: 'size-2.5',
			checkedTranslate: 'data-[state=checked]:translate-x-2.5',
			iconPx: 10,
			label: 'text-xs'
		},
		md: {
			control: 'h-4.25 w-7.5',
			thumb: 'size-3.25',
			checkedTranslate: 'data-[state=checked]:translate-x-3.25',
			iconPx: 12,
			label: 'text-sm'
		},
		lg: {
			control: 'h-5 w-9',
			thumb: 'size-4',
			checkedTranslate: 'data-[state=checked]:translate-x-4',
			iconPx: 14,
			label: 'text-base'
		},
		xl: {
			control: 'h-7 w-13',
			thumb: 'size-6',
			checkedTranslate: 'data-[state=checked]:translate-x-6',
			iconPx: 16,
			label: 'text-lg'
		}
	};

	let {
		class: className = '',
		size = 'md',
		variant = 'default',
		label,
		checked = $bindable(undefined),
		checkedContent,
		uncheckedContent,
		children,
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'default' | 'secondary';
		label?: string;
		checked?: boolean;
		checkedContent?: Snippet;
		uncheckedContent?: Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);
</script>

<Switch.Root
	class={cn(
		'flex cursor-pointer items-center gap-2 data-disabled:pointer-events-none data-disabled:opacity-50',
		className
	)}
	data-slot="switch"
	{checked}
	onCheckedChange={(details) => (checked = details.checked)}
	{...rest}
>
	<Switch.Control
		class={cn(
			'inline-flex shrink-0 items-center rounded-full border-2 border-transparent bg-border-strong transition-colors outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background',
			{
				'data-[state=checked]:bg-primary': variant === 'default',
				'data-[state=checked]:bg-hover': variant === 'secondary'
			},
			sz.control
		)}
	>
		<Switch.Thumb
			class={cn(
				'group pointer-events-none flex items-center justify-center rounded-full bg-paper shadow-sm ring-0 transition-transform duration-150 ease-standard',
				'data-[state=unchecked]:translate-x-0',
				sz.thumb,
				sz.checkedTranslate
			)}
		>
			{#if checkedContent}
				<span
					class={cn(
						'absolute scale-50 opacity-0 transition-all duration-200 group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100',
						{
							'data-[state=checked]:bg-primary': variant === 'default',
							'text-muted': variant === 'secondary'
						}
					)}
				>
					{@render checkedContent()}
				</span>
			{/if}
			{#if uncheckedContent}
				<span
					class="absolute scale-50 text-muted opacity-0 transition-all duration-200 group-data-[state=unchecked]:scale-100 group-data-[state=unchecked]:opacity-100"
				>
					{@render uncheckedContent()}
				</span>
			{/if}
		</Switch.Thumb>
	</Switch.Control>
	{#if label || children}
		<Switch.Label class={cn('leading-none font-medium', sz.label)}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</Switch.Label>
	{/if}
	<Switch.HiddenInput />
</Switch.Root>
