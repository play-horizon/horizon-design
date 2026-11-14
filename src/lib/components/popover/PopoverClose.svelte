<!--
@component
A button that closes the `Popover` it is in.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover } from '@ark-ui/svelte';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes of the button. */
		class?: string;
		/** The button's content; an icon-only one also takes an `aria-label`. */
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Popover.CloseTrigger class={className || undefined} data-slot="popover-close" {...rest}>
	{@render children?.()}
</Popover.CloseTrigger>
