<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ThemeSwitch } from '$lib/components/theme-switch';
</script>

<section id="theme-switch">
	<p class="section-tag">Controls</p>
	<h2 class="mb-6 text-2xl font-bold">Theme Switch</h2>
	<Card>
		<div class="flex items-center gap-4">
			<ThemeSwitch />
			<ThemeSwitch size="lg" />
		</div>
	</Card>
</section>
