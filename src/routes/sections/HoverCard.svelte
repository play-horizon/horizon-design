<!--
@component
Docs: HoverCard. A playground over its surface, placement, delays and disabled state, then a
profile card on a button, a card on an inline link, and a frosted card over game art.
-->
<script lang="ts">
	import { Avatar } from '#lib/components/avatar/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { HoverCard } from '#lib/components/hover-card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';
	import { art } from '../examples';

	const placements = ['bottom', 'top', 'left', 'right', 'bottom-start', 'bottom-end'] as const;
</script>

{#snippet profile()}
	<div class="flex items-start gap-3">
		<Avatar size="md" fallback="NS" />
		<div>
			<p class="text-sm font-semibold">Nova Studio</p>
			<p class="mt-0.5 text-xs text-muted">Makes racing games since 2024.</p>
			<Badge variant="neutral" class="mt-2">12 games</Badge>
		</div>
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Hover or focus the trigger."
		controls={{
			frosted: boolean(),
			placement: choice(placements),
			openDelay: number(600, { min: 0, max: 2000, step: 100 }),
			closeDelay: number(300, { min: 0, max: 2000, step: 100 }),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<HoverCard
				frosted={values.frosted}
				positioning={{ placement: values.placement }}
				openDelay={values.openDelay}
				closeDelay={values.closeDelay}
				disabled={values.disabled}
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				{#snippet trigger()}Nova Studio{/snippet}
				{@render profile()}
			</HoverCard>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="On a button">
			<HoverCard triggerClass={buttonVariants({ variant: 'default' })}>
				{#snippet trigger()}Nova Studio{/snippet}
				{@render profile()}
			</HoverCard>
		</Card>
		<Card title="Inline" description="A trigger styled as a link, inside a sentence.">
			<p class="text-sm">
				Made by
				<HoverCard
					triggerClass="font-medium text-primary underline underline-offset-2"
					contentClass="w-64"
				>
					{#snippet trigger()}Nova Studio{/snippet}
					{@render profile()}
				</HoverCard>
				for Horizon.
			</p>
		</Card>
		<Card title="Frosted" description="A translucent, blurred surface over busy content.">
			<div class="relative overflow-hidden rounded-lg p-6">
				<img src={art.neon} alt="" class="absolute inset-0 size-full object-cover" />
				<HoverCard frosted triggerClass="relative {buttonVariants({ variant: 'default' })}">
					{#snippet trigger()}Nova Studio{/snippet}
					{@render profile()}
				</HoverCard>
			</div>
		</Card>
	</div>
</div>
