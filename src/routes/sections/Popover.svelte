<!--
@component
Docs: Popover. A playground over every prop (title, description, footer, an icon-only trigger with
its tooltip, the surface, the placement and Ark's focus and dismissal options), then a popover with
a form and text close buttons, one with an icon-only close button, and a frosted one.
-->
<script lang="ts">
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { Popover, PopoverClose } from '#lib/components/popover/index.js';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteFilter2Line from '~icons/mingcute/filter-2-line';
	import MingcuteLayout4Line from '~icons/mingcute/layout-4-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const placements = [
		'bottom',
		'bottom-start',
		'bottom-end',
		'top',
		'top-start',
		'top-end',
		'left',
		'right'
	] as const;
</script>

{#snippet sizeFields(prefix: string)}
	<div class="grid gap-2">
		<div class="grid grid-cols-3 items-center gap-4">
			<label for="{prefix}-width" class="text-sm text-muted">Width</label>
			<Input id="{prefix}-width" size="sm" class="col-span-2" value="100px" />
		</div>
		<div class="grid grid-cols-3 items-center gap-4">
			<label for="{prefix}-height" class="text-sm text-muted">Height</label>
			<Input id="{prefix}-height" size="sm" class="col-span-2" value="auto" />
		</div>
	</div>
{/snippet}

{#snippet cancelAndApply()}
	<PopoverClose label="Cancel" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
		Cancel
	</PopoverClose>
	<PopoverClose
		label="Apply"
		class={buttonVariants({ variant: 'primary', size: 'sm', className: 'ml-auto' })}
	>
		Apply
	</PopoverClose>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An icon-only trigger takes a triggerLabel: its name and its tooltip."
		controls={{
			title: text('Layer size'),
			description: text('The width and height of the layer.'),
			footer: boolean(true),
			iconOnly: boolean(),
			triggerLabel: text('Resize'),
			frosted: boolean(),
			placement: choice(placements),
			modal: boolean(),
			autoFocus: boolean(true),
			closeOnInteractOutside: boolean(true),
			closeOnEscape: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Popover
				title={values.title || undefined}
				description={values.description || undefined}
				triggerLabel={values.iconOnly ? values.triggerLabel : undefined}
				triggerClass={values.iconOnly
					? buttonVariants({ variant: 'ghost', size: 'icon-md' })
					: buttonVariants({ variant: 'default' })}
				frosted={values.frosted}
				positioning={{ placement: values.placement }}
				modal={values.modal}
				autoFocus={values.autoFocus}
				closeOnInteractOutside={values.closeOnInteractOutside}
				closeOnEscape={values.closeOnEscape}
				footer={values.footer ? cancelAndApply : undefined}
			>
				{#snippet trigger()}
					<MingcuteLayout4Line class="size-4" aria-hidden="true" />
					{#if !values.iconOnly}{values.triggerLabel}{/if}
				{/snippet}
				{@render sizeFields('playground')}
			</Popover>
		{/snippet}
	</Playground>
	<Card title="Variants">
		<div class="flex flex-wrap items-center gap-3">
			<Popover
				title="Layer size"
				description="The width and height of the layer."
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				{#snippet trigger()}
					<MingcuteLayout4Line class="size-4" aria-hidden="true" />
					With a form
				{/snippet}
				{@render sizeFields('form')}
				{#snippet footer()}
					<PopoverClose label="Done" class={buttonVariants({ variant: 'primary', size: 'sm' })}>
						Done
					</PopoverClose>
				{/snippet}
			</Popover>
			<Popover
				title="Filters"
				triggerLabel="Filters"
				triggerClass={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
				contentClass="relative"
			>
				{#snippet trigger()}
					<MingcuteFilter2Line class="size-4" aria-hidden="true" />
				{/snippet}
				<PopoverClose
					label="Close the filters"
					iconOnly
					class={buttonVariants({
						variant: 'ghost',
						size: 'icon-xs',
						className: 'absolute top-2.5 right-2.5'
					})}
				>
					<MingcuteCloseLine aria-hidden="true" />
				</PopoverClose>
				<p class="text-sm text-muted">
					An icon-only trigger and close button, each with a tooltip.
				</p>
			</Popover>
			<Popover
				title="Frosted"
				description="A translucent surface, for overlays above busy content."
				frosted
				triggerClass={buttonVariants({ variant: 'tint' })}
			>
				{#snippet trigger()}Frosted{/snippet}
			</Popover>
		</div>
	</Card>
</div>
