<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Sidebar, SidebarItem, SidebarSection } from '$lib/components/sidebar';
	import MingcuteChartLineLine from '~icons/mingcute/chart-line-line';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
</script>

<section id="sidebar">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Sidebar</h2>
	<Card class="overflow-hidden p-0">
		<div class="h-80">
			<Sidebar class="h-full">
				{#snippet header()}
					<span class="text-sm font-semibold">Workspace</span>
				{/snippet}
				{#snippet footer()}
					<p class="text-muted-foreground text-xs">Signed in as Rayan</p>
				{/snippet}
				<SidebarSection label="General">
					<SidebarItem href="#" active>
						<MingcuteHome4Line class="size-4" />
						Overview
					</SidebarItem>
					<SidebarItem href="#">
						<MingcuteChartLineLine class="size-4" />
						Analytics
					</SidebarItem>
				</SidebarSection>
				<SidebarSection label="Manage">
					<SidebarItem href="#">
						<MingcuteSettings3Line class="size-4" />
						Settings
					</SidebarItem>
				</SidebarSection>
			</Sidebar>
		</div>
	</Card>
</section>
