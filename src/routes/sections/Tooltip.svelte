<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Tooltip } from '$lib/components/tooltip';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
</script>

<section id="tooltip">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Tooltip</h2>
	<Card>
		<Tooltip
			content="Tooltips provide helpful context on hover."
			triggerClass={buttonVariants({ variant: 'outline' })}
		>
			<MingcuteInformationLine class="size-4" />
			Hover Tooltip
		</Tooltip>
	</Card>
</section>
