<!--
@component
Docs: AspectRatio. Live examples of the AspectRatio component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { AspectRatio } from '#lib/components/aspect-ratio/index.js';
	import { art } from '../examples';
</script>

<section id="aspect-ratio">
	<Card>
		<div>
			<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg">
				<img src={art.skyline} alt="A city skyline at sunset" class="h-full w-full object-cover" />
			</AspectRatio>
		</div>
	</Card>
</section>
