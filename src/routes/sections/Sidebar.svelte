<!--
@component
Docs: Sidebar. A playground over the sidebar's props (collapsed, header, footer, section labels,
counts, the current entry), then the expanded sidebar with its header and its footer (the
account's entry, inside the navigation landmark) beside the same navigation collapsed to its
icons, whose entries show their text as a tooltip, and entries that are buttons rather than
links.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Sidebar, SidebarItem, SidebarSection } from '#lib/components/sidebar/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteChartLineLine from '~icons/mingcute/chart-line-line';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteMailLine from '~icons/mingcute/mail-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import MingcuteUser3Line from '~icons/mingcute/user-3-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice } from '../playground/controls';

	const entries = [
		{ id: 'overview', label: 'Overview', Icon: MingcuteHome4Line, count: undefined },
		{ id: 'analytics', label: 'Analytics', Icon: MingcuteChartLineLine, count: undefined },
		{ id: 'inbox', label: 'Inbox', Icon: MingcuteMailLine, count: '12' }
	] as const;
	const entryIds = entries.map((entry) => entry.id);

	let created = $state(0);
</script>

{#snippet brand()}
	<span class="truncate text-sm font-semibold">Workspace</span>
{/snippet}

{#snippet account()}
	<SidebarItem href="#top">
		<MingcuteUser3Line aria-hidden="true" />
		Account
	</SidebarItem>
{/snippet}

{#snippet navigation(options: { active: string; labels: boolean; counts: boolean })}
	<SidebarSection label={options.labels ? 'General' : ''}>
		{#each entries as entry (entry.id)}
			<SidebarItem href="#top" active={options.active === entry.id}>
				<entry.Icon aria-hidden="true" />
				{entry.label}
				{#snippet end()}
					{#if options.counts && entry.count}
						<Badge size="sm">{entry.count}</Badge>
					{/if}
				{/snippet}
			</SidebarItem>
		{/each}
	</SidebarSection>
	<SidebarSection label={options.labels ? 'Manage' : ''}>
		<SidebarItem href="#top" active={options.active === 'settings'}>
			<MingcuteSettings3Line aria-hidden="true" />
			Settings
		</SidebarItem>
	</SidebarSection>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Collapse it, then hover or focus an entry to see its tooltip."
		controls={{
			collapsed: boolean(),
			header: boolean(true),
			footer: boolean(true),
			labels: boolean(true),
			counts: boolean(true),
			active: choice([...entryIds, 'settings'])
		}}
	>
		{#snippet example(values)}
			<div class="h-80 overflow-hidden rounded-md border border-border">
				<Sidebar
					aria-label="Playground sidebar"
					label="Playground navigation"
					collapsed={values.collapsed}
					header={values.header ? brand : undefined}
					footer={values.footer ? account : undefined}
				>
					{@render navigation({
						active: values.active,
						labels: values.labels,
						counts: values.counts
					})}
				</Sidebar>
			</div>
		{/snippet}
	</Playground>
	<Card title="Expanded and collapsed" description="Collapsed, each entry's text is its tooltip.">
		<div class="flex h-80 flex-wrap gap-4">
			<div class="overflow-hidden rounded-md border border-border">
				<Sidebar
					aria-label="Expanded sidebar"
					label="Expanded navigation"
					header={brand}
					footer={account}
				>
					{@render navigation({ active: 'overview', labels: true, counts: true })}
				</Sidebar>
			</div>
			<div class="overflow-hidden rounded-md border border-border">
				<Sidebar
					aria-label="Collapsed sidebar"
					label="Collapsed navigation"
					collapsed
					footer={account}
				>
					{@render navigation({ active: 'overview', labels: true, counts: true })}
				</Sidebar>
			</div>
		</div>
	</Card>
	<Card title="Buttons" description="An entry without href is a button that runs its onclick.">
		<div class="flex h-40 items-start gap-4">
			<div class="h-full overflow-hidden rounded-md border border-border">
				<Sidebar aria-label="Sidebar with buttons" label="Navigation with buttons">
					<SidebarSection>
						<SidebarItem onclick={() => (created += 1)}>
							<MingcuteAddLine aria-hidden="true" />
							New game
						</SidebarItem>
					</SidebarSection>
				</Sidebar>
			</div>
			<p class="text-sm text-muted">Games created: {created}</p>
		</div>
	</Card>
</div>
