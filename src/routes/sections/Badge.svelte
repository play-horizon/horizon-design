<!--
@component
Docs: Badge. Live examples of the Badge component.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
</script>

<section id="badge">
	<Card>
		<div>
			<div class="flex flex-wrap items-center gap-2">
				<Badge>Neutral</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="accent">Accent</Badge>
				<Badge variant="server">Server</Badge>
				<Badge variant="local">Local</Badge>
				<Badge size="sm">Small</Badge>
			</div>
		</div>
	</Card>
</section>
