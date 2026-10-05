<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Float } from '$lib/components/float';
	import MingcuteAddLine from '~icons/mingcute/add-line';
</script>

<section id="float">
	<p class="section-tag">Layout</p>
	<h2 class="mb-6 text-2xl font-bold">Float</h2>
	<Card>
		<div>
			<p class="text-muted-foreground mb-4 text-sm">
				A fixed-position container for floating action buttons.
			</p>
			<div
				class="border-border bg-muted-surface-dim relative min-h-20 overflow-hidden rounded-xl border"
			>
				<Float class="absolute z-0" position="bottom-right">
					<Button size="icon-md" class="rounded-full shadow-lg">
						<MingcuteAddLine />
					</Button>
				</Float>
			</div>
		</div>
	</Card>
</section>
