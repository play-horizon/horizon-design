<!--
@component
Docs: Badge. Live examples of the Badge component.
-->
<script lang="ts">
	import { Badge } from '$lib/components/badge';
	import { Card } from '$lib/components/card';
</script>

<section id="badge">
	<Card>
		<div>
			<div class="flex flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="neutral">Secondary</Badge>
				<Badge variant="neutral">Outline</Badge>
				<Badge variant="danger">Destructive</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
			</div>
		</div>
	</Card>
</section>
