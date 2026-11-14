<!--
@component
A text input on a sunken field, with optional icons or controls at its start and end (`start`,
`end`). Focus turns the border primary with a soft ring; an invalid value (`invalid`, or an
invalid `Field` around it) turns it danger and sets `aria-invalid`. Inside a `Field`, it takes the
field's label, description and error.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Field } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 'md',
		value = $bindable(),
		invalid = false,
		start,
		end,
		...rest
	}: {
		/** Classes merged onto the field's frame. */
		class?: string;
		/** The field's height and text size. */
		size?: 'sm' | 'md' | 'lg';
		/** The text (bindable), updated as the user types. */
		value?: string;
		/** Marks the value as invalid: a danger border and `aria-invalid`. */
		invalid?: boolean;
		/** An icon or control before the text, such as a search icon. */
		start?: Snippet;
		/** An icon or control after the text, such as a keyboard shortcut or a clear button. */
		end?: Snippet;
		/** Other attributes of the `<input>`, such as `type`, `placeholder` or `aria-label`. */
		[key: string]: unknown;
	} = $props();

	const sizes = {
		sm: 'h-control-sm gap-1.5 rounded-md px-2 text-sm',
		md: 'h-control-md gap-2 rounded-lg px-2.5 text-sm',
		lg: 'h-control-lg gap-2.5 rounded-lg px-3.5 text-md'
	};

	// The danger state follows the input's `aria-invalid`, which an invalid `Field` sets too.
	const frame = $derived(
		cn(
			'bg-sunken border-border text-fg flex w-full min-w-0 items-center border transition-[border-color,box-shadow] [&_svg]:text-muted [&_svg]:size-4 [&_svg]:shrink-0',
			'has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-primary/20',
			'has-[input:disabled]:opacity-50',
			'has-[input[aria-invalid=true]]:border-danger has-[input[aria-invalid=true]:focus-visible]:border-danger has-[input[aria-invalid=true]:focus-visible]:ring-danger/20',
			sizes[size],
			className
		)
	);
</script>

<div class={frame} data-slot="input">
	{#if start}{@render start()}{/if}
	<Field.Input
		class="min-w-0 flex-1 self-stretch bg-transparent outline-none placeholder:text-muted disabled:cursor-not-allowed"
		aria-invalid={invalid || undefined}
		bind:value
		{...rest}
	/>
	{#if end}{@render end()}{/if}
</div>
