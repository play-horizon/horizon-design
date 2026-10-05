<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ToggleTooltip } from '$lib/components/toggle-tooltip';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteStrikethroughLine from '~icons/mingcute/strikethrough-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle-tooltip">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Toggle Tooltip</h2>
	<Card>
		<div class="flex gap-1">
			<ToggleTooltip label="Bold">
				<MingcuteBoldLine class="size-4" />
			</ToggleTooltip>
			<ToggleTooltip label="Italic">
				<MingcuteItalicLine class="size-4" />
			</ToggleTooltip>
			<ToggleTooltip label="Underline">
				<MingcuteUnderlineLine class="size-4" />
			</ToggleTooltip>
			<ToggleTooltip label="Strikethrough">
				<MingcuteStrikethroughLine class="size-4" />
			</ToggleTooltip>
		</div>
	</Card>
</section>
