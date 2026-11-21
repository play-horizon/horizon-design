<!--
@component
Docs: Marquee. A playground over every prop, then a marquee on each side (left, right, up and
down), a reversed one, one filled to its width and a paused one.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Marquee, MarqueeItem } from '#lib/components/marquee/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const sides = ['start', 'end', 'top', 'bottom'] as const;
	const games = ['Sky Obby', 'Neon Racer', 'Pirate Cove', 'Tycoon City', 'Zombie Night', 'Kart'];
	const isVertical = (side: string) => side === 'top' || side === 'bottom';
</script>

{#snippet items(names: readonly string[])}
	{#each names as name (name)}
		<MarqueeItem>
			<Badge variant="neutral" class="whitespace-nowrap">{name}</Badge>
		</MarqueeItem>
	{/each}
{/snippet}

<div class="grid gap-4">
	<Playground
		description="It pauses while hovered or focused when pauseOnInteraction is on."
		controls={{
			label: text('Featured games'),
			roleDescription: text('marquee'),
			side: choice(sides),
			speed: number(50, { min: 10, max: 400, step: 10 }),
			spacing: text('1rem'),
			delay: number(0, { min: 0, max: 10, step: 1 }),
			loopCount: number(0, { min: 0, max: 10, step: 1 }),
			autoFill: boolean(),
			reverse: boolean(),
			pauseOnInteraction: boolean(true),
			paused: boolean()
		}}
	>
		{#snippet example(values)}
			<Marquee
				label={values.label}
				roleDescription={values.roleDescription}
				side={values.side}
				speed={values.speed}
				spacing={values.spacing}
				delay={values.delay}
				loopCount={values.loopCount}
				autoFill={values.autoFill}
				reverse={values.reverse}
				pauseOnInteraction={values.pauseOnInteraction}
				paused={values.paused}
				class={isVertical(values.side) ? 'h-40 w-full' : 'w-full'}
			>
				{@render items(games)}
			</Marquee>
		{/snippet}
	</Playground>
	<Card title="Sides" description="Start and end scroll sideways; top and bottom scroll upright.">
		<div class="grid gap-4">
			<Marquee label="Scrolling to the start" roleDescription="marquee" spacing="1rem">
				{@render items(games)}
			</Marquee>
			<Marquee label="Scrolling to the end" roleDescription="marquee" side="end" spacing="1rem">
				{@render items(games)}
			</Marquee>
			<div class="grid grid-cols-2 gap-4">
				<Marquee
					label="Scrolling up"
					roleDescription="marquee"
					side="top"
					spacing="0.5rem"
					class="h-32"
				>
					{@render items(games)}
				</Marquee>
				<Marquee
					label="Scrolling down"
					roleDescription="marquee"
					side="bottom"
					spacing="0.5rem"
					class="h-32"
				>
					{@render items(games)}
				</Marquee>
			</div>
		</div>
	</Card>
	<Card title="Options">
		<div class="grid gap-4">
			<Marquee label="Reversed" roleDescription="marquee" reverse spacing="1rem">
				{@render items(games)}
			</Marquee>
			<Marquee label="Filled to its width" roleDescription="marquee" autoFill spacing="1rem">
				{@render items(['Sky Obby', 'Kart'])}
			</Marquee>
			<Marquee label="Fast" roleDescription="marquee" speed={150} spacing="1rem">
				{@render items(games)}
			</Marquee>
			<Marquee label="Paused" roleDescription="marquee" paused spacing="1rem">
				{@render items(games)}
			</Marquee>
		</div>
	</Card>
</div>
