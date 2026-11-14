<!--
@component
Docs: Kbd. Live examples of the Kbd component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
</script>

<section id="kbd">
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
