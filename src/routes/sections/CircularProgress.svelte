<!--
@component
Docs: CircularProgress. Live examples of the CircularProgress component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { CircularProgress } from '$lib/components/circular-progress';
</script>

<section id="circular-progress">
	<Card>
		<div class="flex items-center gap-6">
			<CircularProgress value={72} size={80} />
			<CircularProgress value={45} size={64} />
			<CircularProgress value={90} size={48} strokeWidth={5} />
		</div>
	</Card>
</section>
