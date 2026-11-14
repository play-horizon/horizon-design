<!--
@component
Docs: Toggle. Live examples of the Toggle component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Toggle } from '$lib/components/toggle';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle">
	<Card>
		<div>
			<div class="flex flex-wrap items-center gap-3">
				<Toggle aria-label="Bold">
					<MingcuteBoldLine class="size-4" aria-hidden="true" />
				</Toggle>
				<Toggle aria-label="Italic">
					<MingcuteItalicLine class="size-4" aria-hidden="true" />
				</Toggle>
				<Toggle variant="outline">
					<MingcuteUnderlineLine class="size-4" aria-hidden="true" />
					<span>Underline</span>
				</Toggle>
				<Toggle variant="outline" size="sm">Small</Toggle>
				<Toggle variant="outline" size="md">Medium</Toggle>
				<Toggle variant="outline" size="lg">Large</Toggle>
			</div>
		</div>
	</Card>
</section>
