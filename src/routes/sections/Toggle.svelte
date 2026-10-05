<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Toggle } from '$lib/components/toggle';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
</script>

<section id="toggle">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Toggle</h2>
	<Card>
		<div>
			<div class="flex flex-wrap items-center gap-3">
				<Toggle>
					<MingcuteBoldLine class="size-4" />
				</Toggle>
				<Toggle>
					<MingcuteItalicLine class="size-4" />
				</Toggle>
				<Toggle variant="outline">
					<MingcuteUnderlineLine class="size-4" />
					<span>Underline</span>
				</Toggle>
				<Toggle variant="outline" size="sm">Small</Toggle>
				<Toggle variant="outline" size="md">Medium</Toggle>
				<Toggle variant="outline" size="lg">Large</Toggle>
			</div>
		</div>
	</Card>
</section>
