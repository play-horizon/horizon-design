<!--
@component
A keyboard key or shortcut, such as `Ctrl K`, drawn as a raised key. With `command`, it is the
platform's command key: the ⌘ symbol on Apple's platforms, `Ctrl` elsewhere, read from the user
agent once the page runs. Both labels sit in the same cell and only one is visible, so the key
never changes size when the platform is known: the server and the first paint show `Ctrl`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { cn } from '#lib/utils.js';
	import { isApplePlatform } from '#lib/platform.js';
	import MingcuteCommandLine from '~icons/mingcute/command-line';

	let {
		class: className = '',
		command,
		children,
		...rest
	}: {
		/** Classes merged onto the key. */
		class?: string;
		/**
		 * Makes it the command key, with its names, translated: `apple` names the ⌘ key for
		 * assistive technology (such as "Command"), `other` is the key's printed name elsewhere
		 * (such as "Ctrl").
		 */
		command?: { apple: string; other: string };
		/** The key's name, such as `Shift` or `K`; unused with `command`. */
		children?: Snippet;
		/** Other attributes of the `<kbd>`. */
		[key: string]: unknown;
	} = $props();

	// Set on the element once mounted, not as state: the server and the hydrated page render the
	// same markup, and only this attribute changes.
	const markPlatform: Attachment<HTMLElement> = (key) => {
		key.dataset.platform = isApplePlatform() ? 'apple' : 'other';
	};
</script>

<kbd
	class={cn(
		'group inline-flex items-center rounded-sm border border-b-2 border-border-strong bg-surface px-1.25 py-0.75 font-mono text-2xs leading-none whitespace-nowrap text-muted',
		className
	)}
	data-slot="kbd"
	{...rest}
	{@attach command ? markPlatform : undefined}
>
	{#if command}
		<span class="grid place-items-center *:col-start-1 *:row-start-1">
			<span class="invisible flex items-center group-data-[platform=apple]:visible">
				<MingcuteCommandLine class="size-[1.1em]" aria-hidden="true" />
				<span class="sr-only">{command.apple}</span>
			</span>
			<span class="group-data-[platform=apple]:invisible">{command.other}</span>
		</span>
	{:else}
		{@render children?.()}
	{/if}
</kbd>
