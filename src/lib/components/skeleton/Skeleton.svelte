<!--
@component
A placeholder block that pulses while content loads (pages show skeletons, not spinners).
-->
<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		/** Classes that size and shape the block, such as `h-4 w-2/3` or `size-12 rounded-full`. */
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn('animate-pulse rounded-md bg-hover [animation-duration:2s]', className)}
	data-slot="skeleton"
	{...rest}
></div>
