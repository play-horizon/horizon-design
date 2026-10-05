<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Kbd } from '$lib/components/kbd';
</script>

<section id="kbd">
	<p class="section-tag">Typography</p>
	<h2 class="mb-6 text-2xl font-bold">Kbd</h2>
	<Card>
		<div class="flex flex-wrap gap-3">
			<div class="flex items-center gap-1">
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</div>
			<div class="flex items-center gap-1">
				<Kbd>Ctrl</Kbd>
				<Kbd>Shift</Kbd>
				<Kbd>P</Kbd>
			</div>
			<Kbd>Escape</Kbd>
			<Kbd>Tab</Kbd>
			<Kbd>Enter</Kbd>
		</div>
	</Card>
</section>
