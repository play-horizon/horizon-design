<!--
@component
Docs: Sheet. Live examples of the Sheet component.
-->
<script lang="ts">
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Sheet } from '#lib/components/sheet/index.js';
	import MingcuteDownLine from '~icons/mingcute/down-line';
</script>

<section id="sheet">
	<Card>
		<Sheet
			closeLabel="Close"
			title="Bottom Sheet"
			description="Slides up from the bottom of the screen."
			side="bottom"
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}
				<MingcuteDownLine class="size-4" aria-hidden="true" />
				Open Sheet (bottom)
			{/snippet}
			<p class="text-sm text-muted">Great for mobile-style action panels.</p>
		</Sheet>
	</Card>
</section>
