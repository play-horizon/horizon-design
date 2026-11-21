<!--
@component
Docs: Listbox. A playground over every prop, then the single, multiple and extended selection
modes, a horizontal list, a disabled option, a disabled list and options drawn by `renderItem`.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Listbox } from '#lib/components/listbox/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const genres = [
		{ label: 'Obby', value: 'obby' },
		{ label: 'Racing', value: 'racing' },
		{ label: 'Roleplay', value: 'roleplay' },
		{ label: 'Simulator', value: 'simulator' },
		{ label: 'Horror', value: 'horror', disabled: true }
	];
	const sizes = [
		{ label: 'Solo', value: 'solo' },
		{ label: 'Duo', value: 'duo' },
		{ label: 'Squad', value: 'squad' }
	];
	const players: Record<string, string> = {
		solo: '1 player',
		duo: '2 players',
		squad: '4 players'
	};

	let chosen = $state(['racing']);
</script>

<div class="grid gap-4">
	<Playground
		description="Horror is a disabled option."
		controls={{
			label: text('Genre'),
			selectionMode: choice(['single', 'multiple', 'extended'] as const),
			orientation: choice(['vertical', 'horizontal'] as const),
			deselectable: boolean(),
			disabled: boolean(),
			loopFocus: boolean(),
			typeahead: boolean(true),
			selectOnHighlight: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-md gap-2">
				<Listbox
					label={values.label}
					items={genres}
					bind:value={chosen}
					selectionMode={values.selectionMode}
					orientation={values.orientation}
					deselectable={values.deselectable}
					disabled={values.disabled}
					loopFocus={values.loopFocus}
					typeahead={values.typeahead}
					selectOnHighlight={values.selectOnHighlight}
				/>
				<p class="text-xs text-muted">Chosen: {chosen.join(', ') || 'nothing'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Selection modes" description="Extended chooses several with Shift and Ctrl.">
		<div class="grid gap-4 sm:grid-cols-3">
			<Listbox label="Single" items={genres} value={['obby']} />
			<Listbox
				label="Multiple"
				items={genres}
				selectionMode="multiple"
				value={['obby', 'roleplay']}
			/>
			<Listbox label="Extended" items={genres} selectionMode="extended" />
		</div>
	</Card>
	<Card title="Horizontal">
		<Listbox label="Team size" items={sizes} orientation="horizontal" value={['duo']} />
	</Card>
	<Card title="States and custom options">
		<div class="grid gap-4 sm:grid-cols-2">
			<Listbox label="Disabled" items={genres} disabled value={['racing']} />
			<Listbox label="Players" items={sizes} deselectable>
				{#snippet renderItem(item)}
					<span class="flex flex-col">
						<span>{item.label}</span>
						<span class="text-xs text-muted">{players[item.value]}</span>
					</span>
				{/snippet}
			</Listbox>
		</div>
	</Card>
</div>
