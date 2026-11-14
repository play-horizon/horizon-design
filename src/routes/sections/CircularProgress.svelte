<!--
@component
Docs: CircularProgress. Live examples of the CircularProgress component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { CircularProgress } from '#lib/components/circular-progress/index.js';
</script>

<section id="circular-progress">
	<Card>
		<div class="flex items-center gap-6">
			<CircularProgress value={72} valueText="72%" size={80} label="Upload" />
			<CircularProgress value={45} valueText="45%" size={64} label="Build" />
			<CircularProgress value={90} size={48} strokeWidth={5} label="Download" hideLabel />
		</div>
	</Card>
</section>
