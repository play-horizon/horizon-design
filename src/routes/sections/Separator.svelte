<!--
@component
Docs: Separator. Live examples of the Separator component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Separator } from '#lib/components/separator/index.js';
</script>

<section id="separator">
	<Card>
		<div class="space-y-3">
			<Separator />
			<div class="flex items-center gap-4">
				<span class="text-sm text-muted">Left</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-sm text-muted">Center</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-sm text-muted">Right</span>
			</div>
		</div>
	</Card>
</section>
