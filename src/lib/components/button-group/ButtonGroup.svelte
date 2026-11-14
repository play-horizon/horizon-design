<!--
@component
Groups buttons into one connected row or column.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		orientation = 'horizontal',
		children,
		...rest
	}: {
		class?: string;
		orientation?: 'horizontal' | 'vertical';
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const base = 'flex items-center';

	const orientations: Record<string, string> = {
		horizontal:
			'flex-row [&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:border-l-0',
		vertical:
			'flex-col [&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none [&>button:not(:first-child)]:border-t-0'
	};
</script>

<div
	class={cn(base, orientations[orientation], className)}
	data-slot="button-group"
	data-orientation={orientation}
	{...rest}
>
	{@render children?.()}
</div>
