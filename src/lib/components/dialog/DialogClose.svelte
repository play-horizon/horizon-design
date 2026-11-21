<!--
@component
A button that closes the `Dialog` it is in: the children, or a close icon named by `label`, which
is then also its tooltip.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { mergeProps } from '@ark-ui/svelte/utils';
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { dialogContext } from './context';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	type Content =
		| {
				/** The button's content, such as its text. */
				children: Snippet;
				/** The button's accessible name, when its content doesn't say it. */
				label?: string;
		  }
		| {
				/** Unset: a close icon at the dialog's top right. */
				children?: undefined;
				/** The icon's accessible name and tooltip, such as "Close". */
				label: string;
		  };

	let {
		class: className = '',
		label,
		children,
		...rest
	}: Content & {
		/** Classes merged onto the button, such as `buttonVariants(…)`. */
		class?: string;
		/** Other props of Ark's `Dialog.CloseTrigger`. */
		[key: string]: unknown;
	} = $props();

	// The dialog's close button id, shared with the icon's tooltip (see `context.ts`).
	const closeTriggerId = dialogContext()?.closeTriggerId;

	const classes = $derived(
		cn(
			'rounded-sm text-muted transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none',
			{ 'absolute top-4 right-4 p-1 opacity-70 hover:opacity-100': !children },
			className
		)
	);
</script>

{#if children}
	<Dialog.CloseTrigger class={classes} aria-label={label} data-slot="dialog-close" {...rest}>
		{@render children()}
	</Dialog.CloseTrigger>
{:else}
	<Tooltip content={label} triggerId={closeTriggerId}>
		{#snippet trigger(props)}
			<Dialog.CloseTrigger
				{...mergeProps(props, rest)}
				class={classes}
				aria-label={label}
				data-slot="dialog-close"
			>
				<MingcuteCloseLine class="size-4" aria-hidden="true" />
			</Dialog.CloseTrigger>
		{/snippet}
	</Tooltip>
{/if}
