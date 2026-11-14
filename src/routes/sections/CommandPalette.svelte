<!--
@component
Docs: CommandPalette. Every command with its shortcut, searchable; Ctrl+Shift+P opens it here too.
-->
<script lang="ts">
	import { CommandPalette, type Command } from '$lib/components/command-palette';
	import { Button } from '$lib/components/button';
	import { Kbd } from '$lib/components/kbd';
	import { Card } from '$lib/components/card';

	let open = $state(false);
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
</script>

<svelte:window {onkeydown} />

<Card
	title="Commands"
	description="Up, Down, Home and End move, Enter runs, Escape closes. Search ignores case and accents."
>
	<div class="flex items-center gap-3">
		<Button onclick={() => (open = true)}>Open the palette <Kbd>Ctrl Shift P</Kbd></Button>
		<span class="text-sm text-muted" aria-live="polite">{ran ? `Ran: ${ran}` : ''}</span>
	</div>
</Card>

<CommandPalette
	bind:open
	{commands}
	label="Commands"
	placeholder="Type a command"
	emptyText="No command matches."
	onRun={(command) => (ran = command.label)}
/>
