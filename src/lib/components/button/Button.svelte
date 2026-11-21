<!--
@component
A button. `variant` sets its look (default, primary for the one main action, tint, ghost, danger,
danger-solid, art over game art, link) and `size` its height (xs 22 px to lg 40 px; `icon-*` for square icon-only
buttons, which need an `aria-label`). `loading` shows a spinner, disables it and sets
`aria-busy`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
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
		/** The look. */
		variant?: ButtonVariant;
		/** The height, or a square `icon-*` size for an icon-only button. */
		size?: ButtonSize;
		/** Shows a spinner and disables the button while an action runs. */
		loading?: boolean;
		/** Fully rounded ends. */
		pill?: boolean;
		/** Classes merged onto the button: a string, or an array or object as Svelte's `class` takes. */
		class?: ClassValue | null;
		/** Turns the button off. */
		disabled?: boolean;
		/** The button's type in a form; `button` by default, so it never submits by accident. */
		type?: 'button' | 'submit' | 'reset';
		/** The button's content: its text, with optional icons. */
		children?: Snippet;
		/** Other attributes of the button, such as `onclick` and `aria-label`. */
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
