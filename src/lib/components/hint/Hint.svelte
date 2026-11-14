<!--
@component
A short help text under a field.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<p class={cn('mt-1 text-xs text-muted', className)} data-slot="hint" {...rest}>
	{@render children?.()}
</p>
