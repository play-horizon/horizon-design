<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Separator } from '$lib/components/separator';
</script>

<section id="separator">
	<p class="section-tag">Layout</p>
	<h2 class="mb-6 text-2xl font-bold">Separator</h2>
	<Card>
		<div class="space-y-3">
			<Separator />
			<div class="flex items-center gap-4">
				<span class="text-muted-foreground text-sm">Left</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-muted-foreground text-sm">Center</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-muted-foreground text-sm">Right</span>
			</div>
		</div>
	</Card>
</section>
