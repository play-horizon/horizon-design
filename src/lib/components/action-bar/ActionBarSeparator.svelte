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
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn('mx-1 h-6 w-px bg-border', className)}
	role="separator"
	data-slot="action-bar-separator"
	{...rest}
></div>
