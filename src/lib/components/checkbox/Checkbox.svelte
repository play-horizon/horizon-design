<!--
@component
A checkbox with its label (Ark Checkbox); `checked` binds true, false or indeterminate.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Checkbox } from '@ark-ui/svelte';
	import MingcuteCheckFill from '~icons/mingcute/check-fill';
	import { cn } from '$lib/utils';

	type SizeConfig = { control: string; icon: number; label: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: { control: 'size-3.5 rounded-sm', icon: 10, label: 'text-xs' },
		md: { control: 'size-4 rounded-sm', icon: 12, label: 'text-sm' },
		lg: { control: 'size-5 rounded', icon: 14, label: 'text-base' }
	};

	let {
		class: className = '',
		size = 'md',
		label,
		children,
		checked = $bindable(undefined),
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		children?: Snippet;
		checked?: boolean | 'indeterminate';
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);
</script>

<Checkbox.Root
	class={cn(
		'flex cursor-pointer items-center gap-2 data-disabled:pointer-events-none data-disabled:opacity-50',
		className
	)}
	data-slot="checkbox"
	{checked}
	onCheckedChange={(details) => (checked = details.checked)}
	{...rest}
>
	<Checkbox.Control
		class={cn(
			'peer shrink-0 border border-border bg-sunken shadow-sm transition-colors outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary',
			sz.control
		)}
	>
		<Checkbox.Indicator class="flex items-center justify-center text-current">
			<MingcuteCheckFill width={sz.icon} height={sz.icon} />
		</Checkbox.Indicator>
	</Checkbox.Control>
	{#if label || children}
		<Checkbox.Label class={cn('leading-none font-medium', sz.label)}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</Checkbox.Label>
	{/if}
	<Checkbox.HiddenInput />
</Checkbox.Root>
