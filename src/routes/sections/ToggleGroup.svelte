<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ToggleGroup } from '$lib/components/toggle-group';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle-group">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Toggle Group</h2>
	<Card>
		<div>
			{#snippet tgBold()}<MingcuteBoldLine class="size-4" />{/snippet}
			{#snippet tgItalic()}<MingcuteItalicLine class="size-4" />{/snippet}
			{#snippet tgUnderline()}<MingcuteUnderlineLine class="size-4" />{/snippet}
			<ToggleGroup
				items={[
					{ value: 'bold', content: tgBold },
					{ value: 'italic', content: tgItalic },
					{ value: 'underline', content: tgUnderline }
				]}
			/>
		</div>
	</Card>
</section>
