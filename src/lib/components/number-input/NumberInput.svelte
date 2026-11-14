<!--
@component
A number field with increment and decrement buttons (Ark NumberInput).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { NumberInput } from '@ark-ui/svelte';
	import MingcuteUpLine from '~icons/mingcute/up-line';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		children,
		value = $bindable(''),
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		value?: string;
		[key: string]: unknown;
	} = $props();
</script>

<NumberInput.Root
	class={cn('flex min-w-12 flex-col gap-1.5', className)}
	data-slot="number-input"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<NumberInput.Label class="text-sm leading-none font-medium" data-slot="number-input-label">
			{label}
		</NumberInput.Label>
	{/if}
	{@render children?.()}
	<NumberInput.Control
		class="flex h-9 w-full overflow-hidden rounded-lg border border-border bg-sunken transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
	>
		<NumberInput.Input
			class="min-w-0 flex-1 bg-transparent pl-2 text-sm text-fg outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<div class="flex shrink-0 flex-col border-l border-border">
			<NumberInput.IncrementTrigger
				class="flex flex-1 items-center justify-center px-1.5 text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-1 focus-visible:ring-primary"
			>
				<MingcuteUpLine class="size-3" />
			</NumberInput.IncrementTrigger>
			<NumberInput.DecrementTrigger
				class="flex flex-1 items-center justify-center border-t border-border px-1.5 text-muted transition-colors outline-none hover:bg-hover hover:text-fg focus-visible:ring-1 focus-visible:ring-primary"
			>
				<MingcuteDownLine class="size-3" />
			</NumberInput.DecrementTrigger>
		</div>
	</NumberInput.Control>
</NumberInput.Root>
