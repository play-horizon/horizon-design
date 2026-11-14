<!--
@component
Docs: ToggleGroup. Live examples of the ToggleGroup component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ToggleGroup } from '$lib/components/toggle-group';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle-group">
	<Card>
		<div>
			{#snippet tgBold()}<MingcuteBoldLine class="size-4" aria-hidden="true" />{/snippet}
			{#snippet tgItalic()}<MingcuteItalicLine class="size-4" aria-hidden="true" />{/snippet}
			{#snippet tgUnderline()}<MingcuteUnderlineLine class="size-4" aria-hidden="true" />{/snippet}
			<ToggleGroup
				aria-label="Text style"
				items={[
					{ value: 'bold', label: 'Bold', content: tgBold },
					{ value: 'italic', label: 'Italic', content: tgItalic },
					{ value: 'underline', label: 'Underline', content: tgUnderline }
				]}
			/>
		</div>
	</Card>
</section>
