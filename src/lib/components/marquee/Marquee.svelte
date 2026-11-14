<!--
@component
Content that scrolls continuously, pausing on hover (Ark Marquee).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Marquee } from '@ark-ui/svelte';
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

<Marquee.Root
	class={cn('relative flex overflow-hidden [--gap:1rem]', className)}
	data-slot="marquee"
	{...rest}
>
	<Marquee.Viewport class="flex flex-1 overflow-hidden">
		<Marquee.Content class="flex min-w-full shrink-0 items-center gap-[--gap]">
			{@render children?.()}
		</Marquee.Content>
		<Marquee.Content aria-hidden="true" class="flex min-w-full shrink-0 items-center gap-[--gap]">
			{@render children?.()}
		</Marquee.Content>
	</Marquee.Viewport>
</Marquee.Root>
