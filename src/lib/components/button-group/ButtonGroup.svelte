<!--
@component
Groups buttons into one connected row or column.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		orientation = 'horizontal',
		children,
		...rest
	}: {
		/** Classes merged onto the group. */
		class?: string;
		/** A row or a column. */
		orientation?: 'horizontal' | 'vertical';
		/** The buttons, direct children of the group. */
		children?: Snippet;
		/** Other attributes of the group, such as `aria-label`. */
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
	role="group"
	data-slot="button-group"
	data-orientation={orientation}
	{...rest}
>
	{@render children?.()}
</div>
