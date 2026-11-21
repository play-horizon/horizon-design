<!--
@component
Docs: CommandPalette. A playground over every prop (the name, the placeholder, the empty text, the
frosted surface, how many commands it holds), then the full palette with every command and its
shortcut, which Ctrl+Shift+P opens here too, and the frosted one.
-->
<script lang="ts">
	import { CommandPalette, type Command } from '#lib/components/command-palette/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import { Card } from '#lib/components/card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	let playgroundOpen = $state(false);
	let open = $state(false);
	let frostedOpen = $state(false);
	let ran = $state('');

	const commands: Command[] = [
		{ id: 'apply', label: 'Apply', group: 'Script', shortcut: 'Ctrl S' },
		{ id: 'console', label: 'Focus console', group: 'Panels', shortcut: 'Ctrl `' },
		{ id: 'hierarchy', label: 'Focus hierarchy', group: 'Panels', shortcut: 'Ctrl 1' },
		{ id: 'inspector', label: 'Focus inspector', group: 'Panels', shortcut: 'Ctrl 2' },
		{ id: 'playtest', label: 'Start play-test', group: 'Play-test', shortcut: 'F5' },
		{ id: 'stop', label: 'Stop play-test', group: 'Play-test', disabled: true },
		{ id: 'docs', label: 'Open the docs panel', group: 'Help', keywords: ['documentation'] },
		{ id: 'layout', label: 'Restore the default layout', group: 'Panels' },
		...Array.from({ length: 200 }, (_, i) => ({
			id: `scene-${i}`,
			label: `Open scene ${i + 1}`,
			group: 'Scenes'
		}))
	];

	function onkeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p') {
			event.preventDefault();
			open = true;
		}
	}

	const run = (command: Command) => (ran = command.label);
</script>

<svelte:window {onkeydown} />

<div class="grid gap-4">
	<Playground
		description="commands is how many of the example's commands it holds; Stop play-test is disabled."
		controls={{
			label: text('Commands'),
			placeholder: text('Type a command'),
			emptyText: text('No command matches.'),
			frosted: boolean(),
			commands: number(8, { min: 0, max: commands.length })
		}}
	>
		{#snippet example(values)}
			<Button onclick={() => (playgroundOpen = true)}>Open the palette</Button>
			<CommandPalette
				bind:open={playgroundOpen}
				commands={commands.slice(0, values.commands)}
				label={values.label}
				placeholder={values.placeholder}
				emptyText={values.emptyText}
				frosted={values.frosted}
				onRun={run}
			/>
		{/snippet}
	</Playground>
	<Card
		title="Variants"
		description="Up, Down, Home and End move, Enter runs, Escape closes. Search ignores case and accents."
	>
		<div class="flex flex-wrap items-center gap-3">
			<Button onclick={() => (open = true)}>Every command <Kbd>Ctrl Shift P</Kbd></Button>
			<Button onclick={() => (frostedOpen = true)}>Frosted</Button>
			<span class="text-sm text-muted" aria-live="polite">{ran ? `Ran: ${ran}` : ''}</span>
		</div>
	</Card>
</div>

<CommandPalette
	bind:open
	{commands}
	label="Commands"
	placeholder="Type a command"
	emptyText="No command matches."
	onRun={run}
/>
<CommandPalette
	bind:open={frostedOpen}
	commands={commands.slice(0, 8)}
	frosted
	label="Commands"
	placeholder="Type a command"
	emptyText="No command matches."
	onRun={run}
/>
