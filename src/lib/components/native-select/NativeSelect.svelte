<!--
@component
The browser's own select, styled like the other fields; `value` binds the chosen option. Name it
with a `<label for>` or an `aria-label`, both passed to the `<select>`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteDownLine from '~icons/mingcute/down-line';

	let {
		class: className = '',
		value = $bindable(),
		children,
		...rest
	}: {
		/** Classes added to the `<select>`. */
		class?: string;
		/** The chosen option's value. */
		value?: string;
		/** The `<option>` and `<optgroup>` elements. */
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div class="relative w-full">
	<select
		class={cn(
			'flex h-control-md w-full appearance-none rounded-lg border border-border bg-sunken px-2.5 pr-8 text-sm text-fg transition-colors outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		data-slot="native-select"
		bind:value
		{...rest}
	>
		{@render children?.()}
	</select>
	<MingcuteDownLine
		class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
		aria-hidden="true"
	/>
</div>
