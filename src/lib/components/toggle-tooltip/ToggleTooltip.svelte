<!--
@component
An icon toggle, such as a toolbar's Bold, with a tooltip that names it: `label` is both the
tooltip's text and the toggle's accessible name, and `pressed` binds its state.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		pressed = $bindable(false),
		onPressedChange,
		side = 'top',
		children,
		...rest
	}: {
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
		/** Other props of Ark's `Tooltip.Root`. */
		[key: string]: unknown;
	} = $props();

	function toggle() {
		pressed = !pressed;
		onPressedChange?.(pressed);
	}
</script>

<Tooltip.Root openDelay={0} closeDelay={0} positioning={{ placement: side }} {...rest}>
	<Tooltip.Trigger
		type="button"
		aria-label={label}
		aria-pressed={pressed}
		onclick={toggle}
		class={cn(
			'relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent p-2 text-muted transition-all outline-none hover:bg-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary aria-pressed:bg-hover aria-pressed:text-fg',
			className
		)}
		data-slot="toggle-tooltip"
	>
		{@render children?.()}
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content
				class="z-50 rounded-md border border-border bg-raised px-2.5 py-1 text-xs font-medium text-fg shadow-md data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
			>
				{label}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Root>
