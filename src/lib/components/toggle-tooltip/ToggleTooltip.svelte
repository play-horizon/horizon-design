<!--
@component
An icon toggle, such as a toolbar's Bold, with a tooltip that names it: `label` is both the
tooltip's text and the toggle's accessible name, and `pressed` binds its state. A press shrinks it
for a moment, and the pressed state is tinted primary, distinct from a hover.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		label,
		pressed = $bindable(false),
		onPressedChange,
		side = 'top',
		children,
		...rest
	}: {
		/** Classes merged onto the toggle's button. */
		class?: string;
		/** The toggle's name, translated, such as "Bold": its tooltip and its accessible name. */
		label: string;
		/** Whether it is pressed (bindable). */
		pressed?: boolean;
		/** Called with the new state when the toggle is pressed or released. */
		onPressedChange?: (pressed: boolean) => void;
		/** The side of the toggle the tooltip shows on. */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** The toggle's icon. */
		children?: Snippet;
		/** Other props of the `Tooltip` around it (Ark's `Tooltip.Root`). */
		[key: string]: unknown;
	} = $props();

	function toggle() {
		pressed = !pressed;
		onPressedChange?.(pressed);
	}
</script>

<!-- The kit's Tooltip, opening at once: the same layer as every tooltip, above every overlay. -->
<Tooltip content={label} openDelay={0} closeDelay={0} positioning={{ placement: side }} {...rest}>
	{#snippet trigger(props)}
		<button
			{...props}
			type="button"
			aria-label={label}
			aria-pressed={pressed}
			onclick={toggle}
			class={cn(
				// A press shrinks the toggle and darkens it at once, and its pressed state is tinted
				// primary, unlike a hover: a click shows even with the pointer still on it.
				'relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent p-2 text-muted transition-[background-color,color,scale] duration-150 outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary active:scale-90 active:bg-active aria-pressed:bg-primary-subtle aria-pressed:text-primary aria-pressed:hover:bg-primary/20 motion-reduce:active:scale-100',
				className
			)}
			data-slot="toggle-tooltip"
		>
			{@render children?.()}
		</button>
	{/snippet}
</Tooltip>
