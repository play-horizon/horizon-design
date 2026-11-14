<!--
@component
Resizable panels separated by draggable handles (Ark Splitter).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Splitter, type SplitterPanelData as PanelData } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import { BROWSER as browser } from 'esm-env';

	let {
		class: className = '',
		panels = [],
		children,
		...rest
	}: {
		class?: string;
		panels?: PanelData[];
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

{#if browser}
	<Splitter.Root
		{panels}
		class={cn('flex h-full w-full', className)}
		data-slot="splitter"
		{...rest}
	>
		{@render children?.()}
	</Splitter.Root>
{/if}
