<!--
@component
One item of a `Marquee` (Ark Marquee.Item), spaced from the next by the marquee's `spacing`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Marquee } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the item. */
		class?: string;
		/** The item's content. */
		children?: Snippet;
		/** Other props of Ark's `Marquee.Item`. */
		[key: string]: unknown;
	} = $props();
</script>

<Marquee.Item
	class={cn('flex shrink-0 items-center', className)}
	data-slot="marquee-item"
	{...rest}
>
	{@render children?.()}
</Marquee.Item>
