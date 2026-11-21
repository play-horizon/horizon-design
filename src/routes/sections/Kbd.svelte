<!--
@component
Docs: Kbd. A playground over every prop, and shortcuts: the command key shows ⌘ on Apple's
platforms and Ctrl elsewhere, from the browser's user agent.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	const command = { apple: 'Command', other: 'Ctrl' };
</script>

<div class="grid gap-4">
	<Playground
		description="The command key follows this browser's platform."
		controls={{ command: boolean(true), key: text('K') }}
	>
		{#snippet example(values)}
			<div class="flex items-center gap-1">
				{#if values.command}<Kbd {command} />{/if}
				<Kbd>{values.key}</Kbd>
			</div>
		{/snippet}
	</Playground>
	<Card title="Shortcuts">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-1"><Kbd {command} /><Kbd>K</Kbd></div>
			<div class="flex items-center gap-1"><Kbd {command} /><Kbd>Shift</Kbd><Kbd>P</Kbd></div>
			<Kbd>Escape</Kbd>
			<Kbd>Tab</Kbd>
			<Kbd>Enter</Kbd>
		</div>
		<p class="mt-3 text-sm text-muted">
			The app reads <code>isApplePlatform()</code> to match its shortcuts on the same key.
		</p>
	</Card>
</div>
