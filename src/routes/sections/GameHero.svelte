<!--
@component
Docs: GameHero. A game page's banner with its icon, name, creator and tags.
-->
<script lang="ts">
	import { GameHero } from '#lib/components/game-hero/index.js';
	import { Avatar } from '#lib/components/avatar/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { Button } from '#lib/components/button/index.js';
	import MingcuteArrowLeftLine from '~icons/mingcute/arrow-left-line';
	import { art } from '../examples';
</script>

<div class="overflow-hidden rounded-xl border border-border bg-background pb-6">
	<GameHero name="Skyline Obby" thumbnail={art.skyline} icon={art.icon}>
		{#snippet top()}
			<Button size="sm" class="border-transparent bg-art-scrim text-on-art">
				<MingcuteArrowLeftLine aria-hidden="true" />Back
			</Button>
		{/snippet}
		{#snippet byline()}
			<Avatar size="xs" fallback="LN" />
			<span>by <b class="text-fg">lena_n</b></span>
		{/snippet}
		{#snippet tags()}
			<Badge size="sm">obby</Badge>
			<Badge size="sm">platformer</Badge>
			<Badge size="sm">social</Badge>
		{/snippet}
	</GameHero>
</div>
