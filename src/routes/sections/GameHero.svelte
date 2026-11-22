<!--
@component
Docs: GameHero. A playground over every prop: a game page's banner with its icon, name, creator
and tags, and a Back button of the `art` variant, readable over the art when hovered.
-->
<script lang="ts">
	import { GameHero } from '#lib/components/game-hero/index.js';
	import { Avatar } from '#lib/components/avatar/index.js';
	import { Button } from '#lib/components/button/index.js';
	import MingcuteArrowLeftLine from '~icons/mingcute/arrow-left-line';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';
</script>

<Playground
	controls={{
		name: text('Skyline Obby'),
		thumbnail: choice(['skyline', 'frost', 'neon', 'woods', 'none']),
		icon: boolean(true),
		back: boolean(true),
		byline: boolean(true),
		tags: boolean(true)
	}}
>
	{#snippet example(values)}
		{#snippet top()}
			<Button size="sm" variant="art"><MingcuteArrowLeftLine aria-hidden="true" />Back</Button>
		{/snippet}
		{#snippet byline()}
			<Avatar size="xs" fallback="LN" />
			<span>by <b class="text-fg">lena_n</b></span>
		{/snippet}
		{#snippet tags()}
			<span>obby · platformer · social</span>
		{/snippet}
		<div class="w-full overflow-hidden rounded-xl border border-border bg-background pb-6">
			<GameHero
				name={values.name}
				thumbnail={values.thumbnail === 'none' ? undefined : art[values.thumbnail]}
				icon={values.icon ? art.icon : undefined}
				top={values.back ? top : undefined}
				byline={values.byline ? byline : undefined}
				tags={values.tags ? tags : undefined}
			/>
		</div>
	{/snippet}
</Playground>
