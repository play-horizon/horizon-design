<!--
@component
A pad to draw a signature or a sketch (Ark SignaturePad).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SignaturePad } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		children,
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<SignaturePad.Root class={cn('flex flex-col gap-2', className)} data-slot="signature-pad" {...rest}>
	{#if label}
		<SignaturePad.Label class="text-sm font-medium text-fg">{label}</SignaturePad.Label>
	{/if}
	<SignaturePad.Control
		class="relative h-40 w-full cursor-crosshair overflow-hidden rounded-xl border border-border bg-surface"
	>
		<SignaturePad.Segment class="absolute inset-0 [&_path]:fill-fg [&_path]:stroke-none" />
		<SignaturePad.Guide
			class="absolute right-4 bottom-3 left-4 h-px border-b border-dashed border-border text-xs text-muted"
		/>
	</SignaturePad.Control>
	<div class="flex justify-end">
		<SignaturePad.ClearTrigger
			class="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-muted transition-colors hover:bg-hover hover:text-fg"
		>
			Clear
		</SignaturePad.ClearTrigger>
	</div>
	<SignaturePad.Context>
		{#snippet render(api)}
			<SignaturePad.HiddenInput value={JSON.stringify(api().paths)} />
		{/snippet}
	</SignaturePad.Context>
	{@render children?.()}
</SignaturePad.Root>
