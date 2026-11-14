<!--
@component
A short help text under a field. Give it an `id` and point the field's `aria-describedby` at it,
so assistive technology reads it with the field; inside a `Field`, use its `helperText` instead.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the paragraph. */
		class?: string;
		/** The help text. */
		children?: Snippet;
		/** Other attributes of the paragraph, such as its `id`. */
		[key: string]: unknown;
	} = $props();
</script>

<p class={cn('mt-1 text-xs text-muted', className)} data-slot="hint" {...rest}>
	{@render children?.()}
</p>
