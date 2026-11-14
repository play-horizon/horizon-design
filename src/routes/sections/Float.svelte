<!--
@component
Docs: Float. Live examples of the Float component.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Float } from '#lib/components/float/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
</script>

<section id="float">
	<Card>
		<div>
			<p class="mb-4 text-sm text-muted">A fixed-position container for floating action buttons.</p>
			<div class="relative min-h-20 overflow-hidden rounded-xl border border-border bg-sunken">
				<Float class="absolute z-0" position="bottom-right">
					<Button size="icon-md" class="rounded-full shadow-lg" aria-label="New game">
						<MingcuteAddLine aria-hidden="true" />
					</Button>
				</Float>
			</div>
		</div>
	</Card>
</section>
