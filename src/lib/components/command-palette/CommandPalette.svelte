<!--
@component
The command palette: a dialog at the top of the window with a search field and every command that
matches what is typed (ignoring case and accents), best match first, each with its shortcut. Up,
Down, Home and End move through the commands that can run, Enter runs the highlighted one, Escape
closes. The list is virtualised, so every command of the app can be in it. The app opens it
(`open`, bound) from its shortcut, passes its commands translated, and runs the chosen one in
`onRun`, called once the palette has finished closing: the page is no longer inert, so a command
can move the focus (such as into a rename field) and keeps it; a command that doesn't gets the
focus back where it was before the palette opened.
-->
<script lang="ts">
	import { Dialog } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '#lib/utils.js';
	import PaletteSearch from './PaletteSearch.svelte';
	import type { Command } from './filter';

	let {
		open = $bindable(false),
		commands,
		onRun,
		label,
		placeholder = '',
		emptyText,
		frosted = false
	}: {
		/** Whether the palette is open (bindable): the app sets it from its shortcut. */
		open?: boolean;
		/** Every command the palette offers. */
		commands: readonly Command[];
		/** Runs the chosen command, once the palette has finished closing. */
		onRun: (command: Command) => void;
		/** The dialog's and the search field's accessible name, such as "Commands". */
		label: string;
		/** The search field's placeholder, such as "Type a command". */
		placeholder?: string;
		/** Shown when no command matches. */
		emptyText: string;
		/** A translucent, blurred surface. */
		frosted?: boolean;
	} = $props();

	// While the dialog is open or closing, the page outside it is inert and focus is trapped: a
	// command run then could not focus anything outside. It waits for the exit to complete, which
	// comes after the trap and the inert attributes are gone.
	let chosen: Command | undefined;

	function run(command: Command) {
		chosen = command;
		open = false;
	}

	function onExitComplete() {
		const command = chosen;
		chosen = undefined;
		if (command) onRun(command);
	}
</script>

<Dialog.Root
	{open}
	onOpenChange={(details) => (open = details.open)}
	{onExitComplete}
	lazyMount
	unmountOnExit
>
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-60 bg-scrim/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Dialog.Positioner class="fixed inset-0 z-70 flex items-start justify-center px-4 pt-16">
			<Dialog.Content
				aria-label={label}
				class={cn(
					'w-full max-w-145 rounded-lg border border-border-strong p-1.5 shadow-md inset-shadow-highlight outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in',
					frosted ? 'frosted' : 'bg-raised'
				)}
				data-slot="command-palette"
			>
				<PaletteSearch {commands} onRun={run} {label} {placeholder} {emptyText} />
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>
