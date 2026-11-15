<!--
@component
Docs: ToggleTooltip. Live examples of the ToggleTooltip component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ToggleTooltip } from '#lib/components/toggle-tooltip/index.js';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteStrikethroughLine from '~icons/mingcute/strikethrough-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle-tooltip">
	<Card>
		<div class="flex gap-1">
			<ToggleTooltip label="Bold">
				<MingcuteBoldLine class="size-4" aria-hidden="true" />
			</ToggleTooltip>
			<ToggleTooltip label="Italic">
				<MingcuteItalicLine class="size-4" aria-hidden="true" />
			</ToggleTooltip>
			<ToggleTooltip label="Underline">
				<MingcuteUnderlineLine class="size-4" aria-hidden="true" />
			</ToggleTooltip>
			<ToggleTooltip label="Strikethrough">
				<MingcuteStrikethroughLine class="size-4" aria-hidden="true" />
			</ToggleTooltip>
		</div>
	</Card>
</section>
