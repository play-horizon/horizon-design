<!--
@component
Docs: Sheet. A playground over every prop (the side, the title, description and footer, the close
button and its tooltip, an icon-only trigger with its tooltip, the surface and Ark's dismissal
options), then a sheet from each side and a frosted one.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Sheet } from '#lib/components/sheet/index.js';
	import MingcuteMenuLine from '~icons/mingcute/menu-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sides = ['top', 'right', 'bottom', 'left'] as const;

	let open = $state(false);
</script>

{#snippet closeFooter()}
	<Button variant="primary" class="ml-auto" onclick={() => (open = false)}>Done</Button>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An icon-only trigger takes a triggerLabel: its name and its tooltip."
		controls={{
			side: choice(sides, 'right'),
			title: text('Filters'),
			description: text('Narrow the games you see.'),
			footer: boolean(true),
			showClose: boolean(true),
			closeLabel: text('Close'),
			iconOnly: boolean(),
			triggerLabel: text('Show filters'),
			frosted: boolean(),
			closeOnInteractOutside: boolean(true),
			closeOnEscape: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Sheet
				bind:open
				side={values.side}
				title={values.title || undefined}
				description={values.description || undefined}
				showClose={values.showClose}
				closeLabel={values.closeLabel}
				triggerLabel={values.iconOnly ? values.triggerLabel : undefined}
				triggerClass={values.iconOnly
					? buttonVariants({ variant: 'ghost', size: 'icon-md' })
					: buttonVariants({ variant: 'default' })}
				frosted={values.frosted}
				closeOnInteractOutside={values.closeOnInteractOutside}
				closeOnEscape={values.closeOnEscape}
				footer={values.footer ? closeFooter : undefined}
			>
				{#snippet trigger()}
					<MingcuteMenuLine class="size-4" aria-hidden="true" />
					{#if !values.iconOnly}{values.triggerLabel}{/if}
				{/snippet}
				<p class="text-sm text-muted">The content scrolls when it is taller than the sheet.</p>
			</Sheet>
		{/snippet}
	</Playground>
	<Card title="Sides and surfaces">
		<div class="flex flex-wrap items-center gap-3">
			{#each sides as side (side)}
				<Sheet
					{side}
					closeLabel="Close"
					title="From the {side}"
					description="Slides in from the {side} of the window."
					triggerClass={buttonVariants({ variant: 'default' })}
				>
					{#snippet trigger()}Open from the {side}{/snippet}
					<p class="text-sm text-muted">Great for side panels and mobile action sheets.</p>
				</Sheet>
			{/each}
			<Sheet
				frosted
				closeLabel="Close"
				title="Frosted"
				description="A translucent surface, for overlays above busy content."
				triggerClass={buttonVariants({ variant: 'tint' })}
			>
				{#snippet trigger()}Frosted{/snippet}
			</Sheet>
			<Sheet
				side="left"
				closeLabel="Close the menu"
				title="Menu"
				triggerLabel="Open the menu"
				triggerClass={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
			>
				{#snippet trigger()}<MingcuteMenuLine class="size-4" aria-hidden="true" />{/snippet}
				<p class="text-sm text-muted">An icon-only trigger, named by its tooltip.</p>
			</Sheet>
		</div>
	</Card>
</div>
