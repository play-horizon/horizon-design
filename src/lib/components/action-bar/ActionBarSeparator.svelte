<!--
@component
A vertical divider between groups of actions in an `ActionBar`.
-->
<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		/** Classes merged onto the divider. */
		class?: string;
		/** Other attributes of the divider. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn('mx-1 h-6 w-px bg-border', className)}
	role="separator"
	aria-orientation="vertical"
	data-slot="action-bar-separator"
	{...rest}
></div>
