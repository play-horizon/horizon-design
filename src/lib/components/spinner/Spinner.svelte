<!--
@component
A spinning loading indicator, for an action in progress inside a control (a button). Pages and
lists show skeletons instead. With `label`, the text shows beside it and is announced; with only
`aria-label`, it is announced without text; with neither, it is decorative.
-->
<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteLoading3Fill from '~icons/mingcute/loading-3-fill';

	const sizes = {
		sm: 'size-3',
		md: 'size-4',
		lg: 'size-5',
		xl: 'size-6'
	};

	let {
		class: className = '',
		size = 'md',
		label,
		'aria-label': ariaLabel,
		...rest
	}: {
		class?: string;
		size?: keyof typeof sizes;
		/** Text shown beside the spinner and announced. */
		label?: string;
		/** Announced when there is no visible label. */
		'aria-label'?: string;
		[key: string]: unknown;
	} = $props();
</script>

{#if label}
	<span
		class={cn('inline-flex items-center gap-2', className)}
		data-slot="spinner-wrapper"
		role="status"
		{...rest}
	>
		<MingcuteLoading3Fill
			aria-hidden="true"
			class={cn('shrink-0 animate-spin', sizes[size])}
			data-slot="spinner"
		/>
		<span data-slot="spinner-label">{label}</span>
	</span>
{:else}
	<MingcuteLoading3Fill
		aria-label={ariaLabel}
		aria-hidden={ariaLabel ? undefined : 'true'}
		role={ariaLabel ? 'status' : undefined}
		class={cn('animate-spin', sizes[size], className)}
		data-slot="spinner"
		{...rest}
	/>
{/if}
