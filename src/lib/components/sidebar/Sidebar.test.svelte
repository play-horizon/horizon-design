<!--
@component
Test fixture of `Sidebar.test.ts`: a sidebar named "Main" with a header, a labelled section
holding a current link and a button, and a footer holding a link.
-->
<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import SidebarSection from './SidebarSection.svelte';

	let { collapsed = false }: { collapsed?: boolean } = $props();
</script>

<Sidebar {collapsed} label="Main">
	{#snippet header()}<span>Brand</span>{/snippet}
	<SidebarSection label="General">
		<SidebarItem href="/home" active>Home</SidebarItem>
		<SidebarItem>New game</SidebarItem>
	</SidebarSection>
	{#snippet footer()}
		<SidebarItem href="/settings">Settings</SidebarItem>
	{/snippet}
</Sidebar>
