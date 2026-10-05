<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ThumbCard } from '$lib/components/thumb-card';
	import MingcuteLayout6Line from '~icons/mingcute/layout-6-line';
</script>

<section id="thumb-card">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Thumb Card</h2>
	<Card>
		<div class="max-w-xs">
			<ThumbCard label="Component preview" href="#">
				<MingcuteLayout6Line class="text-primary size-12" />
			</ThumbCard>
		</div>
	</Card>
</section>
