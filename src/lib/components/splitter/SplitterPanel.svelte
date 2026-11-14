<!--
@component
One panel of a `Splitter`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Splitter } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		id,
		children,
		...rest
	}: {
		/** Classes added to the panel. */
		class?: string;
		/** The panel's id, as in the `Splitter`'s `panels`. */
		id: string;
		/** The panel's content. */
		children?: Snippet;
		/** Other props of Ark's `Splitter.Panel`. */
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.Panel {id} class={cn('overflow-hidden', className)} data-slot="splitter-panel" {...rest}>
	{@render children?.()}
</Splitter.Panel>
