<script lang="ts">
	import { Card } from '$lib/components/card';
	import { LinkBox, LinkOverlay } from '$lib/components/link-overlay';
	import MingcuteArrowRightUpLine from '~icons/mingcute/arrow-right-up-line';
</script>

<section id="link-overlay">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Link Overlay</h2>
	<Card>
		<LinkBox
			class="border-border hover:border-primary-border-hover rounded-xl border p-4 transition-colors"
		>
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-sm font-semibold">
						<LinkOverlay href="#">Project overview</LinkOverlay>
					</h3>
					<p class="text-muted-foreground mt-1 text-sm">
						The entire card area follows the primary link.
					</p>
				</div>
				<MingcuteArrowRightUpLine class="text-muted-foreground size-4" />
			</div>
		</LinkBox>
	</Card>
</section>
