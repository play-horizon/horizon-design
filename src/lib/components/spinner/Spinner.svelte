<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteLoading3Fill from '~icons/mingcute/loading-3-fill';

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
		sm: 'size-3',
		md: 'size-4',
		lg: 'size-5',
		xl: 'size-6'
	};

	let {
		class: className = '',
		size = 'md',
		label,
		'aria-label': ariaLabel = 'Loading',
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		label?: string;
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
		class={cn('animate-spin', sizes[size], className)}
		data-slot="spinner"
		role="status"
		{...rest}
	/>
{/if}
