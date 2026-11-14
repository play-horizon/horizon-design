<!--
@component
One panel of a `Splitter`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Splitter } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		id,
		children,
		...rest
	}: {
		class?: string;
		id: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.Panel {id} class={cn('overflow-hidden', className)} data-slot="splitter-panel" {...rest}>
	{@render children?.()}
</Splitter.Panel>
