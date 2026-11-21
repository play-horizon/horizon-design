<!--
@component
Docs: Announcement. A playground over its content (the text, an icon, a tag, an arrow), then a
plain pill, one with an icon, one with a tag and one inside a link.
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { Announcement } from '#lib/components/announcement/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteArrowRightLine from '~icons/mingcute/arrow-right-line';
	import MingcuteLightningLine from '~icons/mingcute/lightning-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';
</script>

<!-- A solid tag: a tinted badge on the pill's own tint would be too faint to read. -->
{#snippet tag(text: string)}
	<span class="-ml-1.5 rounded-full bg-primary px-2 text-xs font-semibold text-on-primary">
		{text}
	</span>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An empty tag hides it."
		controls={{
			text: text('Playgrounds on every page'),
			icon: boolean(true),
			tag: text('New'),
			arrow: boolean()
		}}
	>
		{#snippet example(values)}
			<Announcement>
				{#if values.tag}{@render tag(values.tag)}{/if}
				{#if values.icon}<MingcuteLightningLine class="size-3.5" aria-hidden="true" />{/if}
				{values.text}
				{#if values.arrow}<MingcuteArrowRightLine class="size-3.5" aria-hidden="true" />{/if}
			</Announcement>
		{/snippet}
	</Playground>
	<Card title="Content" description="The pill holds whatever the app gives it.">
		<div class="flex flex-wrap items-center gap-3">
			<Announcement>Version 1.0 is out</Announcement>
			<Announcement>
				<MingcuteLightningLine class="size-3.5" aria-hidden="true" />
				Faster uploads
			</Announcement>
			<Announcement>
				{@render tag('New')}
				Dark and light themes
			</Announcement>
			<a href={resolve('/[section]', { section: 'button' })} class="rounded-full">
				<Announcement class="transition-colors hover:bg-primary/20">
					See the buttons
					<MingcuteArrowRightLine class="size-3.5" aria-hidden="true" />
				</Announcement>
			</a>
		</div>
	</Card>
</div>
