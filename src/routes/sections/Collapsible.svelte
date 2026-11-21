<!--
@component
Docs: Collapsible. A playground over every prop (the trigger's text, open at first, disabled, lazy
and unmounted content), then a closed one, one open at first, a disabled one, and one the app
opens and closes through `open`.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Collapsible } from '#lib/components/collapsible/index.js';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteGitBranchLine from '~icons/mingcute/git-branch-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';

	const repositories = ['horizon', 'horizon-design', 'horizon-layout', 'binaryen-sys'];
	let open = $state(false);
</script>

{#snippet folder(label: string)}
	<MingcuteFolder2Line class="size-4 text-primary" aria-hidden="true" />
	<span>{label}</span>
	<MingcuteRightLine
		class="ml-auto size-4 transition-transform in-data-[state=open]:rotate-90"
		aria-hidden="true"
	/>
{/snippet}

{#snippet list()}
	<div class="mt-2 ml-4 space-y-1 border-l border-border pl-4">
		{#each repositories as repository (repository)}
			<div class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted">
				<MingcuteGitBranchLine class="size-3.5 shrink-0" aria-hidden="true" />
				<span class="font-mono">{repository}</span>
			</div>
		{/each}
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="defaultOpen is read when the collapsible mounts, so changing it remounts it."
		controls={{
			label: text('Repositories'),
			defaultOpen: boolean(),
			disabled: boolean(),
			lazyMount: boolean(),
			unmountOnExit: boolean()
		}}
	>
		{#snippet example(values)}
			{#key values.defaultOpen}
				<Collapsible
					class="w-full max-w-xs"
					defaultOpen={values.defaultOpen}
					disabled={values.disabled}
					lazyMount={values.lazyMount}
					unmountOnExit={values.unmountOnExit}
				>
					{#snippet trigger()}{@render folder(values.label)}{/snippet}
					{@render list()}
				</Collapsible>
			{/key}
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Closed">
			<Collapsible>
				{#snippet trigger()}{@render folder('Repositories')}{/snippet}
				{@render list()}
			</Collapsible>
		</Card>
		<Card title="Open at first">
			<Collapsible defaultOpen>
				{#snippet trigger()}{@render folder('Repositories')}{/snippet}
				{@render list()}
			</Collapsible>
		</Card>
		<Card title="Disabled">
			<Collapsible disabled>
				{#snippet trigger()}{@render folder('Archived repositories')}{/snippet}
				{@render list()}
			</Collapsible>
		</Card>
		<Card title="Opened by the app" description="open is bound; the button sets it.">
			<div class="grid gap-3">
				<Button size="sm" class="justify-self-start" onclick={() => (open = !open)}>
					{open ? 'Hide' : 'Show'} the repositories
				</Button>
				<Collapsible bind:open>
					{#snippet trigger()}{@render folder('Repositories')}{/snippet}
					{@render list()}
				</Collapsible>
			</div>
		</Card>
	</div>
</div>
