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
		label: string;
	};

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
		sm: {
			control: 'h-3.5 w-6',
			thumb: 'size-2.5',
			checkedTranslate: 'data-[state=checked]:translate-x-2.5',
			label: 'text-xs'
		},
		md: {
			control: 'h-4.25 w-7.5',
			thumb: 'size-3.25',
			checkedTranslate: 'data-[state=checked]:translate-x-3.25',
			label: 'text-sm'
		},
		lg: {
			control: 'h-5 w-9',
			thumb: 'size-4',
			checkedTranslate: 'data-[state=checked]:translate-x-4',
			label: 'text-base'
		},
		xl: {
			control: 'h-7 w-13',
			thumb: 'size-6',
			checkedTranslate: 'data-[state=checked]:translate-x-6',
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
		/** Classes merged onto Ark's `Switch.Root`. */
		class?: string;
		/** The control's size. */
		size?: 'sm' | 'md' | 'lg' | 'xl';
		/** The checked track's colour: primary, or neutral (the text colour). */
		variant?: 'default' | 'secondary';
		/** The switch's label, translated; without it or `children`, the switch has no name. */
		label?: string;
		/** Whether the switch is on (bindable); unset, it starts at Ark's `defaultChecked`. */
		checked?: boolean;
		/** An icon on the thumb while the switch is on. */
		checkedContent?: Snippet;
		/** An icon on the thumb while the switch is off. */
		uncheckedContent?: Snippet;
		/** A richer label, in place of `label`. */
		children?: Snippet;
		/** Other props of Ark's `Switch.Root`, such as `defaultChecked`, `disabled` or `onCheckedChange`. */
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
	bind:checked
	{...rest}
>
	<Switch.Control
		class={cn(
			'inline-flex shrink-0 items-center rounded-full border-2 border-transparent bg-faint transition-colors outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background',
			{
				'data-[state=checked]:bg-primary': variant === 'default',
				'data-[state=checked]:bg-fg-2': variant === 'secondary'
			},
			sz.control
		)}
	>
		<Switch.Thumb
			class={cn(
				'group pointer-events-none flex items-center justify-center rounded-full bg-paper shadow-sm ring-0 transition-transform duration-150 ease-standard',
				'data-[state=unchecked]:translate-x-0',
				// The neutral checked track is the text colour, light in the dark theme, where a white
				// thumb would hardly show: the thumb takes the page colour, which contrasts with the
				// track in both themes.
				variant === 'secondary' && 'data-[state=checked]:bg-background',
				sz.thumb,
				sz.checkedTranslate
			)}
		>
			{#if checkedContent}
				<span
					class={cn(
						'absolute scale-50 opacity-0 transition-all duration-200 group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100',
						{
							'text-primary': variant === 'default',
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
	<Switch.HiddenInput role="switch" />
</Switch.Root>
