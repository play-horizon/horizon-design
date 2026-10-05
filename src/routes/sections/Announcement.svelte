<script lang="ts">
	import { Announcement } from '$lib/components/announcement';
	import { Card } from '$lib/components/card';
	import MingcuteLightningLine from '~icons/mingcute/lightning-line';
</script>

<section id="announcement">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Announcement</h2>
	<Card>
		<div>
			<Announcement>
				<MingcuteLightningLine class="size-3.5" />
				New: 78 components available
			</Announcement>
		</div>
	</Card>
</section>
