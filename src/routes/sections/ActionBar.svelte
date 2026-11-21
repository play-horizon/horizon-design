<!--
@component
Docs: ActionBar. A playground over its content (the selection text, labelled or icon-only
actions, the separator), then an icon-only bar, a labelled bar and a bar with its selection count.
The bar is fixed to the bottom of the window; here a class puts it back in the page's flow.
-->
<script lang="ts">
	import { ActionBar, ActionBarSeparator } from '#lib/components/action-bar/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import MingcuteArchiveLine from '~icons/mingcute/archive-line';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	/** Puts the bar in the page's flow instead of fixing it to the window. */
	const inFlow = 'relative bottom-auto left-auto z-0 translate-x-0';
</script>

{#snippet actions(labels: boolean, separator: boolean)}
	{#if labels}
		<Button variant="ghost" size="sm"><MingcuteArchiveLine aria-hidden="true" />Archive</Button>
		<Button variant="ghost" size="sm"><MingcuteCopy2Line aria-hidden="true" />Duplicate</Button>
	{:else}
		<IconButton label="Archive" size="sm"><MingcuteArchiveLine aria-hidden="true" /></IconButton>
		<IconButton label="Duplicate" size="sm"><MingcuteCopy2Line aria-hidden="true" /></IconButton>
	{/if}
	{#if separator}<ActionBarSeparator />{/if}
	{#if labels}
		<Button variant="danger-solid" size="sm">
			<MingcuteDelete2Line aria-hidden="true" />Delete
		</Button>
	{:else}
		<IconButton label="Delete" size="sm" variant="danger">
			<MingcuteDelete2Line aria-hidden="true" />
		</IconButton>
	{/if}
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An empty selection hides the count."
		controls={{
			selection: text('3 games selected'),
			labels: boolean(),
			separator: boolean(true)
		}}
	>
		{#snippet example(values)}
			<ActionBar class={inFlow}>
				{#if values.selection}
					<span class="px-2 text-sm font-medium">{values.selection}</span>
					<ActionBarSeparator />
				{/if}
				{@render actions(values.labels, values.separator)}
			</ActionBar>
		{/snippet}
	</Playground>
	<Card title="Variants" description="Icon-only actions, labelled actions, and a selection count.">
		<div class="flex flex-col items-center gap-4">
			<ActionBar class={inFlow}>{@render actions(false, true)}</ActionBar>
			<ActionBar class={inFlow}>{@render actions(true, true)}</ActionBar>
			<ActionBar class={inFlow}>
				<IconButton label="Clear the selection" size="sm">
					<MingcuteCloseLine aria-hidden="true" />
				</IconButton>
				<span class="pr-2 text-sm font-medium">12 assets selected</span>
				<ActionBarSeparator />
				{@render actions(false, false)}
			</ActionBar>
		</div>
	</Card>
</div>
