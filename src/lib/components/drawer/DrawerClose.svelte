<!--
@component
A button that closes the `Drawer` it is in.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer } from '@ark-ui/svelte';

	let {
		children,
		...rest
	}: {
		/** The button's content, such as its text. */
		children?: Snippet;
		/** Other props of Ark's `Drawer.CloseTrigger`, such as `class`. */
		[key: string]: unknown;
	} = $props();
</script>

<Drawer.CloseTrigger data-slot="drawer-close" {...rest}>
	{@render children?.()}
</Drawer.CloseTrigger>
