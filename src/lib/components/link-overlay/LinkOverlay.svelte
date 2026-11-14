<!--
@component
The link of a `LinkBox`, stretched over the whole box: a click anywhere in the box follows it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		href,
		children,
		...rest
	}: {
		/** Classes merged onto the link. */
		class?: string;
		/** Where the link leads, already resolved by the app. */
		href: string;
		/** The link's text, which names it. */
		children?: Snippet;
		/** Other attributes of the `<a>`, such as `target`. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<a
	class={cn('before:absolute before:inset-0 before:z-0', className)}
	{href}
	data-slot="link-overlay"
	{...rest}
>
	{@render children?.()}
</a>
