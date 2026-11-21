<!--
@component
Docs: Menu. A playground over every prop (an icon-only trigger with its tooltip, the surface, the
placement and Ark's selection and keyboard options), then a menu with groups, separators and a
disabled item, an icon-only trigger and a frosted menu.
-->
<script lang="ts">
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import {
		Menu,
		MenuGroup,
		MenuGroupLabel,
		MenuItem,
		MenuSeparator
	} from '#lib/components/menu/index.js';
	import MingcuteCardPayLine from '~icons/mingcute/card-pay-line';
	import MingcuteExitDoorLine from '~icons/mingcute/exit-door-line';
	import MingcuteMore2Line from '~icons/mingcute/more-2-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import MingcuteUser2Line from '~icons/mingcute/user-2-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const placements = [
		'bottom-start',
		'bottom',
		'bottom-end',
		'top-start',
		'top',
		'top-end',
		'left',
		'right'
	] as const;

	let selected = $state('nothing yet');
</script>

{#snippet accountItems(billingDisabled: boolean)}
	<MenuGroup>
		<MenuGroupLabel>Account</MenuGroupLabel>
		<MenuItem value="profile">
			<MingcuteUser2Line aria-hidden="true" />
			Profile
		</MenuItem>
		<MenuItem value="settings">
			<MingcuteSettings3Line aria-hidden="true" />
			Settings
		</MenuItem>
		<MenuItem value="billing" disabled={billingDisabled}>
			<MingcuteCardPayLine aria-hidden="true" />
			Billing
		</MenuItem>
	</MenuGroup>
	<MenuSeparator />
	<MenuItem value="logout">
		<MingcuteExitDoorLine aria-hidden="true" />
		Log out
	</MenuItem>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An icon-only trigger takes a triggerLabel: its name and its tooltip."
		controls={{
			iconOnly: boolean(),
			triggerLabel: text('Account menu'),
			frosted: boolean(),
			placement: choice(placements),
			closeOnSelect: boolean(true),
			loopFocus: boolean(),
			typeahead: boolean(true),
			billingDisabled: boolean(true)
		}}
	>
		{#snippet example(values)}
			<div class="grid justify-items-center gap-2">
				<Menu
					triggerLabel={values.iconOnly ? values.triggerLabel : undefined}
					triggerClass={values.iconOnly
						? buttonVariants({ variant: 'ghost', size: 'icon-md' })
						: buttonVariants({ variant: 'default' })}
					frosted={values.frosted}
					positioning={{ placement: values.placement }}
					closeOnSelect={values.closeOnSelect}
					loopFocus={values.loopFocus}
					typeahead={values.typeahead}
					onSelect={(details: { value: string }) => (selected = details.value)}
				>
					{#snippet trigger()}
						<MingcuteMore2Line class="size-4" aria-hidden="true" />
						{#if !values.iconOnly}{values.triggerLabel}{/if}
					{/snippet}
					{@render accountItems(values.billingDisabled)}
				</Menu>
				<p class="text-xs text-muted">Last chosen: {selected}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Triggers and surfaces" description="Billing is a disabled item.">
		<div class="flex flex-wrap items-center gap-3">
			<Menu triggerClass={buttonVariants({ variant: 'default' })}>
				{#snippet trigger()}
					<MingcuteUser2Line class="size-4" aria-hidden="true" />
					Account
				{/snippet}
				{@render accountItems(true)}
			</Menu>
			<Menu
				triggerLabel="More actions"
				triggerClass={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
			>
				{#snippet trigger()}
					<MingcuteMore2Line class="size-4" aria-hidden="true" />
				{/snippet}
				{@render accountItems(true)}
			</Menu>
			<Menu frosted triggerClass={buttonVariants({ variant: 'tint' })}>
				{#snippet trigger()}Frosted{/snippet}
				{@render accountItems(false)}
			</Menu>
		</div>
	</Card>
</div>
