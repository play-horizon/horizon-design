<!--
@component
Docs: BottomNavigation. A playground over every prop (the bar's name, how many items, the active
one, icons), then bars of three and five items and one without icons. The bar is fixed to the
bottom of the window; here a class puts it back in the page's flow, under a stand-in screen.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '#lib/components/card/index.js';
	import { BottomNavigation } from '#lib/components/bottom-navigation/index.js';
	import MingcuteGame2Line from '~icons/mingcute/game-2-line';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	/** Puts the bar in the page's flow instead of fixing it to the window. */
	const inFlow = 'relative right-auto bottom-auto left-auto z-0';
	const labels = ['Home', 'Search', 'Games', 'Inbox', 'Profile'] as const;

	/** The first `count` items, the one labelled `active` marked as the current page. */
	function items(count: number, active: string, icons = true) {
		const all: { label: string; icon: Snippet }[] = [
			{ label: 'Home', icon: home },
			{ label: 'Search', icon: search },
			{ label: 'Games', icon: games },
			{ label: 'Inbox', icon: inbox },
			{ label: 'Profile', icon: profile }
		];
		return all.slice(0, count).map((item) => ({
			label: item.label,
			href: '#top',
			icon: icons ? item.icon : undefined,
			active: item.label === active
		}));
	}
</script>

{#snippet home()}<MingcuteHome4Line class="size-5" aria-hidden="true" />{/snippet}
{#snippet search()}<MingcuteSearchLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet games()}<MingcuteGame2Line class="size-5" aria-hidden="true" />{/snippet}
{#snippet inbox()}<MingcuteNotificationLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet profile()}<MingcuteUser1Line class="size-5" aria-hidden="true" />{/snippet}

{#snippet screen(bar: Snippet)}
	<div class="w-full max-w-sm overflow-hidden rounded-xl border border-border">
		<div class="flex h-16 items-center justify-center bg-sunken">
			<span class="text-xs text-muted">App content</span>
		</div>
		{@render bar()}
	</div>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="active marks the item of the current page."
		controls={{
			label: text('Main'),
			count: number(4, { min: 2, max: labels.length }),
			active: choice(labels),
			icons: boolean(true)
		}}
	>
		{#snippet example(values)}
			{#snippet bar()}
				<BottomNavigation
					label={values.label}
					class={inFlow}
					items={items(values.count, values.active, values.icons)}
				/>
			{/snippet}
			{@render screen(bar)}
		{/snippet}
	</Playground>
	<Card title="Variants" description="Three items, five items, and text only.">
		<div class="grid justify-items-center gap-4">
			{#snippet three()}
				<BottomNavigation label="Three items" class={inFlow} items={items(3, 'Home')} />
			{/snippet}
			{@render screen(three)}
			{#snippet five()}
				<BottomNavigation label="Five items" class={inFlow} items={items(5, 'Games')} />
			{/snippet}
			{@render screen(five)}
			{#snippet textOnly()}
				<BottomNavigation label="Text only" class={inFlow} items={items(4, 'Inbox', false)} />
			{/snippet}
			{@render screen(textOnly)}
		</div>
	</Card>
</div>
