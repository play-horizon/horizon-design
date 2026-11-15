<!--
@component
A pad to draw a signature or a sketch (Ark SignaturePad), with a clear button once something is
drawn. `label` shows above the pad and names it, `roleDescription` is the role it is announced as,
and `clearLabel` names the clear button. In a form, Ark's `name` submits the drawn paths as JSON.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SignaturePad } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		roleDescription,
		clearLabel,
		children,
		...rest
	}: {
		/** Classes added to the root, around the label, the pad and the button. */
		class?: string;
		/** The pad's label, such as "Signature". */
		label: string;
		/** The role the pad is announced as, such as "signature pad". */
		roleDescription: string;
		/** The clear button's text, such as "Clear". */
		clearLabel: string;
		/** Content after the clear button, such as a hint. */
		children?: Snippet;
		/** Other props of Ark's `SignaturePad.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<SignaturePad.Root
	class={cn('flex flex-col gap-2', className)}
	data-slot="signature-pad"
	translations={{ control: label, clearTrigger: clearLabel }}
	{...rest}
>
	<SignaturePad.Label class="text-sm font-medium text-fg">{label}</SignaturePad.Label>
	<SignaturePad.Control
		aria-roledescription={roleDescription}
		class="relative h-40 w-full cursor-crosshair overflow-hidden rounded-xl border border-border bg-surface"
	>
		<!-- Ark gives the drawing a fixed English <title>; the control already names the pad, so the
		     drawing is hidden from assistive technology. -->
		<SignaturePad.Segment
			aria-hidden="true"
			class="absolute inset-0 [&_path]:fill-fg [&_path]:stroke-none"
		/>
		<SignaturePad.Guide
			class="absolute right-4 bottom-3 left-4 h-px border-b border-dashed border-border text-xs text-muted"
		/>
	</SignaturePad.Control>
	<div class="flex justify-end">
		<SignaturePad.ClearTrigger
			class="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-muted transition-colors hover:bg-hover hover:text-fg"
		>
			{clearLabel}
		</SignaturePad.ClearTrigger>
	</div>
	<SignaturePad.Context>
		{#snippet render(api)}
			<SignaturePad.HiddenInput value={JSON.stringify(api().paths)} />
		{/snippet}
	</SignaturePad.Context>
	{@render children?.()}
</SignaturePad.Root>
