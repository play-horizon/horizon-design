<!--
@component
Shows the toasts of a toaster made with `createToaster`, stacked at the window's edge.
-->
<script lang="ts">
	import { Toaster } from '@ark-ui/svelte';
	import Toast from './Toast.svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		toaster,
		closeLabel,
		...rest
	}: {
		class?: string;
		toaster: ReturnType<typeof import('@ark-ui/svelte').createToaster>;
		/** Each toast's close button's accessible name, such as "Close". */
		closeLabel: string;
		[key: string]: unknown;
	} = $props();
</script>

<Toaster
	{toaster}
	class={cn('pointer-events-none fixed right-4 bottom-4 z-100 w-full max-w-sm', className)}
	{...rest}
>
	{#snippet children(toast)}
		<Toast
			{closeLabel}
			title={toast().title as string | undefined}
			description={toast().description as string | undefined}
			type={(toast().type as 'info' | 'success' | 'warning' | 'error') ?? 'info'}
		/>
	{/snippet}
</Toaster>
