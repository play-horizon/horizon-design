<!--
@component
Docs: Sidebar. A sidebar with its header and footer, and the same navigation collapsed to icons.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Sidebar, SidebarItem, SidebarSection } from '#lib/components/sidebar/index.js';
	import MingcuteChartLineLine from '~icons/mingcute/chart-line-line';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
</script>

<section id="sidebar">
	{#snippet sections()}
		<SidebarSection label="General">
			<SidebarItem href="#" active>
				<MingcuteHome4Line class="size-4" aria-hidden="true" />
				Overview
			</SidebarItem>
			<SidebarItem href="#">
				<MingcuteChartLineLine class="size-4" aria-hidden="true" />
				Analytics
			</SidebarItem>
		</SidebarSection>
		<SidebarSection label="Manage">
			<SidebarItem href="#">
				<MingcuteSettings3Line class="size-4" aria-hidden="true" />
				Settings
			</SidebarItem>
		</SidebarSection>
	{/snippet}
	<Card class="overflow-hidden p-0">
		<div class="flex h-80 gap-4">
			<Sidebar class="h-full">
				{#snippet header()}
					<span class="text-sm font-semibold">Workspace</span>
				{/snippet}
				{#snippet footer()}
					<p class="text-xs text-muted">Signed in as Rayan</p>
				{/snippet}
				{@render sections()}
			</Sidebar>
			<Sidebar class="h-full" collapsed>
				{@render sections()}
			</Sidebar>
		</div>
	</Card>
</section>
