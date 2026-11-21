<!--
@component
An icon-only button with a tooltip that names it: `label` is both the tooltip's text and the
button's accessible name, so the two never differ. `variant` sets its look as `Button`'s does,
and `size` its square size (xs 22 px to lg 40 px).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { mergeProps } from '@ark-ui/svelte/utils';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { buttonVariants, type ButtonVariant } from '../button/button-variants';

	let {
		label,
		variant = 'ghost',
		size = 'md',
		side = 'top',
		class: className = '',
		disabled = false,
		type = 'button',
		children,
		...rest
	}: {
		/** The button's action, translated, such as "Delete": its tooltip and its accessible name. */
		label: string;
		/** The look, as `Button`'s. */
		variant?: ButtonVariant;
		/** The square size. */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/** The side of the button the tooltip shows on. */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** Classes merged onto the button. */
		class?: ClassValue | null;
		/** Turns the button off. */
		disabled?: boolean;
		/** The button's type in a form; `button` by default, so it never submits by accident. */
		type?: 'button' | 'submit' | 'reset';
		/** The icon, `aria-hidden`. */
		children: Snippet;
		/** Other attributes of the button, such as `onclick`. */
		[key: string]: unknown;
	} = $props();
</script>

<Tooltip content={label} positioning={{ placement: side }}>
	{#snippet trigger(props)}
		<button
			{...mergeProps(props, rest)}
			{type}
			{disabled}
			aria-label={label}
			class={buttonVariants({ variant, size: `icon-${size}`, className })}
			data-slot="icon-button"
			data-variant={variant}
		>
			{@render children()}
		</button>
	{/snippet}
</Tooltip>
