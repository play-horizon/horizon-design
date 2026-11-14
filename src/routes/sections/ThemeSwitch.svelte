<!--
@component
Docs: ThemeSwitch. Live examples of the ThemeSwitch component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ThemeSwitch } from '$lib/components/theme-switch';

	const labels = { group: 'Theme', system: 'System', dark: 'Dark', light: 'Light' };
</script>

<section id="theme-switch">
	<Card>
		<div class="flex items-center gap-4">
			<ThemeSwitch {labels} />
			<ThemeSwitch size="sm" {labels} />
		</div>
	</Card>
</section>
