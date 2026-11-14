<!--
@component
A small dot that shows a status: online (or running), away, busy (or failing) or offline, with a
soft ring in its colour. `label` names the status for assistive technology, translated; without
it the dot is decorative, for when the status is written next to it.
-->
<script lang="ts">
	import { cn } from '$lib/utils';

	const variants = {
		online: 'bg-success ring-success/18 ring-3',
		away: 'bg-warning ring-warning/18 ring-3',
		busy: 'bg-danger ring-danger/20 ring-3',
		offline: 'bg-faint'
	};

	let {
		variant = 'online',
		label,
		class: className = '',
		...rest
	}: {
		/** The status shown, which sets the dot's colour. */
		variant?: keyof typeof variants;
		/** The status's accessible name, such as "Online". */
		label?: string;
		class?: string;
		/** Other attributes of the dot's `<span>`. */
		[key: string]: unknown;
	} = $props();
</script>

<span
	class={cn('inline-block size-1.75 shrink-0 rounded-full', variants[variant], className)}
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	data-slot="status"
	data-variant={variant}
	{...rest}
></span>
