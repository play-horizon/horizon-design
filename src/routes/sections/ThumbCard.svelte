<!--
@component
Docs: ThumbCard. Live examples of the ThumbCard component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ThumbCard } from '#lib/components/thumb-card/index.js';
	import MingcuteLayout6Line from '~icons/mingcute/layout-6-line';
</script>

<section id="thumb-card">
	<Card>
		<div class="max-w-xs">
			<ThumbCard label="Component preview" href="#">
				<MingcuteLayout6Line class="size-12 text-primary" />
			</ThumbCard>
		</div>
	</Card>
</section>
