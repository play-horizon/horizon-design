<!--
@component
Docs: ThumbCard. A playground over every prop, and cards that link, act and only display side by
side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ThumbCard } from '#lib/components/thumb-card/index.js';
	import MingcuteLayout6Line from '~icons/mingcute/layout-6-line';
	import Playground from '../playground/Playground.svelte';
	import { choice, text } from '../playground/controls';

	let presses = $state(0);
</script>

<div class="grid gap-4">
	<Playground
		controls={{ label: text('Component preview'), action: choice(['href', 'onclick', 'none']) }}
	>
		{#snippet example(values)}
			<ThumbCard
				class="w-64"
				label={values.label}
				href={values.action === 'href' ? '#top' : undefined}
				onclick={values.action === 'onclick' ? () => {} : undefined}
			>
				<MingcuteLayout6Line class="size-12 text-primary" aria-hidden="true" />
			</ThumbCard>
		{/snippet}
	</Playground>
	<Card title="Link, button and display">
		<div class="grid gap-4 sm:grid-cols-3">
			<ThumbCard label="A link" href="#top">
				<MingcuteLayout6Line class="size-12 text-primary" aria-hidden="true" />
			</ThumbCard>
			<ThumbCard label="A button, pressed {presses} times" onclick={() => presses++}>
				<MingcuteLayout6Line class="size-12 text-primary" aria-hidden="true" />
			</ThumbCard>
			<ThumbCard label="Display only">
				<MingcuteLayout6Line class="size-12 text-faint" aria-hidden="true" />
			</ThumbCard>
		</div>
	</Card>
</div>
