<!--
@component
Text or an icon attached to the side of the `Input` in an `InputGroup`, such as `https://`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the addon. */
		class?: string;
		/** The addon's text or icon; an icon is decorative, so give it `aria-hidden`. */
		children?: Snippet;
		/** Other attributes of the addon. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'flex shrink-0 items-center border border-r-0 border-border bg-hover px-3 text-sm text-muted first:rounded-l-lg last:rounded-r-lg last:border-r last:border-l-0',
		className
	)}
	data-slot="input-addon"
	{...rest}
>
	{@render children?.()}
</div>
