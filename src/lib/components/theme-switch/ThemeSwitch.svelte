<!--
@component
The theme switch: three icon buttons (system, dark, light) on a sunken pill, the chosen one
raised. Choosing one calls `theme.set`, which saves the mode and crossfades the page. The labels
name each mode for assistive technology and tooltips; the app passes them translated.
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
	import { cn } from '$lib/utils';
	import MingcuteComputerLine from '~icons/mingcute/computer-line';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import { theme, type ThemeMode } from '$lib/theme.svelte';

	let {
		labels,
		size = 'md',
		class: className = ''
	}: {
		/** The names of the group and of each mode, translated. */
		labels: ThemeSwitchLabels;
		/** The control's size. */
		size?: 'sm' | 'md';
		/** Classes merged onto the `<div>`. */
		class?: string;
	} = $props();

	const modes = [
		{ value: 'system', Icon: MingcuteComputerLine },
		{ value: 'dark', Icon: MingcuteMoonLine },
		{ value: 'light', Icon: MingcuteSunLine }
	] as const satisfies { value: ThemeMode; Icon: unknown }[];
</script>

<div
	role="group"
	aria-label={labels.group}
	class={cn('inline-flex gap-0.5 rounded-lg border border-border bg-sunken p-0.5', className)}
	data-slot="theme-switch"
>
	{#each modes as mode (mode.value)}
		<button
			type="button"
			aria-pressed={theme.mode === mode.value}
			aria-label={labels[mode.value]}
			title={labels[mode.value]}
			class={cn(
				'grid place-items-center rounded-md text-muted transition-colors outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary',
				size === 'sm' ? 'size-5.5 [&_svg]:size-3.5' : 'size-6.5 [&_svg]:size-4',
				theme.mode === mode.value && 'bg-surface text-fg shadow-sm inset-shadow-highlight'
			)}
			onclick={() => theme.set(mode.value)}
		>
			<mode.Icon aria-hidden="true" />
		</button>
	{/each}
</div>
