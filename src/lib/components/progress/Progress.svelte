<!--
@component
A horizontal progress bar (Ark Progress), with an optional label and value. The label names the
bar for assistive technology; without one, the bar is named by its value.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Progress } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		showValue = false,
		children,
		value,
		max = 100,
		...rest
	}: {
		/** Classes added to the root, around the label and the bar. */
		class?: string;
		/** What is progressing, such as "Upload"; it names the bar. */
		label?: string;
		/** Shows the value as a percentage, beside the label. */
		showValue?: boolean;
		/** Content between the label and the bar. */
		children?: Snippet;
		/** How far it has gone, from 0 to `max`. */
		value: number;
		/** The value of a finished task. */
		max?: number;
		/** Other props of Ark's `Progress.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Progress.Root
	{value}
	{max}
	class={cn('flex w-full flex-col gap-2', className)}
	data-slot="progress"
	{...rest}
>
	{#if label || showValue}
		<div class="flex items-center justify-between gap-2">
			{#if label}
				<Progress.Label class="text-sm font-medium" data-slot="progress-label">
					{label}
				</Progress.Label>
			{/if}
			{#if showValue}
				<Progress.ValueText
					class="ml-auto text-sm text-muted tabular-nums"
					data-slot="progress-value"
				/>
			{/if}
		</div>
	{/if}
	{@render children?.()}
	<Progress.Track
		class="relative h-2 w-full overflow-hidden rounded-full bg-surface"
		aria-label={label || undefined}
	>
		<Progress.Range class="h-full rounded-r-full bg-primary transition-all" />
	</Progress.Track>
</Progress.Root>
