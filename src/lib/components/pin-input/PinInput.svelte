<!--
@component
A row of one-character fields for a code, such as the sign-up code (Ark PinInput).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { PinInput } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		children,
		length = 4,
		value = $bindable([]),
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		length?: number;
		value?: string[];
		[key: string]: unknown;
	} = $props();
</script>

<PinInput.Root
	class={cn('flex flex-col gap-2', className)}
	data-slot="pin-input"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<PinInput.Label class="text-sm leading-none font-medium" data-slot="pin-input-label">
			{label}
		</PinInput.Label>
	{/if}
	{@render children?.()}
	<PinInput.Control class="flex items-center gap-2">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array(length) as _, i (i)}
			<PinInput.Input
				index={i}
				class="flex size-10 items-center justify-center rounded-lg border border-border bg-sunken text-center text-sm font-medium text-fg transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
			/>
		{/each}
	</PinInput.Control>
</PinInput.Root>
