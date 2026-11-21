<!--
@component
The theme switch: three icon buttons (system, dark, light) on a sunken pill, with a raised
highlight that slides to the chosen one. Once it has slid, choosing calls `theme.set`, which saves
the mode and crossfades the page (at once under reduced motion). The labels name each mode, both for assistive technology and in each button's tooltip; the app passes them
translated.
-->
<script lang="ts" module>
	/** The switch's accessible texts. */
	export interface ThemeSwitchLabels {
		/** The group's name, such as "Theme". */
		group: string;
		/** The system mode's name, such as "System". */
		system: string;
		/** The dark mode's name, such as "Dark". */
		dark: string;
		/** The light mode's name, such as "Light". */
		light: string;
	}
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import MingcuteComputerLine from '~icons/mingcute/computer-line';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import { theme, type ThemeMode } from '#lib/theme.svelte.js';
	import { prefersReducedMotion } from '#lib/motion/page-transition.js';
	import {
		slidingIndicator,
		slidingIndicatorClasses,
		slidingIndicatorMs
	} from '#lib/motion/sliding-indicator.js';

	let {
		labels,
		size = 'md',
		tooltipSide = 'bottom',
		class: className = ''
	}: {
		/** The names of the group and of each mode, translated. */
		labels: ThemeSwitchLabels;
		/** The control's size. */
		size?: 'sm' | 'md';
		/** The side of the buttons their tooltips show on. */
		tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
		/** Classes merged onto the `<div>`. */
		class?: string;
	} = $props();

	const modes = [
		{ value: 'system', Icon: MingcuteComputerLine },
		{ value: 'dark', Icon: MingcuteMoonLine },
		{ value: 'light', Icon: MingcuteSunLine }
	] as const satisfies { value: ThemeMode; Icon: unknown }[];

	// The mode just chosen, shown while the highlight slides to it. The theme changes once the slide
	// is over: its crossfade (a view transition of the whole page) would otherwise show the highlight
	// at its new place at once.
	let pending = $state<ThemeMode | null>(null);
	let applying: ReturnType<typeof setTimeout> | undefined;
	const chosen = $derived(pending ?? theme.mode);

	function choose(mode: ThemeMode) {
		clearTimeout(applying);
		if (prefersReducedMotion()) {
			pending = null;
			void theme.set(mode);
			return;
		}
		pending = mode;
		applying = setTimeout(async () => {
			await theme.set(mode);
			// A later choice may be sliding meanwhile: leave its highlight in place.
			if (pending === mode) pending = null;
		}, slidingIndicatorMs);
	}
</script>

<div
	role="group"
	aria-label={labels.group}
	class={cn(
		'group relative inline-flex gap-0.5 rounded-lg border border-border bg-sunken p-0.5',
		className
	)}
	data-slot="theme-switch"
	{@attach slidingIndicator('[aria-pressed="true"]')}
>
	<span
		class={cn(slidingIndicatorClasses, 'rounded-md bg-surface shadow-sm inset-shadow-highlight')}
		aria-hidden="true"
		data-slot="theme-switch-indicator"
	></span>
	{#each modes as mode (mode.value)}
		<Tooltip content={labels[mode.value]} positioning={{ placement: tooltipSide }}>
			{#snippet trigger(props)}
				<button
					{...props}
					type="button"
					aria-pressed={chosen === mode.value}
					aria-label={labels[mode.value]}
					class={cn(
						'relative grid place-items-center rounded-md text-muted transition-colors outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary',
						size === 'sm' ? 'size-5.5 [&_svg]:size-3.5' : 'size-6.5 [&_svg]:size-4',
						chosen === mode.value && 'text-fg'
					)}
					onclick={() => choose(mode.value)}
				>
					<mode.Icon aria-hidden="true" />
				</button>
			{/snippet}
		</Tooltip>
	{/each}
</div>
