<!--
@component
A checkbox with its label (Ark Checkbox); `checked` binds true, false or indeterminate, drawn
as a check or a dash.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Checkbox, type CheckboxCheckedChangeDetails } from '@ark-ui/svelte';
	import MingcuteCheckFill from '~icons/mingcute/check-fill';
	import MingcuteSubtractFill from '~icons/mingcute/subtract-fill';
	import { cn } from '#lib/utils.js';

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
		checked = $bindable(),
		onCheckedChange,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The box's and the label's size. */
		size?: 'sm' | 'md' | 'lg';
		/** The label's text. */
		label?: string;
		/** The label's content, instead of `label`. */
		children?: Snippet;
		/** Checked, unchecked or `indeterminate` (bindable); when unset, `defaultChecked` gives the first state. */
		checked?: boolean | 'indeterminate';
		/** Called with the new state when the box is checked or unchecked. */
		onCheckedChange?: (details: CheckboxCheckedChangeDetails) => void;
		/** Other props of Ark's `Checkbox.Root`, such as `defaultChecked`, `disabled` and `name`. */
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
	onCheckedChange={(details) => {
		checked = details.checked;
		onCheckedChange?.(details);
	}}
	{...rest}
>
	<Checkbox.Control
		class={cn(
			'peer shrink-0 border border-border bg-sunken shadow-sm transition-colors outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-on-primary',
			sz.control
		)}
	>
		<Checkbox.Indicator class="flex items-center justify-center text-current">
			<MingcuteCheckFill width={sz.icon} height={sz.icon} aria-hidden="true" />
		</Checkbox.Indicator>
		<Checkbox.Indicator indeterminate class="flex items-center justify-center text-current">
			<MingcuteSubtractFill width={sz.icon} height={sz.icon} aria-hidden="true" />
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
