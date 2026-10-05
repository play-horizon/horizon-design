<script lang="ts">
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';
</script>

<section id="badge">
	<p class="section-tag">Indicators</p>
	<h2 class="mb-6 text-2xl font-bold">Badge</h2>
	<Card>
		<div>
			<div class="flex flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
			</div>
		</div>
	</Card>
</section>
