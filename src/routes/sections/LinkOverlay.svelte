<!--
@component
Docs: LinkOverlay. A playground over the card's link text, its target and a control kept usable
on top, then a card whose whole area follows its link, and a card with a second link and a
button that stay their own.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import { LinkBox, LinkOverlay } from '#lib/components/link-overlay/index.js';
	import MingcuteArrowRightUpLine from '~icons/mingcute/arrow-right-up-line';
	import MingcuteHeartLine from '~icons/mingcute/heart-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="Click anywhere on the card: it follows the link, except on the like button."
		controls={{
			link: text('Neon Drift'),
			newTab: boolean(),
			control: boolean(true)
		}}
	>
		{#snippet example(values)}
			<LinkBox
				class="w-72 rounded-xl border border-border p-4 transition-colors hover:border-primary"
			>
				<div class="flex items-start justify-between gap-4">
					<div>
						<p class="text-sm font-semibold">
							<LinkOverlay
								href="#top"
								target={values.newTab ? '_blank' : undefined}
								rel={values.newTab ? 'noopener noreferrer' : undefined}
							>
								{values.link}
							</LinkOverlay>
						</p>
						<p class="mt-1 text-sm text-muted">A racing game by Nova Studio.</p>
					</div>
					{#if values.control}
						<IconButton label="Like" size="sm">
							<MingcuteHeartLine aria-hidden="true" />
						</IconButton>
					{/if}
				</div>
			</LinkBox>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="A whole card as a link">
			<LinkBox class="rounded-xl border border-border p-4 transition-colors hover:border-primary">
				<div class="flex items-start justify-between gap-4">
					<div>
						<p class="text-sm font-semibold">
							<LinkOverlay href="#top">Project overview</LinkOverlay>
						</p>
						<p class="mt-1 text-sm text-muted">The entire card area follows the link.</p>
					</div>
					<MingcuteArrowRightUpLine class="size-4 text-muted" aria-hidden="true" />
				</div>
			</LinkBox>
		</Card>
		<Card title="Other links stay their own">
			<LinkBox class="rounded-xl border border-border p-4 transition-colors hover:border-primary">
				<p class="text-sm font-semibold">
					<LinkOverlay href="#top">Frostbite Arena</LinkOverlay>
				</p>
				<p class="mt-1 text-sm text-muted">
					By <a href="#top" class="font-medium text-primary underline underline-offset-2">
						Ice Forge
					</a>, updated yesterday.
				</p>
				<div class="mt-3 flex items-center gap-2">
					<Badge variant="info">Fighting</Badge>
					<IconButton label="Like" size="sm" class="ml-auto">
						<MingcuteHeartLine aria-hidden="true" />
					</IconButton>
				</div>
			</LinkBox>
		</Card>
	</div>
</div>
