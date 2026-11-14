<!--
@component
Docs: LinkOverlay. Live examples of the LinkOverlay component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { LinkBox, LinkOverlay } from '$lib/components/link-overlay';
	import MingcuteArrowRightUpLine from '~icons/mingcute/arrow-right-up-line';
</script>

<section id="link-overlay">
	<Card>
		<LinkBox class="rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-sm font-semibold">
						<LinkOverlay href="#">Project overview</LinkOverlay>
					</h3>
					<p class="mt-1 text-sm text-muted">The entire card area follows the primary link.</p>
				</div>
				<MingcuteArrowRightUpLine class="size-4 text-muted" />
			</div>
		</LinkBox>
	</Card>
</section>
