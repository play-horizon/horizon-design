<!--
@component
An on/off switch with its label (Ark Switch); `checked` binds its state.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Switch } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	/** A size's track, in pixels, and its label's text size. */
	type SizeConfig = { width: number; height: number; label: string };

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
		sm: { width: 24, height: 14, label: 'text-xs' },
		md: { width: 30, height: 17, label: 'text-sm' },
		lg: { width: 36, height: 20, label: 'text-base' },
		xl: { width: 52, height: 28, label: 'text-lg' }
	};

	/** The track's border, in pixels: the gap around the thumb. */
	const inset = 2;

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
		/** An icon on the thumb while the switch is on, sized and centred by the switch. */
		checkedContent?: Snippet;
		/** An icon on the thumb while the switch is off, sized and centred by the switch. */
		uncheckedContent?: Snippet;
		/** A richer label, in place of `label`. */
		children?: Snippet;
		/** Other props of Ark's `Switch.Root`, such as `defaultChecked`, `disabled` or `onCheckedChange`. */
		[key: string]: unknown;
	} = $props();

	const sizing = $derived(sizes[size]);
	// Every length follows from the track, so each size is right by construction: the thumb fills
	// the track's height inside its border, travels the rest of its width (the same gap at both
	// ends), and holds an icon of 60% of its size, centred.
	const thumb = $derived(sizing.height - 2 * inset);
	const travel = $derived(sizing.width - sizing.height);
	const icon = $derived(Math.round(thumb * 0.6));
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
			}
		)}
		style="width: {sizing.width}px; height: {sizing.height}px; --switch-travel: {travel}px; --switch-icon: {icon}px;"
	>
		<Switch.Thumb
			class={cn(
				'group pointer-events-none relative flex items-center justify-center rounded-full bg-paper shadow-sm ring-0 transition-transform duration-150 ease-standard',
				'data-[state=unchecked]:translate-x-0',
				// The neutral checked track is the text colour, light in the dark theme, where a white
				// thumb would hardly show: the thumb takes the page colour, which contrasts with the
				// track in both themes.
				variant === 'secondary' && 'data-[state=checked]:bg-background',
				'data-[state=checked]:translate-x-(--switch-travel)'
			)}
			style="width: {thumb}px; height: {thumb}px;"
		>
			{#if checkedContent}
				<span
					class={cn(
						'absolute inset-0 flex scale-50 items-center justify-center opacity-0 transition-all duration-200 group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100 [&_svg]:size-(--switch-icon)',
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
					class="absolute inset-0 flex scale-50 items-center justify-center text-muted opacity-0 transition-all duration-200 group-data-[state=unchecked]:scale-100 group-data-[state=unchecked]:opacity-100 [&_svg]:size-(--switch-icon)"
				>
					{@render uncheckedContent()}
				</span>
			{/if}
		</Switch.Thumb>
	</Switch.Control>
	{#if label || children}
		<Switch.Label class={cn('leading-none font-medium', sizing.label)}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</Switch.Label>
	{/if}
	<Switch.HiddenInput role="switch" />
</Switch.Root>
