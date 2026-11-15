<!--
@component
A horizontal or vertical divider. Decorative by default, hidden from assistive technology; with
`decorative` false, it is announced as a separator.
-->
<script lang="ts">
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		orientation = 'horizontal',
		decorative = true,
		...rest
	}: {
		/** Classes added to the line. */
		class?: string;
		/** A horizontal line, full width, or a vertical one, full height. */
		orientation?: 'horizontal' | 'vertical';
		/** Whether it only decorates; false when it separates content assistive technology should know apart. */
		decorative?: boolean;
		/** Other attributes, passed on to the `<div>`. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'shrink-0 bg-border',
		orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
		className
	)}
	data-slot="separator"
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	{...rest}
></div>
