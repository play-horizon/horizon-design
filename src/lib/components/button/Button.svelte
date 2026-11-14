<!--
@component
A button. `variant` sets its look (default, primary for the one main action, tint, ghost, danger,
danger-solid, link) and `size` its height (xs 22 px to lg 40 px; `icon-*` for square icon-only
buttons, which need an `aria-label`). `loading` shows a spinner, disables it and sets
`aria-busy`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from '../spinner/Spinner.svelte';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from './button-variants';

	let {
		variant = 'default',
		size = 'md',
		loading = false,
		pill = false,
		class: className = '',
		disabled = false,
		type = 'button',
		children,
		...rest
	}: {
		variant?: ButtonVariant;
		size?: ButtonSize;
		/** Shows a spinner and disables the button while an action runs. */
		loading?: boolean;
		/** Fully rounded ends. */
		pill?: boolean;
		class?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<button
	class={buttonVariants({ variant, size, pill, className })}
	data-slot="button"
	data-variant={variant}
	{type}
	aria-busy={loading || undefined}
	disabled={loading || disabled}
	{...rest}
>
	{#if loading}
		<Spinner aria-hidden="true" />
	{/if}
	{@render children?.()}
</button>
