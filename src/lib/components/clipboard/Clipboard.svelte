<!--
@component
Copies a value to the clipboard, showing it, selectable, with a copy button that confirms the
copy (Ark Clipboard); Ark `translations` name the button (`triggerLabel`), and the button, which
has no text, shows the same name in a tooltip, before and after the copy.
-->
<script lang="ts">
	import { Clipboard, type ClipboardRootProps } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		value,
		label,
		translations,
		class: className = '',
		...rest
	}: {
		/** The text copied, and shown. */
		value: string;
		/** The visible label above the value, such as "Invite link". */
		label?: string;
		/**
		 * `triggerLabel(copied)` names the copy button, before and after the copy: its accessible
		 * name and its tooltip.
		 */
		translations: Required<NonNullable<ClipboardRootProps['translations']>>;
		/** Classes merged onto the root. */
		class?: string;
		/** Other props of Ark's `Clipboard.Root`, such as `onStatusChange` and `timeout`. */
		[key: string]: unknown;
	} = $props();
</script>

<Clipboard.Root
	{value}
	{translations}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="clipboard"
	{...rest}
>
	{#if label}
		<Clipboard.Label class="mb-1 block text-sm font-medium text-fg" data-slot="clipboard-label">
			{label}
		</Clipboard.Label>
	{/if}
	<div class="flex items-center gap-2">
		<div
			class="flex h-8 flex-1 items-center gap-2 rounded-lg border border-border bg-sunken px-3 text-sm text-fg"
			data-slot="clipboard-input"
		>
			<Clipboard.ValueText class="flex-1 truncate select-text" />
		</div>
		<Clipboard.Context>
			{#snippet render(clipboard)}
				{@const name = translations.triggerLabel(clipboard().copied)}
				<!-- Kept open on click, so the tooltip turns to the copied label under the pointer. -->
				<Tooltip content={name} closeOnClick={false}>
					{#snippet trigger(props)}
						<Clipboard.Trigger
							{...props}
							aria-label={name}
							class="relative inline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg border border-border text-muted transition-all hover:bg-hover hover:text-fg"
							data-slot="clipboard-trigger"
						>
							<Clipboard.Indicator>
								<MingcuteCopy2Line class="size-4" aria-hidden="true" />
								{#snippet copied()}
									<MingcuteCheckLine class="size-4 text-success" aria-hidden="true" />
								{/snippet}
							</Clipboard.Indicator>
						</Clipboard.Trigger>
					{/snippet}
				</Tooltip>
			{/snippet}
		</Clipboard.Context>
	</div>
</Clipboard.Root>
