<!--
@component
The Editor window's docking layout: horizon-layout styled with horizon-design, with a button that
restores a maximised view (`restoreLabel`).
-->
<script lang="ts">
	import { HorizonLayout as HL } from 'horizon-layout';
	import type { LayoutConfig, View, Id, KeyboardControls } from 'horizon-layout';
	import { SvelteMap } from 'svelte/reactivity';
	import MingcuteRestoreLine from '~icons/mingcute/restore-line';
	import './horizon-layout.css';
	import type { Snippet } from 'svelte';
	import Button from '../../components/button/Button.svelte';

	let {
		config = $bindable(),
		restoreButton,
		restoreLabel,
		...rest
	}: {
		/** The layout configuration. Bind this to keep it in sync with user interactions. */
		config: LayoutConfig;
		/** Map from view Id to its View descriptor. */
		views: SvelteMap<Id, View>;
		/** Snippets rendered in every tab-group's toolbar (e.g. a maximise button). */
		tabgroupControls?: Snippet<[Id]>[];
		/** Prevent the user from dragging split dividers. */
		disableResizeSplits?: boolean;
		/** Prevent drag-and-drop tab rearrangement. */
		disableDragAndDrop?: boolean;
		/** Show the current split ratio as a floating label while resizing. */
		showSplitRatio?: boolean;
		/** Minimum allowed width as a fraction of the split container. */
		minWidthRatio?: number;
		/** Minimum allowed height as a fraction of the split container. */
		minHeightRatio?: number;
		/** Maximum nesting depth for splits (prevents infinite subdivision). */
		maxDepth?: number;
		/** Hide the tab bar entirely (useful when every group has exactly one tab). */
		hideTabBar?: boolean;
		/** Override the default keyboard shortcuts for splits and tab groups. */
		keyboardControls?: KeyboardControls;
		/** Format a split ratio as a display string. Default: "50.00%". */
		formatRatio?: (ratio: number) => string;
		/** Format a split ratio as a number for aria-valuenow. Default: 50.00. */
		formatRatioForAria?: (ratio: number) => number;
		/** Called when a popout window is closed by the user. */
		onPopoutClose?: (viewId: Id) => void;
		/**
		 * Called when the browser blocks a popout window after the fallback timeout.
		 * If not provided, the blocked tab is automatically moved into the main layout.
		 */
		onPopoutBlocked?: (id: Id) => void;
		/** Root CSS class applied to the layout element and used as a BEM prefix. */
		baseClass?: string;
		/**
		 * Skip config validation on every update. Set this when you have already
		 * validated the config yourself (e.g. with validateConfig) and want to avoid
		 * the redundant check.
		 */
		skipValidation?: boolean;
		/** Replaces the button that restores a maximised view. */
		restoreButton?: Snippet<[Id]>;
		/** The restore button's accessible name, such as "Restore view". */
		restoreLabel: string;
	} = $props();

	/**
	 * Leaves the maximised view. A new config rather than a mutation, so the layout updates even
	 * when the app passes a config that isn't deeply reactive (unbound, or `$state.raw`).
	 */
	function restore() {
		config = { ...config, maximizedView: undefined };
	}
</script>

<div class="relative h-full w-full">
	<HL bind:config {...rest} />

	{#if config.maximizedView !== undefined}
		{#if restoreButton}
			{@render restoreButton(config.maximizedView)}
		{:else}
			<Button
				variant="default"
				size="icon-xs"
				onclick={restore}
				aria-label={restoreLabel}
				class="absolute top-1 right-1"
			>
				<MingcuteRestoreLine aria-hidden="true" />
			</Button>
		{/if}
	{/if}
</div>
