<!--
@component
Test fixture of `Sidebar.test.ts`: a sidebar named "Main" with a labelled section holding a
current link and a button.
-->
<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import SidebarSection from './SidebarSection.svelte';

	let { collapsed = false }: { collapsed?: boolean } = $props();
</script>

<Sidebar {collapsed} label="Main">
	<SidebarSection label="General">
		<SidebarItem href="/home" active>Home</SidebarItem>
		<SidebarItem>New game</SidebarItem>
	</SidebarSection>
</Sidebar>
