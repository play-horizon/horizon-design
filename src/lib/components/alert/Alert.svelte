<!--
@component
An inline message (a banner): a neutral, info, success, warning or error tint, an icon, a title
and a description.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';

	let {
		variant = 'default',
		title,
		description,
		icon,
		children,
		class: className = '',
		...rest
	}: {
		/** The tint and its icon; `destructive` is the same as `error`. */
		variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'destructive';
		/** The message's title. */
		title?: string;
		/** The message's text, under the title. */
		description?: string;
		/** Replaces the variant's icon. */
		icon?: Snippet;
		/** More content under the description, such as an action. */
		children?: Snippet;
		/** Classes merged onto the alert. */
		class?: string;
		/** Other attributes of the alert. */
		[key: string]: unknown;
	} = $props();

	const base = 'flex gap-3 items-start p-4 rounded-lg border inset-shadow-highlight';

	const variants: Record<string, string> = {
		default: 'bg-hover border-border',
		info: 'bg-info-subtle border-info-border',
		success: 'bg-success-subtle border-success-border',
		warning: 'bg-warning-subtle border-warning-border',
		error: 'bg-danger-subtle border-danger-border',
		destructive: 'bg-danger-subtle border-danger-border'
	};

	/** Warnings and errors interrupt assistive technology (`alert`); the others wait their turn. */
	const urgent = $derived(
		variant === 'warning' || variant === 'error' || variant === 'destructive'
	);
</script>

<div
	class={cn(base, variants[variant], className)}
	role={urgent ? 'alert' : 'status'}
	data-slot="alert"
	data-variant={variant}
	{...rest}
>
	{#if icon}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			{@render icon()}
		</div>
	{:else if variant === 'info'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteInformationLine class="size-4" aria-hidden="true" />
		</div>
	{:else if variant === 'success'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteCheckCircleLine class="size-4" aria-hidden="true" />
		</div>
	{:else if variant === 'warning'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteAlertLine class="size-4" aria-hidden="true" />
		</div>
	{:else if variant === 'error' || variant === 'destructive'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteCloseCircleLine class="size-4" aria-hidden="true" />
		</div>
	{/if}
	<div class="flex flex-col gap-0.5">
		{#if title}
			<p class="mb-1 leading-none font-semibold tracking-tight" data-slot="alert-title">
				{title}
			</p>
		{/if}
		{#if description}
			<p class="text-sm opacity-90" data-slot="alert-description">{description}</p>
		{/if}
		{@render children?.()}
	</div>
</div>
