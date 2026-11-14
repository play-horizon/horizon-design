<!--
@component
Test fixture of `MenuGroup.test.ts`: an open menu with two labelled groups.
-->
<script lang="ts">
	import Menu from './Menu.svelte';
	import MenuGroup from './MenuGroup.svelte';
	import MenuGroupLabel from './MenuGroupLabel.svelte';
	import MenuItem from './MenuItem.svelte';
</script>

<Menu open>
	<MenuGroup>
		<MenuGroupLabel>Account</MenuGroupLabel>
		<MenuItem value="profile">Profile</MenuItem>
	</MenuGroup>
	<MenuGroup>
		<MenuGroupLabel>Game</MenuGroupLabel>
		<MenuItem value="publish">Publish</MenuItem>
	</MenuGroup>
</Menu>
