<!--
@component
The Editor window's docking layout: horizon-layout styled with horizon-design, with a button that
restores a maximised view (`restoreLabel`). It takes every prop of horizon-layout's
`HorizonLayout`, documented there, with `translations` required and complete, so no English is
left in another language.
-->
<script lang="ts">
	import { HorizonLayout as HL } from 'horizon-layout';
	import type { Id, LayoutTranslations } from 'horizon-layout';
	import MingcuteRestoreLine from '~icons/mingcute/restore-line';
	import './horizon-layout.css';
	import type { ComponentProps, Snippet } from 'svelte';
	import Button from '../../components/button/Button.svelte';

	let {
		config = $bindable(),
		restoreButton,
		restoreLabel,
		...rest
	}: Omit<ComponentProps<typeof HL>, 'translations'> & {
		/**
		 * The text the layout writes itself, its accessible names, in the app's language: the
		 * split handles' (`resizePane`), the floating panels' (`floatingPanel`) and the tab lists'
		 * (`tabList`).
		 */
		translations: LayoutTranslations;
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
