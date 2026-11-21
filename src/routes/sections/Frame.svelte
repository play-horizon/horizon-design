<!--
@component
Docs: Frame. A playground over every prop, and a frame with and without a title bar: the window
controls sit at the bar's end.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Frame } from '#lib/components/frame/index.js';
	import Playground from '../playground/Playground.svelte';
	import { text } from '../playground/controls';
</script>

{#snippet code()}
	<div class="p-4 font-mono text-xs text-muted">
		<span class="text-primary">&lt;script&gt;</span><br />
		&nbsp;&nbsp;let count = $state(0);<br />
		<span class="text-primary">&lt;/script&gt;</span>
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An empty title removes the title bar."
		controls={{ title: text('my-app.svelte') }}
	>
		{#snippet example(values)}
			<Frame title={values.title} class="h-32 w-full">{@render code()}</Frame>
		{/snippet}
	</Playground>
	<Card title="With and without a title">
		<div class="grid gap-4 sm:grid-cols-2">
			<Frame title="my-app.svelte" class="h-32">{@render code()}</Frame>
			<Frame class="h-32">{@render code()}</Frame>
		</div>
	</Card>
</div>
