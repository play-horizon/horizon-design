<!--
@component
Makes a whole card clickable through the `LinkOverlay` inside it, while the other links and
controls in it stay usable: they are lifted above the overlay's stretched area.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes merged onto the box. */
		class?: string;
		/** The card's content, with one `LinkOverlay`. */
		children?: Snippet;
		/** Other attributes of the box. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- The other links and controls are lifted above the overlay's stretched area; `:where` keeps
     the selector's specificity at zero, so a control's own position and z-index still win. -->
<div
	class={cn(
		'relative',
		'[:where(&_:is(a[href],button,input,select,textarea,[tabindex]):not([data-slot=link-overlay]))]:relative',
		'[:where(&_:is(a[href],button,input,select,textarea,[tabindex]):not([data-slot=link-overlay]))]:z-1',
		className
	)}
	data-slot="link-box"
	{...rest}
>
	{@render children?.()}
</div>
