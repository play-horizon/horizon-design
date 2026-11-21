<!--
@component
Docs: ContextMenu. A playground over every prop (group titles, a disabled item, the frosted
surface, closing on a choice, looping focus), then menus with titled groups, a single plain group,
disabled items and a frosted surface, each opened by a right click on its area.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ContextMenu } from '#lib/components/context-menu/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';

	let chosen = $state('');

	/** The example menu: an edit group, an arrange group and a lone Delete. */
	function groups(titles: boolean, disabledItem: boolean) {
		return [
			{
				id: 'edit',
				label: titles ? 'Edit' : undefined,
				items: [
					{ id: 'cut', label: 'Cut' },
					{ id: 'copy', label: 'Copy' },
					{ id: 'paste', label: 'Paste', disabled: disabledItem }
				]
			},
			{
				id: 'arrange',
				label: titles ? 'Arrange' : undefined,
				items: [
					{ id: 'front', label: 'Bring to front' },
					{ id: 'back', label: 'Send to back' }
				]
			},
			{ id: 'danger', items: [{ id: 'delete', label: 'Delete' }] }
		];
	}

	const onSelect = (details: { value: string }) => (chosen = details.value);
</script>

{#snippet area(text: string)}
	<div
		class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-border p-4 text-sm text-muted transition-colors hover:border-primary/50"
	>
		{text}
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Right-click the area, or long-press it on a touch screen."
		controls={{
			groupTitles: boolean(true),
			disabledItem: boolean(),
			frosted: boolean(),
			closeOnSelect: boolean(true),
			loopFocus: boolean()
		}}
	>
		{#snippet example(values)}
			<ContextMenu
				groups={groups(values.groupTitles, values.disabledItem)}
				frosted={values.frosted}
				closeOnSelect={values.closeOnSelect}
				loopFocus={values.loopFocus}
				{onSelect}
			>
				{@render area('Right-click here')}
			</ContextMenu>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Titled groups" description="A line between groups; titles name them.">
			<ContextMenu groups={groups(true, false)} {onSelect}>
				{@render area('Right-click here')}
			</ContextMenu>
		</Card>
		<Card title="One plain group">
			<ContextMenu
				groups={[
					{
						id: 'file',
						items: [
							{ id: 'open', label: 'Open' },
							{ id: 'rename', label: 'Rename' },
							{ id: 'duplicate', label: 'Duplicate' }
						]
					}
				]}
				{onSelect}
			>
				{@render area('Right-click here')}
			</ContextMenu>
		</Card>
		<Card title="Disabled items" description="Paste can't be chosen with nothing copied.">
			<ContextMenu groups={groups(false, true)} {onSelect}>
				{@render area('Right-click here')}
			</ContextMenu>
		</Card>
		<Card title="Frosted" description="For menus over busy content, such as the viewport.">
			<ContextMenu groups={groups(true, false)} frosted {onSelect}>
				{@render area('Right-click here')}
			</ContextMenu>
		</Card>
	</div>
	<p class="text-sm text-muted" role="status">
		{chosen ? `Chose: ${chosen}` : 'Nothing chosen yet.'}
	</p>
</div>
