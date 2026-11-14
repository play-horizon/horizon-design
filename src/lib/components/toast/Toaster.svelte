<!--
@component
Shows the toasts of a toaster made with `createToaster`, stacked at the window's edge, in a live
region named by `label`. The toaster's `placement` and `offsets` position the stack.
-->
<script lang="ts">
	import { Toaster } from '@ark-ui/svelte';
	import Toast from './Toast.svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		toaster,
		label,
		closeLabel,
		...rest
	}: {
		/** Classes merged onto Ark's `Toaster`. */
		class?: string;
		/** The toaster whose toasts show, from `createToaster`. */
		toaster: ReturnType<typeof import('@ark-ui/svelte').createToaster>;
		/** The toasts region's accessible name, such as "Notifications". */
		label: string;
		/** Each toast's close button's accessible name, such as "Close". */
		closeLabel: string;
		/** Other props of Ark's `Toaster`. */
		[key: string]: unknown;
	} = $props();

	const types = ['info', 'success', 'warning', 'error', 'loading'] as const;

	// Ark's toast type is any string: a type the toast has no tint for shows as info.
	function tintOf(type: string | undefined): (typeof types)[number] {
		return types.find((known) => known === type) ?? 'info';
	}
</script>

<Toaster
	{toaster}
	aria-label={label}
	class={cn('pointer-events-none w-full max-w-sm', className)}
	{...rest}
>
	{#snippet children(toast)}
		<Toast
			{closeLabel}
			title={toast().title as string | undefined}
			description={toast().description as string | undefined}
			type={tintOf(toast().type)}
		/>
	{/snippet}
</Toaster>
