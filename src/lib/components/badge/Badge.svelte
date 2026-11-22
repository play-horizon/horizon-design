<!--
@component
A small label for state the user must notice: a status, an unread or error count, a restriction
badge. Metadata (tags, a kind, a role) is muted text, not a badge. `variant` sets its colour
(neutral, primary, success, warning, danger, info, accent, and the Editor's server and local
modes); `size` its height (md 20 px, sm 17 px).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	const variants = {
		neutral: 'bg-surface border-border text-fg-2',
		primary: 'bg-primary-subtle border-primary-border text-primary',
		success: 'bg-success-subtle border-success-border text-success',
		warning: 'bg-warning-subtle border-warning-border text-warning',
		danger: 'bg-danger-subtle border-danger-border text-danger',
		info: 'bg-info-subtle border-info-border text-info',
		accent: 'bg-accent-subtle border-accent-border text-accent font-medium',
		server: 'bg-server/12 border-server/45 text-server',
		local: 'bg-local/12 border-local/45 text-local'
	};

	const sizes = {
		sm: 'h-4.25 gap-1 px-1.25 text-2xs [&_svg]:size-2.5',
		md: 'h-5 gap-1 px-1.75 text-xs [&_svg]:size-3'
	};

	let {
		variant = 'neutral',
		size = 'md',
		class: className = '',
		children,
		...rest
	}: {
		/** The colour. */
		variant?: keyof typeof variants;
		/** The height: `md` 20 px, `sm` 17 px. */
		size?: keyof typeof sizes;
		/** Classes merged onto the badge. */
		class?: string;
		/** The badge's text, with an optional icon. */
		children?: Snippet;
		/** Other attributes of the badge. */
		[key: string]: unknown;
	} = $props();
</script>

<span
	class={cn(
		'inline-flex shrink-0 items-center rounded-md border font-semibold whitespace-nowrap',
		variants[variant],
		sizes[size],
		className
	)}
	data-slot="badge"
	data-variant={variant}
	{...rest}
>
	{@render children?.()}
</span>
