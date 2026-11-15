<!--
@component
A button that closes the `Popover` it is in.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover } from '@ark-ui/svelte';

	let {
		class: className = '',
		label,
		children,
		...rest
	}: {
		/** Classes of the button. */
		class?: string;
		/** The button's accessible name, such as "Close"; the same as its text when it has one. */
		label: string;
		/** The button's content: its text or an icon. */
		children?: Snippet;
		/** Other props of Ark's `Popover.CloseTrigger`. */
		[key: string]: unknown;
	} = $props();
</script>

<Popover.CloseTrigger
	class={className || undefined}
	aria-label={label}
	data-slot="popover-close"
	{...rest}
>
	{@render children?.()}
</Popover.CloseTrigger>
