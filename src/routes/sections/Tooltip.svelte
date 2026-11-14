<!--
@component
Docs: Tooltip. Live examples of the Tooltip component.
-->
<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Tooltip } from '$lib/components/tooltip';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
</script>

<section id="tooltip">
	<Card>
		<Tooltip
			content="Tooltips provide helpful context on hover."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			<MingcuteInformationLine class="size-4" />
			Hover Tooltip
		</Tooltip>
	</Card>
</section>
